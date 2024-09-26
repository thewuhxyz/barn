import * as anchor from "@coral-xyz/anchor";
import { BarnClient, MilestoneState, toUiAmount } from "../src";
import {
	createClient,
	generateRandomSeed,
	goToExplorer,
	sleep,
} from "./helpers";
import { assert } from "chai";
import { Cluster, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "bn.js";
import {
	getAssociatedTokenAddressSync,
	NATIVE_MINT,
	TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

describe("barn", () => {
	const provider = anchor.AnchorProvider.env();

	const connection = provider.connection;

	console.log("url:", connection.rpcEndpoint);

	const admin = new BarnClient(provider);

	const sponsor = createClient(Keypair.generate(), connection);

	const dev = createClient(Keypair.generate(), connection);

	let devProfileSeed = generateRandomSeed("dev");

	let sponsorProfileSeed = generateRandomSeed("sponsor");

	const explorer = (tx: string) => goToExplorer(tx, "custom");

	const logTx = (tx: string, note?: string) =>
		console.log(`✅ ${note ? note : "Transaction Successful"}:`, explorer(tx));

	before(async () => {
		console.log("---- airdroping token to sponsor ----");

		let tx = await provider.connection.requestAirdrop(
			sponsor.provider.publicKey,
			1 * anchor.web3.LAMPORTS_PER_SOL
		);

		logTx(tx, "airdropped SOL to Sponsor");

		console.log("---- airdroping token to dev ----");

		tx = await provider.connection.requestAirdrop(
			dev.provider.publicKey,
			1 * anchor.web3.LAMPORTS_PER_SOL
		);

		logTx(tx, "Airdropped SOL to Dev");
		await sleep(3);
	});

	it("user: creates a user profile", async () => {
		let tx = await dev.rpc.createUser({
			seed: devProfileSeed,
			signer: dev.provider.publicKey,
			uri: devProfileSeed + ".json",
		});

		logTx(tx, "Dev profile created.");

		tx = await sponsor.rpc.createUser({
			seed: sponsorProfileSeed,
			signer: sponsor.provider.publicKey,
			uri: sponsorProfileSeed + ".json",
		});

		logTx(tx, "Sponsor profile created.");

		await sleep(3);

		// dev

		let devProfile = await dev.account.getUserProfile(dev.provider.publicKey);
		let devAuthority = await dev.account.getUserAuthority(
			dev.provider.publicKey
		);

		if (!devProfile || !devAuthority) throw "dev is null";

		assert(
			devProfile.authority.toBase58() === devAuthority.key.toBase58(),
			"dev authority key does not match"
		);

		assert(
			devProfile.key.toBase58() === devAuthority.profile.toBase58(),
			"dev profile key does not match"
		);

		assert(
			devAuthority.signer.equals(dev.provider.publicKey),
			"sponsor profile key does not match"
		);

		// sponsor

		let sponsorProfile = await sponsor.account.getUserProfile(
			sponsor.provider.publicKey
		);
		let sponsorAuthority = await sponsor.account.getUserAuthority(
			sponsor.provider.publicKey
		);

		if (!sponsorProfile || !sponsorAuthority) throw "sponsor is null";

		assert(
			sponsorProfile.authority.toBase58() === sponsorAuthority.key.toBase58(),
			"sponsor authority key does not match"
		);

		assert(
			sponsorProfile.key.toBase58() === sponsorAuthority.profile.toBase58(),
			"sponsor profile key does not match"
		);

		assert(
			sponsorAuthority.signer.equals(sponsor.provider.publicKey),
			"sponsor profile key does not match"
		);
	});

	it("admin: approves a sponsor", async () => {
		let sponsorProfileAddress =
			admin.account.profileAddress(sponsorProfileSeed);

		let sponsorProfile = await admin.account.profile(sponsorProfileAddress);

		if (!sponsorProfile) throw "sponsor is null";

		assert(!sponsorProfile.sponsor, "Cannot have sponsor field be `true` yet");

		let tx = await admin.rpc.approveSponsor({
			admin: admin.provider.publicKey,
			profile: sponsorProfileAddress,
			signer: sponsor.provider.publicKey,
		});

		logTx(tx, "Admin approved Sponsor.");

		await sleep(3);

		sponsorProfile = await admin.account.getUserProfile(
			sponsor.provider.publicKey
		);

		if (!sponsorProfile) throw "sponsor is null";

		assert(sponsorProfile.sponsor, "sponsor field should be set to `true`");
	});

	it("dev: adds a project", async () => {
		let devProfile = dev.account.profileAddress(devProfileSeed);
		let uri = devProfileSeed + "-project.json";

		let projectId = (await dev.account.profile(devProfile))?.count;

		if (projectId === undefined) throw "profile is null";

		let tx = await dev.rpc.addProject({
			profile: devProfile,
			signer: dev.provider.publicKey,
			uri,
		});

		logTx(tx, "Dev added project.");

		await sleep(3);

		const project = await dev.account.project(
			dev.account.projectAddress(devProfile, projectId)
		);

		if (!project) throw "project is null";

		assert(
			project.profile.toBase58() === devProfile.toBase58(),
			"Project profile does not match Dev profile"
		);
		assert(project.id === projectId, "Project ID does not match");
		assert(project.uri === uri, "Project URI does not match");
	});

	it("sponsor: adds a grant program", async () => {
		let sponsorProfile = sponsor.account.profileAddress(sponsorProfileSeed);

		let uri = sponsorProfileSeed + "-grant_program.json";

		let grantProgramId = (await sponsor.account.profile(sponsorProfile))?.count;

		if (grantProgramId === undefined) throw "profile is null";

		let tx = await sponsor.rpc.addGrantProgram({
			profile: sponsorProfile,
			signer: sponsor.provider.publicKey,
			uri,
		});

		logTx(tx, "Sponsor added grant program.");

		await sleep(3);

		const grantProgram = await sponsor.account.grantProgram(
			sponsor.account.grantProgramAddress(sponsorProfile, grantProgramId)
		);

		if (!grantProgram) throw "project is null";

		assert(
			grantProgram.profile.toBase58() === sponsorProfile.toBase58(),
			"Grant program profile does not match sponsor profile"
		);
		assert(
			grantProgram.id === grantProgramId,
			"Grant program ID does not match"
		);
		assert(grantProgram.uri === uri, "Grant program URI does not match");
	});

	it("sponsor: awards a grant", async () => {
		let sponsorProfile = sponsor.account.profileAddress(sponsorProfileSeed);

		let devProfile = sponsor.account.profileAddress(devProfileSeed);

		let grantProgramAddress = sponsor.account.grantProgramAddress(
			sponsorProfile,
			0
		);

		let approvedAmount = new BN(1 * LAMPORTS_PER_SOL);

		let devProject = sponsor.account.projectAddress(devProfile, 0);

		let grantId = (await sponsor.account.grantProgram(grantProgramAddress))
			?.count;

		if (grantId === undefined) throw "grantProgram is null";

		let uri = sponsorProfileSeed + "-grant.json";

		let tx = await sponsor.rpc.awardGrant({
			profile: sponsorProfile,
			signer: sponsor.provider.publicKey,
			uri,
			approvedAmount,
			grantProgram: grantProgramAddress,
			paymentMint: NATIVE_MINT,
			project: devProject,
		});

		logTx(tx, "Sponsor awards grant to Dev project.");

		await sleep(3);

		let project = await sponsor.account.project(devProject);

		if (!project) throw "project is null";

		let grant = await sponsor.account.grant(
			sponsor.account.grantAddress(grantProgramAddress, grantId)
		);

		if (!grant) throw "grant is null";

		assert(
			grant.approvedAmount ===
				toUiAmount(approvedAmount, grant.paymentDecimals),
			"Approved amount does not match"
		);
		assert(
			grant.paymentMint.toBase58() === NATIVE_MINT.toBase58(),
			"Payment mint does not match"
		);
		assert(
			grant.project.toBase58() === devProject.toBase58(),
			"Project key does not match on grant account"
		);
		assert(
			project.grant?.toBase58() === grant.key.toBase58(),
			"Grant key does not match on Project account"
		);

		assert(
			grant.program.toBase58() === grantProgramAddress.toBase58(),
			"Grant program key does not match"
		);
	});

	it("dev: adds a grant milestone", async () => {
		let devProfileAddress = dev.account.profileAddress(devProfileSeed);

		let devProjectAddress = dev.account.projectAddress(devProfileAddress, 0);

		let devProject = await dev.account.project(devProjectAddress);

		if (!devProject || !devProject.grant) throw "project or grant is null";

		let grant = await dev.account.grant(devProject.grant);

		if (!grant) throw "grant is null";

		let amount = new BN(0.1 * LAMPORTS_PER_SOL);

		let uri = devProfileSeed + "-milestone.json";

		let tx = await dev.rpc.addGrantMilestone({
			amount,
			grant: devProject.grant,
			profile: devProfileAddress,
			project: devProject.key,
			signer: dev.provider.publicKey,
			uri,
		});

		logTx(tx, "Dev adds a grant milestone.");

		await sleep(3);

		let milestone = await dev.account.grantMilestone(
			dev.account.grantMilestoneAddress(grant.key, grant.count)
		);

		if (!milestone) throw "Milestone is null";

		assert(
			milestone.grant.toBase58() === grant.key.toBase58(),
			"Grant does not match."
		);
		assert(
			milestone.amount.toNumber() === amount.toNumber(),
			"Amount for the milestone does not match."
		);

		assert(milestone.uri === uri, "Milestone URI does not match");

		assert(
			MilestoneState.toStatus(milestone.state) === "inProgress",
			"Milestone status is not `inProgress`"
		);
	});

	it("dev: send requests a milesone review", async () => {
		let devProfileAddress = dev.account.profileAddress(devProfileSeed);

		let devProjectAddress = dev.account.projectAddress(devProfileAddress, 0);

		let devProject = await dev.account.project(devProjectAddress);

		if (!devProject || !devProject.grant) throw "project or grant is null";

		let grant = await dev.account.grant(devProject.grant);

		if (!grant) throw "grant is null";

		let grantMilestoneAddress = dev.account.grantMilestoneAddress(grant.key, 0);

		let tx = await dev.rpc.reviewGrantMilestone({
			grant: grant.key,
			grantMilestone: grantMilestoneAddress,
			grantProgram: grant.program,
			profile: devProfileAddress,
			project: devProject.key,
			signer: dev.provider.publicKey,
		});

		logTx(tx, "Dev requests a milestone review.");

		await sleep(3);

		let milestone = await dev.account.grantMilestone(grantMilestoneAddress);

		if (!milestone) throw "milestone is null";

		assert(
			MilestoneState.toStatus(milestone.state) === "inReview",
			"Milestone status is not `inReview`"
		);
	});

	it("sponsor: accept milestone", async () => {
		let sponsorProfileAddress =
			sponsor.account.profileAddress(sponsorProfileSeed);

		let devProfileAddress = sponsor.account.profileAddress(devProfileSeed);

		let devProjectAddress = sponsor.account.projectAddress(
			devProfileAddress,
			0
		);

		let devProject = await sponsor.account.project(devProjectAddress);

		if (!devProject || !devProject.grant) throw "project or grant is null";

		let grant = await sponsor.account.grant(devProject.grant);

		if (!grant) throw "grant is null";

		let grantMilestoneAddress = sponsor.account.grantMilestoneAddress(
			grant.key,
			0
		);

		let tx = await sponsor.rpc.acceptGrantMilestone({
			grant: grant.key,
			grantMilestone: grantMilestoneAddress,
			grantProgram: grant.program,
			profile: sponsorProfileAddress,
			project: devProject.key,
			signer: sponsor.provider.publicKey,
		});

		logTx(tx, "Sponsor accepts a milestone.");

		await sleep(3);

		let milestone = await sponsor.account.grantMilestone(grantMilestoneAddress);

		if (!milestone) throw "milestone is null";

		assert(
			MilestoneState.toStatus(milestone.state) === "accepted",
			"Milestone status is not `accepted`"
		);
	});

	it("sponsor: settle milestone", async () => {
		let sponsorProfileAddress =
			sponsor.account.profileAddress(sponsorProfileSeed);

		let devProfileAddress = sponsor.account.profileAddress(devProfileSeed);

		let devProjectAddress = sponsor.account.projectAddress(
			devProfileAddress,
			0
		);

		let devProject = await sponsor.account.project(devProjectAddress);

		if (!devProject || !devProject.grant) throw "project or grant is null";

		let grant = await sponsor.account.grant(devProject.grant);

		if (!grant) throw "grant is null";

		let paidOutBeforeSettlement = grant.paidOut;

		let grantMilestoneAddress = sponsor.account.grantMilestoneAddress(
			grant.key,
			0
		);

		let nativeBalanceBeforeSettlement = await connection.getBalance(
			dev.provider.publicKey
		);

		let tx = await sponsor.rpc.settleGrantMilestone({
			grant: grant.key,
			grantMilestone: grantMilestoneAddress,
			profile: sponsorProfileAddress,
			signer: sponsor.provider.publicKey,
			paymentMint: grant.paymentMint,
			signerTokenAccount: getAssociatedTokenAddressSync(
				grant.paymentMint,
				sponsor.provider.publicKey
			),
			to: dev.provider.publicKey,
			tokenProgram: TOKEN_PROGRAM_ID,
		});

		logTx(tx, "Sponsor settled payment for achieved milestone.");

		await sleep(3);

		grant = await sponsor.account.grant(devProject.grant);

		let milestone = await sponsor.account.grantMilestone(grantMilestoneAddress);

		if (!milestone || !grant) throw "milestone is null";

		let nativeBalanceAfterSettlement = await connection.getBalance(
			dev.provider.publicKey
		);

		assert(
			MilestoneState.toStatus(milestone.state) === "paid",
			"Milestone status not `paid`"
		);

		assert(
			nativeBalanceAfterSettlement ===
				nativeBalanceBeforeSettlement + milestone.amount.toNumber(),
			"Balance does not add up"
		);

		assert(
			grant.paidOut ===
				paidOutBeforeSettlement +
					toUiAmount(milestone.amount, grant.paymentDecimals),
			"Milestone status not set to `paid`"
		);
	});
});

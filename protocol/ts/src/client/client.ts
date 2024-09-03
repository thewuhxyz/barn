import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { BarnInstructon } from "./instruction";
import { Barn, BarnIDLJson } from "../idl";
import { BN } from "bn.js";
import {
	getAssociatedTokenAddressSync,
	getMint,
	Mint,
} from "@solana/spl-token";
import { toAmount } from "./helpers";
import { AuthorityAccount, BarnAccount, ProfileAccount } from "./account";

export class BarnClient {
	program: Program<Barn>;
	constructor(public provider: AnchorProvider) {
		this.program = new Program(BarnIDLJson as Barn, provider);
	}

	get connection() {
		return this.provider.connection;
	}

	async getUserProfile(user: PublicKey): Promise<ProfileAccount | null> {
		const authority = await this.getUserAuthority(user);
		if (!authority) return authority;
		const { profile } = authority;
		return await BarnAccount.profile(this.program, profile);
	}

	async getUserAuthority(signer: PublicKey): Promise<AuthorityAccount | null> {
		return await BarnAccount.authority(this.program, signer);
	}

	async approveSponsorIx({
		admin,
		sponsor,
	}: {
		admin: PublicKey;
		sponsor: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.approveSponsor(this.program, {
			signer: sponsor,
			admin,
		});
	}

	async createUserIx({
		uri,
		signer,
	}: {
		uri: string;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.createUser(this.program, {
			seed: this.generateRandomSeed(),
			uri,
			signer,
		});
	}

	async addProjectIx({
		uri,
		signer,
	}: {
		uri: string;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.addProject(this.program, {
			uri,
			signer,
		});
	}

	async addGrantProgramIx({
		uri,
		signer,
	}: {
		uri: string;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.addGrantProgram(this.program, {
			uri,
			signer,
		});
	}

	async awardGrantIx({
		uri,
		approvedAmount,
		signer,
		paymentMint,
		grantProgram,
		project,
	}: {
		uri: string;
		approvedAmount: number;
		paymentMint: PublicKey;
		grantProgram: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		const mint = await this.getMintAccount(paymentMint);
		return BarnInstructon.awardGrant(this.program, {
			uri,
			signer,
			paymentMint,
			approvedAmount: new BN(toAmount(approvedAmount, mint.decimals)),
			grantProgram,
			project,
		});
	}

	async addGrantMilestoneIx({
		uri,
		amount,
		signer,
		grant,
		project,
	}: {
		uri: string;
		amount: number;
		grant: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		const grantAccount = await BarnAccount.grant(this.program, grant);

		if (!grantAccount) throw "grant account does not exist";

		return BarnInstructon.addGrantMilestone(this.program, {
			uri,
			signer,
			grant,
			amount: new BN(toAmount(amount, grantAccount.paymentDecimals)),
			project,
		});
	}

	async reviseGrantMilestoneIx({
		uri,
		amount,
		signer,
		grant,
		grantMilestone,
	}: {
		uri: string | null;
		amount: number | null;
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		const grantAccount = await BarnAccount.grant(this.program, grant);

		if (!grantAccount) throw "grant account does not exist";

		return BarnInstructon.reviseGrantMilestone(this.program, {
			uri,
			signer,
			grant,
			amount:
				amount !== null
					? new BN(toAmount(amount, grantAccount.paymentDecimals))
					: amount,
			grantMilestone,
		});
	}

	async reviewGrantMilestoneIx({
		signer,
		grant,
		grantMilestone,
	}: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.reviewGrantMilestone(this.program, {
			signer,
			grant,
			grantMilestone,
		});
	}

	async rejectGrantMilestoneIx({
		signer,
		grant,
		grantMilestone,
	}: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.rejectGrantMilestone(this.program, {
			signer,
			grant,
			grantMilestone,
		});
	}

	async acceptGrantMilestoneIx({
		signer,
		grant,
		grantMilestone,
	}: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.acceptGrantMilestone(this.program, {
			signer,
			grant,
			grantMilestone,
		});
	}

	async settleGrantMilestoneIx({
		signer,
		grant,
		grantMilestone,
		to,
		tokenProgram,
	}: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
		to: PublicKey;
		tokenProgram: PublicKey;
	}): Promise<TransactionInstruction> {
		const grantAccount = await BarnAccount.grant(this.program, grant);

		if (!grantAccount) throw "grant account does not exist";

		const { paymentMint } = grantAccount;

		return BarnInstructon.settleGrantMilestone(this.program, {
			signer,
			grant,
			grantMilestone,
			signerTokenAccount: this.getAtaAddress(paymentMint, signer),
			paymentMint,
			to,
			tokenProgram,
		});
	}

	generateRandomSeed(): string {
		return Keypair.generate().publicKey.toBase58().slice(0, 32);
	}

	async getMintAccount(mint: PublicKey): Promise<Mint> {
		return getMint(this.connection, mint);
	}

	getAtaAddress(mint: PublicKey, owner: PublicKey): PublicKey {
		return getAssociatedTokenAddressSync(mint, owner, true);
	}
}

import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import { BarnInstructon } from "./instruction";
import { Barn, BarnIDLJson } from "../idl";
import BN from "bn.js";
import {
	getAssociatedTokenAddressSync,
	getMint,
	Mint,
} from "@solana/spl-token";
import { AuthorityAccount, BarnAccount, ProfileAccount } from "./account";
import { type BarnMethod, BarnMethods } from "./methods";
export class BarnClient {
	program: Program<Barn>;

	constructor(public provider: AnchorProvider) {
		this.program = new Program(BarnIDLJson as Barn, provider);
	}

	get connection() {
		return this.provider.connection;
	}

	get signer(): PublicKey {
		if (!this.provider.publicKey) throw "wallet not connected";
		return this.provider.publicKey;
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

	createUser({ uri }: { uri: string }): BarnMethod {
		return BarnMethods.createUser(this.program, {
			seed: this.generateRandomSeed(),
			uri,
			signer: this.signer,
		});
	}

	addProject({ uri }: { uri: string }): BarnMethod {
		return BarnMethods.addProject(this.program, {
			uri,
			signer: this.signer,
		});
	}

	addGrantProgram({ uri }: { uri: string }): BarnMethod {
		return BarnMethods.addGrantProgram(this.program, {
			uri,
			signer: this.signer,
		});
	}

	awardGrant({
		uri,
		approvedAmount,
		paymentMint,
		grantProgram,
		project,
	}: {
		uri: string;
		approvedAmount: BN;
		paymentMint: PublicKey;
		grantProgram: PublicKey;
		project: PublicKey;
	}): BarnMethod {
		// const mint = await this.getMintAccount(paymentMint);
		return BarnMethods.awardGrant(this.program, {
			uri,
			signer: this.signer,
			paymentMint,
			approvedAmount,
			grantProgram,
			project,
		});
	}

	addGrantMilestone({
		uri,
		amount,
		grant,
		project,
	}: {
		uri: string;
		amount: BN;
		grant: PublicKey;
		project: PublicKey;
	}): BarnMethod {
		// const grantAccount = await BarnAccount.grant(this.program, grant);

		// if (!grantAccount) throw "grant account does not exist";

		return BarnMethods.addGrantMilestone(this.program, {
			uri,
			signer: this.signer,
			grant,
			amount,
			project,
		});
	}

	reviseGrantMilestone({
		uri,
		amount,
		grant,
		grantMilestone,
	}: {
		uri: string | null;
		amount: BN | null;
		grant: PublicKey;
		grantMilestone: PublicKey;
	}): BarnMethod {
		// const grantAccount = await BarnAccount.grant(this.program, grant);

		// if (!grantAccount) throw "grant account does not exist";

		return BarnMethods.reviseGrantMilestone(this.program, {
			uri,
			signer: this.signer,
			grant,
			amount,
			grantMilestone,
		});
	}

	reviewGrantMilestone({
		grant,
		grantMilestone,
	}: {
		grant: PublicKey;
		grantMilestone: PublicKey;
	}): BarnMethod {
		return BarnMethods.reviewGrantMilestone(this.program, {
			signer: this.signer,
			grant,
			grantMilestone,
		});
	}

	rejectGrantMilestone({
		grant,
		grantMilestone,
	}: {
		grant: PublicKey;
		grantMilestone: PublicKey;
	}): BarnMethod {
		return BarnMethods.rejectGrantMilestone(this.program, {
			signer: this.signer,
			grant,
			grantMilestone,
		});
	}

	acceptGrantMilestone({
		grant,
		grantMilestone,
	}: {
		grant: PublicKey;
		grantMilestone: PublicKey;
	}): BarnMethod {
		return BarnMethods.acceptGrantMilestone(this.program, {
			signer: this.signer,
			grant,
			grantMilestone,
		});
	}

	settleGrantMilestone({
		grant,
		grantMilestone,
		to,
		tokenProgram,
    paymentMint
	}: {
		grant: PublicKey;
		grantMilestone: PublicKey;
    paymentMint: PublicKey;
		to: PublicKey;
		tokenProgram: PublicKey;
	}): BarnMethod {
		// const grantAccount = await BarnAccount.grant(this.program, grant);

		// if (!grantAccount) throw "grant account does not exist";

		// const { paymentMint } = grantAccount;

		return BarnMethods.settleGrantMilestone(this.program, {
			signer: this.signer,
			grant,
			grantMilestone,
			signerTokenAccount: this.getAtaAddress(paymentMint, this.signer),
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

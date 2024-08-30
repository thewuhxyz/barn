import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import type BN from "bn.js";

export class BarnInstructon {
	constructor(public program: Program<Barn>) {}

	async createUser({
		seed,
		uri,
		signer,
	}: {
		seed: string;
		uri: string;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return this.program.methods
			.createUser(seed, uri)
			.accounts({
				signer,
			})
			.instruction();
	}

	async approveSpnsor({
		admin,
		signer,
	}: {
		admin: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return this.program.methods
			.approveSponsor()
			.accounts({
				signer,
				admin,
			})
			.instruction();
	}

	async addProject({
		uri,
		signer,
	}: {
		uri: string;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return this.program.methods
			.addProject(uri)
			.accounts({
				signer,
			})
			.instruction();
	}

	async addGrantProgram({
		uri,
		signer,
	}: {
		uri: string;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return this.program.methods
			.addGrantProgram(uri)
			.accounts({
				signer,
			})
			.instruction();
	}

	async awardGrant({
		uri,
		approvedAmount,
		grantProgram,
		project,
		paymentMint,
		signer,
	}: {
		uri: string;
		approvedAmount: BN;
		paymentMint: PublicKey;
		grantProgram: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return this.program.methods
			.awardGrant(uri, approvedAmount)
			.accountsPartial({
				paymentMint,
				signer,
				grantProgram,
				project,
			})
			.instruction();
	}

	async addGrantMilestone({
		uri,
		amount,
		grantProgram,
		project,
		signer,
	}: {
		uri: string;
		amount: BN;
		grantProgram: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return this.program.methods
			.addGrantMilestone(uri, amount)
			.accountsPartial({
				signer,
				project,
				grantProgram,
			})
			.instruction();
	}

	async reviseGrantMilestone({
		uri,
		amount,
		grant,
		grantMilestone,
		signer,
	}: {
		uri: string | null;
		amount: BN | null;
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return this.program.methods
			.reviseGrantMilestone({ uri, amount })
			.accountsPartial({
				signer,
				grant,
				grantMilestone,
			})
			.instruction();
	}

	async reviewGrantMilestone({
		grant,
		grantMilestone,
		signer,
	}: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return this.program.methods
			.reviewGrantMilestone()
			.accountsPartial({
				signer,
				grant,
				grantMilestone,
			})
			.instruction();
	}

	async acceptGrantMilestone({
		grant,
		grantMilestone,
		signer,
	}: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return this.program.methods
			.acceptGrantMilestone()
			.accountsPartial({
				signer,
				grant,
				grantMilestone,
			})
			.instruction();
	}

	async rejectGrantMilestone({
		grant,
		grantMilestone,
		signer,
	}: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return this.program.methods
			.rejectGrantMilestone()
			.accountsPartial({
				signer,
				grant,
				grantMilestone,
			})
			.instruction();
	}

	async settleGrantMilestone({
		grant,
		grantMilestone,
		signer,
		signerTokenAccount,
		to,
		tokenProgram,
	}: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		to: PublicKey;
		signer: PublicKey;
		signerTokenAccount: PublicKey;
		tokenProgram: PublicKey;
	}): Promise<TransactionInstruction> {
		return this.program.methods
			.settleGrantMilestone()
			.accountsPartial({
				to,
				signer,
				grant,
				grantMilestone,
				signerTokenAccount,
				tokenProgram,
			})
			.instruction();
	}
}

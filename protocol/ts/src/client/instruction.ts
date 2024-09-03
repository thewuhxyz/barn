import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import type BN from "bn.js";

export class BarnInstructon {
	constructor(private program: Program<Barn>) {}

	async createUser(args: {
		seed: string;
		uri: string;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.createUser(this.program, args);
	}

	async approveSponsor(args: {
		admin: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.approveSponsor(this.program, args);
	}

	async addProject(args: {
		uri: string;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.addProject(this.program, args);
	}

	async addGrantProgram(args: {
		uri: string;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.addGrantProgram(this.program, args);
	}

	async awardGrant(args: {
		uri: string;
		approvedAmount: BN;
		paymentMint: PublicKey;
		grantProgram: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.awardGrant(this.program, args);
	}

	async addGrantMilestone(args: {
		uri: string;
		amount: BN;
		grant: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.addGrantMilestone(this.program, args);
	}

	async reviseGrantMilestone(args: {
		uri: string | null;
		amount: BN | null;
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.reviseGrantMilestone(this.program, args);
	}

	async reviewGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.reviewGrantMilestone(this.program, args);
	}

	async acceptGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.acceptGrantMilestone(this.program, args);
	}

	async rejectGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.rejectGrantMilestone(this.program, args);
	}

	async settleGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		to: PublicKey;
		signer: PublicKey;
		signerTokenAccount: PublicKey;
		paymentMint: PublicKey;
		tokenProgram: PublicKey;
	}): Promise<TransactionInstruction> {
		return BarnInstructon.settleGrantMilestone(this.program, args);
	}

	static async createUser(
		program: Program<Barn>,
		{
			seed,
			uri,
			signer,
		}: {
			seed: string;
			uri: string;
			signer: PublicKey;
		}
	): Promise<TransactionInstruction> {
		return program.methods
			.createUser(seed, uri)
			.accounts({
				signer,
			})
			.instruction();
	}

	static async approveSponsor(
		program: Program<Barn>,
		{
			admin,
			signer,
		}: {
			admin: PublicKey;
			signer: PublicKey;
		}
	): Promise<TransactionInstruction> {
		return program.methods
			.approveSponsor()
			.accounts({
				signer,
				admin,
			})
			.instruction();
	}

	static async addProject(
		program: Program<Barn>,
		{
			uri,
			signer,
		}: {
			uri: string;
			signer: PublicKey;
		}
	): Promise<TransactionInstruction> {
		return program.methods
			.addProject(uri)
			.accounts({
				signer,
			})
			.instruction();
	}

	static async addGrantProgram(
		program: Program<Barn>,
		{
			uri,
			signer,
		}: {
			uri: string;
			signer: PublicKey;
		}
	): Promise<TransactionInstruction> {
		return program.methods
			.addGrantProgram(uri)
			.accounts({
				signer,
			})
			.instruction();
	}

	static async awardGrant(
		program: Program<Barn>,
		{
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
		}
	): Promise<TransactionInstruction> {
		return program.methods
			.awardGrant(uri, approvedAmount)
			.accountsPartial({
				paymentMint,
				signer,
				grantProgram,
				project,
			})
			.instruction();
	}

	static async addGrantMilestone(
		program: Program<Barn>,
		{
			uri,
			amount,
			grant,
			project,
			signer,
		}: {
			uri: string;
			amount: BN;
			grant: PublicKey;
			project: PublicKey;
			signer: PublicKey;
		}
	): Promise<TransactionInstruction> {
		return program.methods
			.addGrantMilestone(uri, amount)
			.accountsPartial({
				signer,
				project,
				grant,
			})
			.instruction();
	}

	static async reviseGrantMilestone(
		program: Program<Barn>,
		{
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
		}
	): Promise<TransactionInstruction> {
		return program.methods
			.reviseGrantMilestone({ uri, amount })
			.accountsPartial({
				signer,
				grant,
				grantMilestone,
			})
			.instruction();
	}

	static async reviewGrantMilestone(
		program: Program<Barn>,
		{
			grant,
			grantMilestone,
			signer,
		}: {
			grant: PublicKey;
			grantMilestone: PublicKey;
			signer: PublicKey;
		}
	): Promise<TransactionInstruction> {
		return program.methods
			.reviewGrantMilestone()
			.accountsPartial({
				signer,
				grant,
				grantMilestone,
			})
			.instruction();
	}

	static async acceptGrantMilestone(
		program: Program<Barn>,
		{
			grant,
			grantMilestone,
			signer,
		}: {
			grant: PublicKey;
			grantMilestone: PublicKey;
			signer: PublicKey;
		}
	): Promise<TransactionInstruction> {
		return program.methods
			.acceptGrantMilestone()
			.accountsPartial({
				signer,
				grant,
				grantMilestone,
			})
			.instruction();
	}

	static async rejectGrantMilestone(
		program: Program<Barn>,
		{
			grant,
			grantMilestone,
			signer,
		}: {
			grant: PublicKey;
			grantMilestone: PublicKey;
			signer: PublicKey;
		}
	): Promise<TransactionInstruction> {
		return program.methods
			.rejectGrantMilestone()
			.accountsPartial({
				signer,
				grant,
				grantMilestone,
			})
			.instruction();
	}

	static async settleGrantMilestone(
		program: Program<Barn>,
		{
			grant,
			grantMilestone,
			signer,
			signerTokenAccount,
			paymentMint,
			to,
			tokenProgram,
		}: {
			grant: PublicKey;
			grantMilestone: PublicKey;
			to: PublicKey;
			signer: PublicKey;
			signerTokenAccount: PublicKey;
			paymentMint: PublicKey;
			tokenProgram: PublicKey;
		}
	): Promise<TransactionInstruction> {
		return program.methods
			.settleGrantMilestone()
			.accountsPartial({
				to,
				signer,
				grant,
				grantMilestone,
				signerTokenAccount,
				paymentMint,
				tokenProgram,
			})
			.instruction();
	}
}

import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import { PublicKey, Transaction } from "@solana/web3.js";
import type BN from "bn.js";
import { BarnMethods, IBarnMethods } from "./methods";
import { AddProjectArgs, ApproveSponsorArgs } from "./types";

export class BarnTransaction implements IBarnMethods<Transaction> {
	constructor(private program: Program<Barn>) {}

	async createUser(args: {
		seed: string;
		uri: string;
		signer: PublicKey;
	}): Promise<Transaction> {
		return BarnMethods.createUser(this.program, args).transaction();
	}

	async approveSponsor(args: ApproveSponsorArgs): Promise<Transaction> {
		return BarnMethods.approveSponsor(this.program, args).transaction();
	}

	async addProject(args: AddProjectArgs): Promise<Transaction> {
		return BarnMethods.addProject(this.program, args).transaction();
	}

	async addGrantProgram(args: {
		uri: string;
		signer: PublicKey;
	}): Promise<Transaction> {
		return BarnMethods.addGrantProgram(this.program, args).transaction();
	}

	async awardGrant(args: {
		uri: string;
		approvedAmount: BN;
		paymentMint: PublicKey;
		grantProgram: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): Promise<Transaction> {
		return BarnMethods.awardGrant(this.program, args).transaction();
	}

	async addGrantMilestone(args: {
		uri: string;
		amount: BN;
		grant: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): Promise<Transaction> {
		return BarnMethods.addGrantMilestone(this.program, args).transaction();
	}

	async reviseGrantMilestone(args: {
		uri: string | null;
		amount: BN | null;
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<Transaction> {
		return BarnMethods.reviseGrantMilestone(this.program, args).transaction();
	}

	async reviewGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<Transaction> {
		return BarnMethods.reviewGrantMilestone(this.program, args).transaction();
	}

	async acceptGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<Transaction> {
		return BarnMethods.acceptGrantMilestone(this.program, args).transaction();
	}

	async rejectGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<Transaction> {
		return BarnMethods.rejectGrantMilestone(this.program, args).transaction();
	}

	async settleGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		to: PublicKey;
		signer: PublicKey;
		signerTokenAccount: PublicKey;
		paymentMint: PublicKey;
		tokenProgram: PublicKey;
	}): Promise<Transaction> {
		return BarnMethods.settleGrantMilestone(this.program, args).transaction();
	}
}

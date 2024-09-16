import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import { PublicKey } from "@solana/web3.js";
import type BN from "bn.js";
import { BarnMethods, IBarnMethods } from "./methods";
import {
	AddGrantProgramArgs,
	AddProjectArgs,
	ApproveSponsorArgs,
} from "./types";

export class BarnRPC implements IBarnMethods<string> {
	constructor(private program: Program<Barn>) {}

	async createUser(args: {
		seed: string;
		uri: string;
		signer: PublicKey;
	}): Promise<string> {
		return BarnMethods.createUser(this.program, args).rpc();
	}

	async approveSponsor(args: ApproveSponsorArgs): Promise<string> {
		return BarnMethods.approveSponsor(this.program, args).rpc();
	}

	async addProject(args: AddProjectArgs): Promise<string> {
		return BarnMethods.addProject(this.program, args).rpc();
	}

	async addGrantProgram(args: AddGrantProgramArgs): Promise<string> {
		return BarnMethods.addGrantProgram(this.program, args).rpc();
	}

	async awardGrant(args: {
		uri: string;
		approvedAmount: BN;
		paymentMint: PublicKey;
		grantProgram: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): Promise<string> {
		return BarnMethods.awardGrant(this.program, args).rpc();
	}

	async addGrantMilestone(args: {
		uri: string;
		amount: BN;
		grant: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): Promise<string> {
		return BarnMethods.addGrantMilestone(this.program, args).rpc();
	}

	async reviseGrantMilestone(args: {
		uri: string | null;
		amount: BN | null;
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<string> {
		return BarnMethods.reviseGrantMilestone(this.program, args).rpc();
	}

	async reviewGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<string> {
		return BarnMethods.reviewGrantMilestone(this.program, args).rpc();
	}

	async acceptGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<string> {
		return BarnMethods.acceptGrantMilestone(this.program, args).rpc();
	}

	async rejectGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<string> {
		return BarnMethods.rejectGrantMilestone(this.program, args).rpc();
	}

	async settleGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		to: PublicKey;
		signer: PublicKey;
		signerTokenAccount: PublicKey;
		paymentMint: PublicKey;
		tokenProgram: PublicKey;
	}): Promise<string> {
		return BarnMethods.settleGrantMilestone(this.program, args).rpc();
	}
}

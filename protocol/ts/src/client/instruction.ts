import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import type BN from "bn.js";
import { BarnMethods, IBarnMethods } from "./methods";
import {
	AcceptGrantMilestoneArgs,
	AddGrantMilestoneArgs,
	AddGrantProgramArgs,
	AddProjectArgs,
	ApproveSponsorArgs,
	AwardGrantArgs,
	CreateUserArgs,
	EditGrantMilestoneArgs,
	RejectGrantMilestoneArgs,
	ReviewGrantMilestoneArgs,
	ReviseGrantMilestoneArgs,
	SettleGrantMilestoneArgs,
} from "./types";

export class BarnInstructon implements IBarnMethods<TransactionInstruction> {
	constructor(private program: Program<Barn>) {}

	async createUser(args: CreateUserArgs): Promise<TransactionInstruction> {
		return BarnMethods.createUser(this.program, args).instruction();
	}

	async approveSponsor(
		args: ApproveSponsorArgs
	): Promise<TransactionInstruction> {
		return BarnMethods.approveSponsor(this.program, args).instruction();
	}

	async addProject(args: AddProjectArgs): Promise<TransactionInstruction> {
		return BarnMethods.addProject(this.program, args).instruction();
	}

	async addGrantProgram(
		args: AddGrantProgramArgs
	): Promise<TransactionInstruction> {
		return BarnMethods.addGrantProgram(this.program, args).instruction();
	}

	async awardGrant(args: AwardGrantArgs): Promise<TransactionInstruction> {
		return BarnMethods.awardGrant(this.program, args).instruction();
	}

	async addGrantMilestone(
		args: AddGrantMilestoneArgs
	): Promise<TransactionInstruction> {
		return BarnMethods.addGrantMilestone(this.program, args).instruction();
	}

	async editGrantMilestone(
		args: EditGrantMilestoneArgs
	): Promise<TransactionInstruction> {
		return BarnMethods.editGrantMilestone(this.program, args).instruction();
	}

	async reviseGrantMilestone(
		args: ReviseGrantMilestoneArgs
	): Promise<TransactionInstruction> {
		return BarnMethods.reviseGrantMilestone(this.program, args).instruction();
	}

	async reviewGrantMilestone(
		args: ReviewGrantMilestoneArgs
	): Promise<TransactionInstruction> {
		return BarnMethods.reviewGrantMilestone(this.program, args).instruction();
	}

	async acceptGrantMilestone(
		args: AcceptGrantMilestoneArgs
	): Promise<TransactionInstruction> {
		return BarnMethods.acceptGrantMilestone(this.program, args).instruction();
	}

	async rejectGrantMilestone(
		args: RejectGrantMilestoneArgs
	): Promise<TransactionInstruction> {
		return BarnMethods.rejectGrantMilestone(this.program, args).instruction();
	}

	async settleGrantMilestone(
		args: SettleGrantMilestoneArgs
	): Promise<TransactionInstruction> {
		return BarnMethods.settleGrantMilestone(this.program, args).instruction();
	}
}

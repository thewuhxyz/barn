import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import { PublicKey, Transaction } from "@solana/web3.js";
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

export class BarnTransaction implements IBarnMethods<Transaction> {
	constructor(private program: Program<Barn>) {}

	async createUser(args: CreateUserArgs): Promise<Transaction> {
		return BarnMethods.createUser(this.program, args).transaction();
	}

	async approveSponsor(args: ApproveSponsorArgs): Promise<Transaction> {
		return BarnMethods.approveSponsor(this.program, args).transaction();
	}

	async addProject(args: AddProjectArgs): Promise<Transaction> {
		return BarnMethods.addProject(this.program, args).transaction();
	}

	async addGrantProgram(args: AddGrantProgramArgs): Promise<Transaction> {
		return BarnMethods.addGrantProgram(this.program, args).transaction();
	}

	async awardGrant(args: AwardGrantArgs): Promise<Transaction> {
		return BarnMethods.awardGrant(this.program, args).transaction();
	}

	async addGrantMilestone(args: AddGrantMilestoneArgs): Promise<Transaction> {
		return BarnMethods.addGrantMilestone(this.program, args).transaction();
	}

	async editGrantMilestone(
		args: EditGrantMilestoneArgs
	): Promise<Transaction> {
		return BarnMethods.editGrantMilestone(this.program, args).transaction();
	}

	async reviseGrantMilestone(
		args: ReviseGrantMilestoneArgs
	): Promise<Transaction> {
		return BarnMethods.reviseGrantMilestone(this.program, args).transaction();
	}

	async reviewGrantMilestone(
		args: ReviewGrantMilestoneArgs
	): Promise<Transaction> {
		return BarnMethods.reviewGrantMilestone(this.program, args).transaction();
	}

	async acceptGrantMilestone(
		args: AcceptGrantMilestoneArgs
	): Promise<Transaction> {
		return BarnMethods.acceptGrantMilestone(this.program, args).transaction();
	}

	async rejectGrantMilestone(
		args: RejectGrantMilestoneArgs
	): Promise<Transaction> {
		return BarnMethods.rejectGrantMilestone(this.program, args).transaction();
	}

	async settleGrantMilestone(
		args: SettleGrantMilestoneArgs
	): Promise<Transaction> {
		return BarnMethods.settleGrantMilestone(this.program, args).transaction();
	}
}

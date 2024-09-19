import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
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
	UpdateGrantMilestoneArgs,
} from "./types";

export class BarnRPC implements IBarnMethods<string> {
	constructor(private program: Program<Barn>) {}

	async createUser(args: CreateUserArgs): Promise<string> {
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

	async awardGrant(args: AwardGrantArgs): Promise<string> {
		return BarnMethods.awardGrant(this.program, args).rpc();
	}

	async addGrantMilestone(args: AddGrantMilestoneArgs): Promise<string> {
		return BarnMethods.addGrantMilestone(this.program, args).rpc();
	}

	async editGrantMilestone(args: EditGrantMilestoneArgs): Promise<string> {
		return BarnMethods.editGrantMilestone(this.program, args).rpc();
	}

	async reviseGrantMilestone(args: UpdateGrantMilestoneArgs): Promise<string> {
		return BarnMethods.reviseGrantMilestone(this.program, args).rpc();
	}

	async reviewGrantMilestone(args: UpdateGrantMilestoneArgs): Promise<string> {
		return BarnMethods.reviewGrantMilestone(this.program, args).rpc();
	}

	async acceptGrantMilestone(args: UpdateGrantMilestoneArgs): Promise<string> {
		return BarnMethods.acceptGrantMilestone(this.program, args).rpc();
	}

	async rejectGrantMilestone(args: UpdateGrantMilestoneArgs): Promise<string> {
		return BarnMethods.rejectGrantMilestone(this.program, args).rpc();
	}

	async settleGrantMilestone(args: SettleGrantMilestoneArgs): Promise<string> {
		return BarnMethods.settleGrantMilestone(this.program, args).rpc();
	}
}

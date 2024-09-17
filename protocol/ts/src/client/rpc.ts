import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import { PublicKey } from "@solana/web3.js";
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
	RejectGrantMilestoneArgs,
	ReviewGrantMilestoneArgs,
	ReviseGrantMilestoneArgs,
	SettleGrantMilestoneArgs,
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

	async reviseGrantMilestone(args: ReviseGrantMilestoneArgs): Promise<string> {
		return BarnMethods.reviseGrantMilestone(this.program, args).rpc();
	}

	async reviewGrantMilestone(args: ReviewGrantMilestoneArgs): Promise<string> {
		return BarnMethods.reviewGrantMilestone(this.program, args).rpc();
	}

	async acceptGrantMilestone(args: AcceptGrantMilestoneArgs): Promise<string> {
		return BarnMethods.acceptGrantMilestone(this.program, args).rpc();
	}

	async rejectGrantMilestone(args: RejectGrantMilestoneArgs): Promise<string> {
		return BarnMethods.rejectGrantMilestone(this.program, args).rpc();
	}

	async settleGrantMilestone(args: SettleGrantMilestoneArgs): Promise<string> {
		return BarnMethods.settleGrantMilestone(this.program, args).rpc();
	}
}

import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import {
	ConfirmOptions,
	Transaction,
	TransactionInstruction,
} from "@solana/web3.js";
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

export class BarnMethods {
	constructor(private program: Program<Barn>) {}

	createUser(args: CreateUserArgs): BarnMethod {
		return BarnMethods.createUser(this.program, args);
	}

	approveSponsor(args: ApproveSponsorArgs): BarnMethod {
		return BarnMethods.approveSponsor(this.program, args);
	}

	addProject(args: AddProjectArgs): BarnMethod {
		return BarnMethods.addProject(this.program, args);
	}

	addGrantProgram(args: AddGrantProgramArgs): BarnMethod {
		return BarnMethods.addGrantProgram(this.program, args);
	}

	awardGrant(args: AwardGrantArgs): BarnMethod {
		return BarnMethods.awardGrant(this.program, args);
	}

	addGrantMilestone(args: AddGrantMilestoneArgs): BarnMethod {
		return BarnMethods.addGrantMilestone(this.program, args);
	}

	reviseGrantMilestone(args: ReviseGrantMilestoneArgs): BarnMethod {
		return BarnMethods.reviseGrantMilestone(this.program, args);
	}

	reviewGrantMilestone(args: ReviewGrantMilestoneArgs): BarnMethod {
		return BarnMethods.reviewGrantMilestone(this.program, args);
	}

	acceptGrantMilestone(args: AcceptGrantMilestoneArgs): BarnMethod {
		return BarnMethods.acceptGrantMilestone(this.program, args);
	}

	rejectGrantMilestone(args: RejectGrantMilestoneArgs): BarnMethod {
		return BarnMethods.rejectGrantMilestone(this.program, args);
	}

	settleGrantMilestone(args: SettleGrantMilestoneArgs): BarnMethod {
		return BarnMethods.settleGrantMilestone(this.program, args);
	}

	static createUser(
		program: Program<Barn>,
		{ seed, uri, signer }: CreateUserArgs
	): BarnMethod {
		return program.methods.createUser(seed, uri).accounts({
			signer,
		});
	}

	static approveSponsor(
		program: Program<Barn>,
		args: ApproveSponsorArgs
	): BarnMethod {
		return program.methods.approveSponsor().accountsPartial(args);
	}

	static addProject(
		program: Program<Barn>,
		{ uri, signer, profile }: AddProjectArgs
	): BarnMethod {
		return program.methods.addProject(uri).accountsPartial({
			signer,
			profile,
		});
	}

	static addGrantProgram(
		program: Program<Barn>,
		{ uri, signer, profile }: AddGrantProgramArgs
	): BarnMethod {
		return program.methods.addGrantProgram(uri).accountsPartial({
			signer,
			profile,
		});
	}

	static awardGrant(
		program: Program<Barn>,
		{
			uri,
			approvedAmount,
			grantProgram,
			project,
			paymentMint,
			signer,
			profile,
		}: AwardGrantArgs
	): BarnMethod {
		return program.methods.awardGrant(uri, approvedAmount).accountsPartial({
			paymentMint,
			signer,
			grantProgram,
			project,
			profile,
		});
	}

	static addGrantMilestone(
		program: Program<Barn>,
		args: AddGrantMilestoneArgs
	): BarnMethod {
		return program.methods
			.addGrantMilestone(args.uri, args.amount)
			.accountsPartial(args);
	}

	static reviseGrantMilestone(
		program: Program<Barn>,
		args: ReviseGrantMilestoneArgs
	): BarnMethod {
		return program.methods
			.reviseGrantMilestone({ uri: args.uri, amount: args.amount })
			.accountsPartial(args);
	}

	static reviewGrantMilestone(
		program: Program<Barn>,
		args: ReviewGrantMilestoneArgs
	): BarnMethod {
		return program.methods.reviewGrantMilestone().accountsPartial(args);
	}

	static acceptGrantMilestone(
		program: Program<Barn>,
		args: AcceptGrantMilestoneArgs
	): BarnMethod {
		return program.methods.acceptGrantMilestone().accountsPartial(args);
	}

	static rejectGrantMilestone(
		program: Program<Barn>,
		args: RejectGrantMilestoneArgs
	): BarnMethod {
		return program.methods.rejectGrantMilestone().accountsPartial(args);
	}

	static settleGrantMilestone(
		program: Program<Barn>,
		args: SettleGrantMilestoneArgs
	): BarnMethod {
		return program.methods.settleGrantMilestone().accountsPartial(args);
	}
}

export interface BarnMethod {
	rpc: (config?: ConfirmOptions) => Promise<string>;
	transaction: () => Promise<Transaction>;
	instruction: () => Promise<TransactionInstruction>;
}

export interface IBarnMethods<T> {
	createUser(args: CreateUserArgs): Promise<T>;

	approveSponsor(args: ApproveSponsorArgs): Promise<T>;

	addProject(args: AddProjectArgs): Promise<T>;

	addGrantProgram(args: AddGrantProgramArgs): Promise<T>;

	awardGrant(args: AwardGrantArgs): Promise<T>;

	addGrantMilestone(args: AddGrantMilestoneArgs): Promise<T>;

	reviseGrantMilestone(args: ReviseGrantMilestoneArgs): Promise<T>;

	reviewGrantMilestone(args: ReviewGrantMilestoneArgs): Promise<T>;

	acceptGrantMilestone(args: AcceptGrantMilestoneArgs): Promise<T>;

	rejectGrantMilestone(args: RejectGrantMilestoneArgs): Promise<T>;

	settleGrantMilestone(args: SettleGrantMilestoneArgs): Promise<T>;
}

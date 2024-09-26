import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import {
	ConfirmOptions,
	Transaction,
	TransactionInstruction,
} from "@solana/web3.js";
import {
	AddGrantMilestoneArgs,
	AddGrantProgramArgs,
	AddProjectArgs,
	ApproveSponsorArgs,
	AwardGrantArgs,
	CreateUserArgs,
	EditGrantMilestoneArgs,
	SettleGrantMilestoneArgs,
	UpdateGrantMilestoneArgs,
} from "./types";

export class BarnMethods {
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

	static editGrantMilestone(
		program: Program<Barn>,
		args: EditGrantMilestoneArgs
	): BarnMethod {
		return program.methods
			.editGrantMilestone({ uri: args.uri, amount: args.amount })
			.accountsPartial(args);
	}

	static reviseGrantMilestone(
		program: Program<Barn>,
		args: UpdateGrantMilestoneArgs
	): BarnMethod {
		return program.methods.reviseGrantMilestone().accountsPartial(args);
	}

	static reviewGrantMilestone(
		program: Program<Barn>,
		args: UpdateGrantMilestoneArgs
	): BarnMethod {
		return program.methods.reviewGrantMilestone().accountsPartial(args);
	}

	static acceptGrantMilestone(
		program: Program<Barn>,
		args: UpdateGrantMilestoneArgs
	): BarnMethod {
		return program.methods.acceptGrantMilestone().accountsPartial(args);
	}

	static rejectGrantMilestone(
		program: Program<Barn>,
		args: UpdateGrantMilestoneArgs
	): BarnMethod {
		return program.methods.rejectGrantMilestone().accountsPartial(args);
	}

	static settleGrantMilestone(
		program: Program<Barn>,
		args: SettleGrantMilestoneArgs
	): BarnMethod {
		return program.methods.settleGrantMilestone().accountsPartial({ ...args });
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

	editGrantMilestone(args: EditGrantMilestoneArgs): Promise<T>;

	reviseGrantMilestone(args: UpdateGrantMilestoneArgs): Promise<T>;

	reviewGrantMilestone(args: UpdateGrantMilestoneArgs): Promise<T>;

	acceptGrantMilestone(args: UpdateGrantMilestoneArgs): Promise<T>;

	rejectGrantMilestone(args: UpdateGrantMilestoneArgs): Promise<T>;

	settleGrantMilestone(args: SettleGrantMilestoneArgs): Promise<T>;
}

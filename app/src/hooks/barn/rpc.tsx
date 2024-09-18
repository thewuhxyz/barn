"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { GoToExplorer } from "@/components/solana";
import type {
	AddGrantMilestoneArgs,
	AddGrantProgramArgs,
	AddProjectArgs,
	ApproveSponsorArgs,
	AwardGrantArgs,
	CreateUserArgs,
	EditGrantMilestoneArgs,
	SettleGrantMilestoneArgs,
	UpdateGrantMilestoneArgs,
} from "@barn/protocol";
import { useBarn } from "./client";

export function useBarnRPC() {
	const barn = useBarn();

	const createUser = useSendBarnTransaction<CreateUserArgs>((args) =>
		barn.rpc.createUser(args)
	);

	const approveSponsor = useSendBarnTransaction<ApproveSponsorArgs>((args) =>
		barn.rpc.approveSponsor(args)
	);

	const acceptGrantMilestone = useSendBarnTransaction<UpdateGrantMilestoneArgs>(
		(args) => barn.rpc.acceptGrantMilestone(args)
	);

	const addGrantMilestone = useSendBarnTransaction<AddGrantMilestoneArgs>(
		(args) => barn.rpc.addGrantMilestone(args)
	);

	const addGrantProgram = useSendBarnTransaction<AddGrantProgramArgs>((args) =>
		barn.rpc.addGrantProgram(args)
	);

	const addProject = useSendBarnTransaction<AddProjectArgs>((args) =>
		barn.rpc.addProject(args)
	);

	const awardGrant = useSendBarnTransaction<AwardGrantArgs>((args) =>
		barn.rpc.awardGrant(args)
	);

	const editGrantMilestone = useSendBarnTransaction<EditGrantMilestoneArgs>(
		(args) => barn.rpc.editGrantMilestone(args)
	);

	const rejectGrantMilestone = useSendBarnTransaction<UpdateGrantMilestoneArgs>(
		(args) => barn.rpc.rejectGrantMilestone(args)
	);

	const reviewGrantMilestone = useSendBarnTransaction<UpdateGrantMilestoneArgs>(
		(args) => barn.rpc.reviewGrantMilestone(args)
	);

	const reviseGrantMilestone = useSendBarnTransaction<UpdateGrantMilestoneArgs>(
		(args) => barn.rpc.reviseGrantMilestone(args)
	);

	const settleGrantMilestone = useSendBarnTransaction<SettleGrantMilestoneArgs>(
		(args) => barn.rpc.settleGrantMilestone(args)
	);

	return {
		acceptGrantMilestone,
		addGrantMilestone,
		addGrantProgram,
		addProject,
		approveSponsor,
		awardGrant,
		createUser,
		editGrantMilestone,
		rejectGrantMilestone,
		reviewGrantMilestone,
		reviseGrantMilestone,
		settleGrantMilestone,
	};
}

function useSendBarnTransaction<T = undefined>(
	rpc: (arg: T) => Promise<string>
) {
	return useMutation({
		mutationFn: rpc,
		onSuccess: (tx) => {
			toast.success("Transaction successful!", {
				action: <GoToExplorer tx={tx} cluster="custom" />,
				className: "w-max",
			});
		},
		onError: (e) => {
			console.error("error:", e);
			toast.error(`Transaction failed. ${e.message}`);
		},
	}).mutate;
}

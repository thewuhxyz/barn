"use client";

import { BarnClient } from "@barn/protocol";
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryFunctionContext,
} from "@tanstack/react-query";
import {
	useAnchorWallet,
	useConnection,
	useWallet,
} from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import { GoToExplorer } from "@/components/solana";
import { PublicKey } from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import type {
	AddGrantMilestoneArgs,
	AddGrantProgramArgs,
	AddProjectArgs,
	ApproveSponsorArgs,
	AwardGrantArgs,
	CreateUserArgs,
} from "@barn/protocol";

export function useBarnRPC() {
	const barn = useBarn();

	const doCreateUser = (args: CreateUserArgs) => barn.rpc.createUser(args);
	const doApproveSponsor = (args: ApproveSponsorArgs) =>
		barn.rpc.approveSponsor(args);
	const doAddProject = (args: AddProjectArgs) => barn.rpc.addProject(args);
	const doAddGrantProgram = (args: AddGrantProgramArgs) =>
		barn.rpc.addGrantProgram(args);
	const doAwardGrant = (args: AwardGrantArgs) => barn.rpc.awardGrant(args);
	const doAddGrantMilestone = (args: AddGrantMilestoneArgs) =>
		barn.rpc.addGrantMilestone(args);

	const createUser = useMutation({
		mutationFn: doCreateUser,
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

	const approveSponsor = useMutation({
		mutationFn: doApproveSponsor,
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

	const acceptGrantMilestone = useMutation({
		mutationFn: barn.rpc.acceptGrantMilestone,
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

	const addGrantMilestone = useMutation({
		mutationFn: doAddGrantMilestone,
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

	const addGrantProgram = useMutation({
		mutationFn: doAddGrantProgram,
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

	const addProject = useMutation({
		mutationFn: doAddProject,
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

	const awardGrant = useMutation({
		mutationFn: doAwardGrant,
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

	const rejectGrantMilestone = useMutation({
		mutationFn: barn.rpc.rejectGrantMilestone,
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

	const reviewGrantMilestone = useMutation({
		mutationFn: barn.rpc.reviewGrantMilestone,
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

	const reviseGrantMilestone = useMutation({
		mutationFn: barn.rpc.reviseGrantMilestone,
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

	const settleGrantMilestone = useMutation({
		mutationFn: barn.rpc.settleGrantMilestone,
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

	return {
		acceptGrantMilestone,
		addGrantMilestone,
		addGrantProgram,
		addProject,
		approveSponsor,
		awardGrant,
		createUser,
		rejectGrantMilestone,
		reviewGrantMilestone,
		reviseGrantMilestone,
		settleGrantMilestone,
	};
}

export function useBarnUser() {
	const barn = useBarn();
	const { publicKey } = useWallet();

	const profile = useQuery({
		queryKey: ["profile", { publicKey: publicKey?.toBase58() ?? null }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { publicKey: string | null }]>) => {
			const [_, { publicKey }] = queryKey;
			return publicKey
				? barn.account.getUserProfile(new PublicKey(publicKey))
				: null;
		},
	});

	const projectOrProgramPks = useQuery({
		queryKey: [
			"project-keys",
			{
				profilePk: profile.data?.profile?.toBase58() ?? null,
				count: profile.data?.count || null,
				sponsor: profile.data?.sponsor ?? null,
			},
		],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<
			[
				string,
				{
					profilePk: string | null;
					count: number | null;
					sponsor: boolean | null;
				},
			]
		>) => {
			const [_, { profilePk, count, sponsor }] = queryKey;
			return profilePk && count && sponsor !== null
				? barn.account.getProjectOrGrantProgramPks(
						new PublicKey(profilePk),
						count,
						sponsor
					)
				: null;
		},
	});

	return { profile, projectOrProgramPks };
}

export function useBarnProject(projectPk: string | null) {
	const barn = useBarn();

	const project = useQuery({
		queryKey: ["project", { projectPk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { projectPk: string | null }]>) => {
			const [_, { projectPk }] = queryKey;
			return projectPk ? barn.account.project(new PublicKey(projectPk)) : null;
		},
	});

	// const milestonePks = useQuery({
	// 	queryKey: [
	// 		"milestone-keys",
	// 		{ grantPk: project.data?.grant?.toBase58() ?? null },
	// 	],
	// 	queryFn: ({
	// 		queryKey,
	// 	}: QueryFunctionContext<[string, { grantPk: string | null }]>) => {
	// 		const [_, { grantPk }] = queryKey;
	// 		return grantPk ? barn.account.getGrantMilestonesPks(new PublicKey(grantPk)) : null;
	// 	},
	// });

	return {
		project,
		grantPk: project.data?.grant ?? null,
	};
}

export function useBarnGrantProgram(grantProgramPk: string) {
	const barn = useBarn();

	const grantProgram = useQuery({
		queryKey: ["grant-program", { grantProgramPk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { grantProgramPk: string }]>) => {
			const [_, { grantProgramPk }] = queryKey;
			return barn.account.grantProgram(new PublicKey(grantProgramPk));
		},
	});

	const grantPks = useQuery({
		queryKey: [
			"grant-keys",
			{
				grantProgramPk: grantProgramPk,
				count: grantProgram.data?.count || null,
			},
		],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<
			[
				string,
				{
					grantProgramPk: string;
					count: number | null;
				},
			]
		>) => {
			const [_, { grantProgramPk, count }] = queryKey;
			return grantProgramPk && count !== null
				? barn.account.getGrantsPks(new PublicKey(grantProgramPk), count)
				: null;
		},
	});

	return { grantProgram, grantPks: grantPks.data ?? null };
}

export function useBarnGrant(grantPk: string | null) {
	const barn = useBarn();

	const grant = useQuery({
		queryKey: ["grant", { grantPk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { grantPk: string | null }]>) => {
			const [_, { grantPk }] = queryKey;
			return grantPk ? barn.account.grant(new PublicKey(grantPk)) : null;
		},
	});

	const project = useBarnProject(
		grant.data?.project.toBase58() || null
	).project;

	const milestonePks = useQuery({
		queryKey: [
			"milestones-keys",
			{
				grantPk: grantPk,
				count: grant.data?.count || null,
			},
		],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<
			[string, { grantPk: string | null; count: number | null }]
		>) => {
			const [_, { grantPk, count }] = queryKey;
			return grantPk && count
				? barn.account.getGrantMilestonesPks(new PublicKey(grantPk), count)
				: null;
		},
	});

	return { grant, project, milestonePks };
}

export function useBarnGrantMilestone(milestonePk: string) {
	const barn = useBarn();

	const milestone = useQuery({
		queryKey: ["milestone", { milestonePk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { milestonePk: string }]>) => {
			const [_, { milestonePk }] = queryKey;
			return barn.account.grantMilestone(new PublicKey(milestonePk));
		},
	});

	const { grant, project } = useBarnGrant(
		milestone.data?.grant.toBase58() || null
	);

	return { milestone, grant, project };
}

export function useBarn() {
	const { connection } = useConnection();

	const wallet = (useAnchorWallet() || {}) as Wallet;

	const provider = new AnchorProvider(connection, wallet);

	return new BarnClient(provider);
}

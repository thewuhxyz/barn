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
	EditGrantMilestoneArgs,
	SettleGrantMilestoneArgs,
	UpdateGrantMilestoneArgs,
} from "@barn/protocol";

export function useBarnRPC() {
	const barn = useBarn();

	const createUser = useMutation({
		mutationFn: (args: CreateUserArgs) => barn.rpc.createUser(args),
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
		mutationFn: (args: ApproveSponsorArgs) => barn.rpc.approveSponsor(args),
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
		mutationFn: (args: UpdateGrantMilestoneArgs) =>
			barn.rpc.acceptGrantMilestone(args),
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
		mutationFn: (args: AddGrantMilestoneArgs) =>
			barn.rpc.addGrantMilestone(args),
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
		mutationFn: (args: AddGrantProgramArgs) => barn.rpc.addGrantProgram(args),
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
		mutationFn: (args: AddProjectArgs) => barn.rpc.addProject(args),
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
		mutationFn: (args: AwardGrantArgs) => barn.rpc.awardGrant(args),
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

	const editGrantMilestone = useMutation({
		mutationFn: (args: EditGrantMilestoneArgs) =>
			barn.rpc.editGrantMilestone(args),
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
		mutationFn: (args: UpdateGrantMilestoneArgs) =>
			barn.rpc.rejectGrantMilestone(args),
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
		mutationFn: (args: UpdateGrantMilestoneArgs) =>
			barn.rpc.reviewGrantMilestone(args),
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
		mutationFn: (args: UpdateGrantMilestoneArgs) =>
			barn.rpc.reviseGrantMilestone(args),
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
		mutationFn: (args: SettleGrantMilestoneArgs) =>
			barn.rpc.settleGrantMilestone(args),
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
		editGrantMilestone,
		rejectGrantMilestone,
		reviewGrantMilestone,
		reviseGrantMilestone,
		settleGrantMilestone,
	};
}

export function useBarnUser() {
	const barn = useBarn();
	const { publicKey } = useWallet();

	const { profile, projectOrProgramPks, authority } = useBarnAuthority(
		publicKey ? barn.account.authorityAddress(publicKey).toBase58() : null
	);

	return { profile, projectOrProgramPks, authority };
}

export function useBarnAuthority(authorityPk: string | null) {
	const barn = useBarn();

	const authority = useQuery({
		queryKey: ["authority", { authorityPk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { authorityPk: string | null }]>) => {
			const [_, { authorityPk }] = queryKey;
			return authorityPk
				? barn.account.authority(new PublicKey(authorityPk))
				: null;
		},
	});

	const profile = useQuery({
		queryKey: [
			"profile",
			{ profilePk: authority.data?.profile.toBase58() || null },
		],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { profilePk: string | null }]>) => {
			const [_, { profilePk }] = queryKey;
			return profilePk ? barn.account.profile(new PublicKey(profilePk)) : null;
		},
	});

	const projectOrProgramPks = useQuery({
		queryKey: [
			"project-keys",
			{
				profilePk: authority.data?.profile.toBase58() || null,
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

	return { authority, profile, projectOrProgramPks };
}

export function useBarnProfile(profilePk: string | null) {
	const barn = useBarn();

	const profile = useQuery({
		queryKey: ["profile", { profilePk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { profilePk: string | null }]>) => {
			const [_, { profilePk }] = queryKey;
			return profilePk ? barn.account.profile(new PublicKey(profilePk)) : null;
		},
	});

	const { projectOrProgramPks, authority } = useBarnAuthority(
		profile.data?.authority.toBase58() || null
	);

	return { profile, projectOrProgramPks, authority };
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

	const { profile, authority } = useBarnProfile(
		project.data?.profile.toBase58() || null
	);

	return {
		project,
		profile,
		authority,
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

	const { profile, authority } = useBarnProfile(
		grantProgram.data?.profile.toBase58() || null
	);

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

	return { grantProgram, authority, profile, grantPks: grantPks.data ?? null };
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

	const { project, authority, profile } = useBarnProject(
		grant.data?.project.toBase58() || null
	);

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

	return { grant, project, milestonePks, authority, profile };
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

	const { grant, project, authority, profile } = useBarnGrant(
		milestone.data?.grant.toBase58() || null
	);

	return { milestone, grant, project, authority, profile };
}

export function useBarn() {
	const { connection } = useConnection();

	const wallet = (useAnchorWallet() || {}) as Wallet;

	const provider = new AnchorProvider(connection, wallet);

	return new BarnClient(provider);
}

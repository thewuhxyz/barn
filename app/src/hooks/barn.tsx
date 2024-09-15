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
	AddProjectArgs,
	ApproveSponsorArgs,
	CreateUserArgs,
} from "@barn/protocol";

export function useBarnRPC() {
	const barn = useBarn();

	const doCreateUser = (args: CreateUserArgs) => barn.rpc.createUser(args);
	const doApproveSponsor = (args: ApproveSponsorArgs) =>
		barn.rpc.approveSponsor(args);
	const doAddProject = (args: AddProjectArgs) => barn.rpc.addProject(args);

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
		mutationFn: barn.rpc.addGrantMilestone,
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
		mutationFn: barn.rpc.addGrantProgram,
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
		mutationFn: barn.rpc.awardGrant,
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

// export function useBarnState() {
// 	const barn = useBarn();
// 	const { publicKey } = useWallet();

// 	const getUserProfile = (pubkey: string) =>
// 		barn.account.getUserProfile(new PublicKey(pubkey));
// 	// all projects
// 	const allProjects = useQuery({
// 		queryKey: ["all-projects"],
// 		queryFn: barn.account.getAllProjectAccounts,
// 	});

// 	// user profile
// 	const userProfile = useQuery({
// 		queryKey: ["profile", { publicKey: publicKey?.toBase58() ?? null }],
// 		queryFn: ({
// 			queryKey,
// 		}: QueryFunctionContext<[string, { publicKey: string | null }]>) => {
// 			const [_, { publicKey }] = queryKey;
// 			return publicKey
// 				? barn.account.getUserProfile(new PublicKey(publicKey))
// 				: null;
// 		},
// 	});

// 	// all projects for user
// 	const userProjects = useQuery({
// 		queryKey: ["profile", { publicKey: publicKey?.toBase58() ?? null }],
// 		queryFn: ({
// 			queryKey,
// 		}: QueryFunctionContext<[string, { publicKey: string | null }]>) => {
// 			const [_, { publicKey }] = queryKey;
// 			return publicKey
// 				? barn.account.getUserProjects(new PublicKey(publicKey))
// 				: null;
// 		},
// 	});

// 	return { allProjects, userProfile, userProjects };
// }

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

	const projectsPks = useQuery({
		queryKey: [
			"project-keys",
			{
				profilePk: profile.data?.profile?.toBase58() ?? null,
				count: profile.data?.count || null,
			},
		],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<
			[string, { profilePk: string | null; count: number | null }]
		>) => {
			const [_, { profilePk, count }] = queryKey;
			return profilePk && count
				? barn.account.getProjectPks(new PublicKey(profilePk), count)
				: null;
		},
	});

	return { profile, projectsPks };
}

export function useBarnProject(projectPk: string) {
	const barn = useBarn();

	console.log("profile:", )

	const project = useQuery({
		queryKey: ["project", { projectPk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { projectPk: string }]>) => {
			const [_, { projectPk }] = queryKey;
			return barn.account.project(new PublicKey(projectPk));
		},
	});

	return { project };
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

	return { grant, milestonePks };
}

export function useBarnMilestone(milestonePk: string) {
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

	return milestone;
}

export function useBarn() {
	const { connection } = useConnection();

	const wallet = (useAnchorWallet() || {}) as Wallet;

	const provider = new AnchorProvider(connection, wallet);

	return new BarnClient(provider);
}

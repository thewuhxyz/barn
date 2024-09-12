"use client";

import { BarnClient } from "@barn/protocol";
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryFunctionContext,
} from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import { GoToExplorer } from "@/components/solana";
import { PublicKey } from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";

export function useBarnRPC() {
	const { barn } = useBarn();

	const createUser = useMutation({
		mutationFn: barn.rpc.createUser,
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
		mutationFn: barn.rpc.approveSponsor,
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
		mutationFn: barn.rpc.addProject,
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

export function useBarnState() {
	const { barn } = useBarn();
	const { publicKey } = useWallet();
	// all projects
	const allProjects = useQuery({
		queryKey: ["all-projects"],
		queryFn: barn.account.getAllProjectAccounts,
	});

	// user profile
	const userProfile = useQuery({
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

	// all projects for user
	const userProjects = useQuery({
		queryKey: ["profile", { publicKey: publicKey?.toBase58() ?? null }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { publicKey: string | null }]>) => {
			const [_, { publicKey }] = queryKey;
			return publicKey
				? barn.account.getUserProjects(new PublicKey(publicKey))
				: null;
		},
	});

	return { allProjects, userProfile, userProjects };
}

export function useBarn() {
	const { connection } = useConnection();
	const { publicKey, signTransaction, signAllTransactions } = useWallet();

	const wallet = (): Wallet => {
		if (!publicKey || !signTransaction || !signAllTransactions) {
			return {} as Wallet;
		}
		return {
			publicKey,
			signTransaction,
			signAllTransactions,
		} as Wallet;
	};

	const provider = new AnchorProvider(connection, wallet(), {});

	return { barn: new BarnClient(provider) };
}

// "use client";

// import { BarnClient } from "@barn/protocol";
// import * as anchor from "@coral-xyz/anchor";
// import {
// 	useQuery,
// 	useMutation,
// 	useQueryClient,
// 	QueryFunctionContext,
// } from "@tanstack/react-query";
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { toast } from "sonner";
// import { cn } from "@/lib/utils";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";
// import { Cluster } from "@solana/web3.js";


// function useCounter() {
// 	const program = useProgram();
// 	const { publicKey } = useWallet();
// 	const queryClient = useQueryClient();

// 	const { data, error, isLoading } = useQuery({
// 		queryKey: ["counter", { publicKey: publicKey?.toBase58() ?? null }],
// 		queryFn: ({
// 			queryKey,
// 		}: QueryFunctionContext<[string, { publicKey: string | null }]>) => {
// 			const [_, { publicKey }] = queryKey;
// 			return publicKey
// 				? program.account.counter.fetchNullable(
// 						counterPda(new anchor.web3.PublicKey(publicKey))
// 					)
// 				: null;
// 		},
// 	});

// 	async function createCounter() {
// 		if (!publicKey)
// 			throw new Error("Cannot create counter. Wallet not connected.");
// 		return await program.methods
// 			.createCounter()
// 			.accountsStrict({
// 				authority: publicKey,
// 				counter: counterPda(publicKey),
// 				systemProgram: anchor.web3.SystemProgram.programId,
// 			})
// 			.rpc();
// 	}

// 	async function incrementCount() {
// 		if (!publicKey)
// 			throw new Error("Cannot increment count. Wallet not connected.");
// 		return await program.methods
// 			.incrementCount()
// 			.accountsStrict({
// 				authority: publicKey,
// 				counter: counterPda(publicKey),
// 			})
// 			.rpc();
// 	}

// 	const invalidate = () =>
// 		queryClient.invalidateQueries({
// 			queryKey: ["counter", { publicKey: publicKey?.toBase58() ?? null }],
// 		});

// 	const createCounterMutation = useMutation({
// 		mutationFn: createCounter,
// 		onSuccess: (tx) => {
// 			invalidate();
// 			toast.success("Counter created successfully!", {
// 				action: <GoToExplorer tx={tx} cluster="custom" />,
// 				className: "w-max",
// 			});
// 		},
// 		onError: (e) => {
// 			console.error("error:", e);
// 			toast.error(`Error creating counter. ${e.message}`);
// 		},
// 	});

// 	const incrementCountMutation = useMutation({
// 		mutationFn: incrementCount,
// 		onSuccess: (tx) => {
// 			invalidate();
// 			toast.success("Count incremented!", {
// 				action: <GoToExplorer tx={tx} cluster="custom" />,
// 				className: "w-max",
// 			});
// 		},
// 		onError: () => {
// 			toast.error("Error incrementing count.");
// 		},
// 	});

// 	return {
// 		counter: data,
// 		error,
// 		isLoading,
// 		invalidate,
// 		createCounter: createCounterMutation.mutate,
// 		incrementCount: incrementCountMutation.mutate,
// 	};
// }

// function GoToExplorer({
// 	tx,
// 	cluster,
// }: {
// 	tx: string;
// 	cluster: Cluster | "custom";
// }) {
// 	const explorer = `https://explorer.solana.com/tx/${tx}?cluster=${cluster}`;
// 	return (
// 		<a href={explorer} className={cn(buttonVariants({ size: "sm" }))}>
// 			See Explorer
// 		</a>
// 	);
// }

// function useProgram() {
// 	const { connection } = useConnection();
// 	const { publicKey, signTransaction, signAllTransactions } = useWallet();

// 	const wallet = (): anchor.Wallet => {
// 		if (!publicKey || !signTransaction || !signAllTransactions) {
// 			return {} as anchor.Wallet;
// 		}
// 		return {
// 			publicKey,
// 			signTransaction,
// 			signAllTransactions,
// 		} as anchor.Wallet;
// 	};

// 	const provider = new anchor.AnchorProvider(connection, wallet(), {});

// 	return new BarnClient(provider);
// }

"use client";

import { BarnClient, BarnMethod } from "@barn/protocol";
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

function useSendBarnTransaction() {
	const sendBarnTransaction = (
		barnMethod: BarnMethod,
		invalidateFn?: () => Promise<void>
	) => {
		const mutation = useMutation({
			mutationFn: barnMethod.rpc,
			onSuccess: (tx) => {
				invalidateFn && invalidateFn();
				toast.success("Transaction successful!", {
					action: <GoToExplorer tx={tx} cluster="custom" />,
					className: "w-max",
				});
			},
			onError: (e) => {
				console.error("error:", e);
				toast.error(`Transaction failed. ${e.message}`);
			},
		});

		return mutation.mutate;
	};

	return { sendBarnTransaction };
}



function useBarnState() {
  // all projects
  // user profile
  // all projects for user
  // all grants for user
  // 
}

// function useBarnAccounts() {
// 	const { barn } = useBarn();
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

// 	return {
// 		counter: data,
// 		error,
// 		isLoading,
// 		invalidate,
// 		createCounter: createCounterMutation.mutate,
// 		incrementCount: incrementCountMutation.mutate,
// 	};
// }

function useBarn() {
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

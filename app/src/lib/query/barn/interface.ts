import { QueryFunctionContext } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { AuthorityAccount, BarnClient } from "@barn/protocol";

export type BarnAccountQueryKey<T> = [T, { publicKey: string | null }];

export type BarnAccountPubkeysQueryKey<T> = [
	T,
	{ publicKey: string | null; keys: number | null },
];

export type BarnAccountQueryFn<T extends string, U> = (
	ctx: QueryFunctionContext<BarnAccountQueryKey<T>>
) => Promise<U | null> | null;

export type BarnAccountPubkeysQueryFn<T extends string> = (
	ctx: QueryFunctionContext<BarnAccountPubkeysQueryKey<T>>
) => PublicKey[] | null;

export type BarnAccountQueryReturn<T extends string, U> = {
	queryKey: BarnAccountQueryKey<T>;
	queryFn: BarnAccountQueryFn<T, U>;
};

export type BarnAccountPubkeysQueryReturn<T extends string> = {
	queryKey: BarnAccountPubkeysQueryKey<T>;
	queryFn: BarnAccountPubkeysQueryFn<T>;
};

export interface BarnAccountQuery<T extends string, U> {
	queryKey: (publicKey: string | null) => BarnAccountQueryKey<T>;

  query: (
    barn: BarnClient,
    publicKey: string | null
  ) => BarnAccountQueryReturn<T, U>;

	pubkeysQueryKey: (
		publicKey: string | null,
		count: number | null
	) => BarnAccountPubkeysQueryKey<T>;

	pubkeysQuery: (
		barn: BarnClient,
		publicKey: string | null,
		count: number | null
	) => BarnAccountPubkeysQueryReturn<T>;
}

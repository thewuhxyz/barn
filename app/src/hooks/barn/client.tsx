"use client";

import { BarnClient } from "@barn/protocol";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";

export function useBarn() {
	const { connection } = useConnection();

	const wallet = (useAnchorWallet() || {}) as Wallet;

	const provider = new AnchorProvider(connection, wallet);

	return new BarnClient(provider);
}

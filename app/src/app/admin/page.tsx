"use client";

import { ApproveSponsor } from "@/components/barn/rpc";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/context";

export default function Admin() {
	const { publicKey } = useWallet();

	return (
		<main className="flex flex-col items-center space-y-16">
			{publicKey ? (
				<ApproveSponsor />
			) : (
				<>
					<p>Connect wallet</p>
					<WalletButton />
				</>
			)}
		</main>
	);
}

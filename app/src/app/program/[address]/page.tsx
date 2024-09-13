"use client";

import { useConnection } from "@solana/wallet-adapter-react";

export default function Program() {
	const { connection } = useConnection();
	return (
		<main className="flex-1 flex flex-col items-center justify-center space-y-16">
			<h1 className="text-3xl font-bold">Barn - Solana Grants Manager</h1>
			<div className="flex items-center justify-center space-x-2">
				<p className="">Manage grants on-chain with ease.</p>
				<p className=""> RPC Endpoint: {connection.rpcEndpoint}</p>
			</div>
		</main>
	);
}



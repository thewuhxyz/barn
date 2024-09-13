"use client";

import { useConnection } from "@solana/wallet-adapter-react";

export default function Programs() {
	const { connection } = useConnection();
	return (
    <main className="flex-1 flex flex-col items-center justify-center space-y-16">
      <p className=""> RPC Endpoint: {connection.rpcEndpoint}</p>
			
		</main>
	);
}

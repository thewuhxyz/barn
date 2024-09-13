"use client";

import { AllGrantedProjects } from "@/components/barn";
import { useConnection } from "@solana/wallet-adapter-react";

export default function Home() {
	const { connection } = useConnection();
	return (
		<main className="flex-1 flex flex-col items-center justify-center space-y-16">
			<p className=""> RPC Endpoint: {connection.rpcEndpoint}</p>
			<AllGrantedProjects />
		</main>
	);
}

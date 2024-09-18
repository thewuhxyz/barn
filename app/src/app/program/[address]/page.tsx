"use client";

import { GrantProgramCard } from "@/components/barn";
import { GrantCard } from "@/components/barn/profile";
import { useBarnGrantProgram } from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";

export default function Program({ params }: { params: { address: string } }) {
	const projectPk = params.address;
	const { grantPks } = useBarnGrantProgram(projectPk);

	return (
		<main className="flex-1 items-center justify-center space-y-16">
			<GrantProgramCard publicKey={new PublicKey(projectPk)} />
			<div className="w-full">
				<div>Projects</div>
				<div className="space-y-4">
					{grantPks
						? grantPks.map((m, i) => <GrantCard key={i} publicKey={m} />)
						: "No milestones"}
				</div>
			</div>
		</main>
	);
}

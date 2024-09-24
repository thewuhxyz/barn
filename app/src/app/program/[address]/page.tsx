"use client";

import { GrantProgramCardFromPubkey } from "@/components/barn/program";
import { ProjectCardFromGrantPubkey } from "@/components/barn/project";
import { useBarnGrantProgram } from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";

export default function Program({ params }: { params: { address: string } }) {
	const grantProgramPk = params.address;
	const { grantPks, grantProgram } = useBarnGrantProgram(grantProgramPk);

	return (
		<main className="flex-1 items-center justify-center space-y-16">
			{grantProgram ? (
				<>
					<GrantProgramCardFromPubkey
						publicKey={new PublicKey(grantProgramPk)}
					/>
					<div className="w-full space-y-4">
						<p className="text-center text-lg">All Awarded Projects</p>
						{grantPks ? (
							<div className="space-y-4 grid grid-cols-2 gap-8">
								{grantPks.map((m, i) => (
									<ProjectCardFromGrantPubkey key={i} publicKey={m} />
								))}
							</div>
						) : (
							"No Grants Awarded yet"
						)}
					</div>
				</>
			) : (
				`Not Grant Program Found for address: ${grantProgramPk}`
			)}
		</main>
	);
}

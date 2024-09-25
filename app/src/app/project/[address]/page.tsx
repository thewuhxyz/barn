"use client";

import { useBarnProject } from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";
import {
	ProjectPageDetailsFromPubkey,
	ProjectPageHeaderFromPubkey,
} from "@/components/barn/project-page";
import { GrantDetailsFromPubkey } from "@/components/barn/project-page/grant";

export default function Project({ params }: { params: { address: string } }) {
	const projectPk = params.address;
	const { grantPk } = useBarnProject(projectPk);

	return (
		<main className="flex-1 flex flex-col items-center space-y-8">
			<ProjectPageHeaderFromPubkey publicKey={new PublicKey(projectPk)} />
			<ProjectPageDetailsFromPubkey publicKey={new PublicKey(projectPk)} />
			<div className="w-full">
				{grantPk ? (
					<GrantDetailsFromPubkey publicKey={grantPk} />
				) : (
					"No Grants Awarded"
				)}
			</div>
		</main>
	);
}

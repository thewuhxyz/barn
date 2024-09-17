"use client";

import { ProjectCard } from "@/components/barn";
import { GrantCard, MilestoneCard } from "@/components/barn/profile";
import { useBarnGrant, useBarnProject } from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";

export default function Project({ params }: { params: { address: string } }) {
	const projectPk = params.address;

	const { project, grantPk } = useBarnProject(projectPk);

	const {
		grant: { data: grant },
		milestonePks: { data: milestones },
	} = useBarnGrant(grantPk?.toBase58() ?? null);

	return (
		<main className="flex-1 flex flex-col items-center justify-center space-y-16">
			<ProjectCard publicKey={new PublicKey(projectPk)} />
			<div className="w-full">
				<div>Grant</div>
				{grantPk ? <GrantCard publicKey={grantPk} /> : "No Grants Awarded"}
			</div>
			<div className="w-full">
				<div>Milestones</div>
				<MilestoneCard />
			</div>
		</main>
	);
}

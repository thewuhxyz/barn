"use client";

import { usePathname } from "next/navigation";
import { ProjectCard } from "@/components/barn";
import { GrantCard, MilestoneCard } from "@/components/barn/profile";
import { PublicKey } from "@solana/web3.js";

export default function Project({ params }: { params: { address: string } }) {
	const projectPk = params.address;
	return (
		<main className="flex-1 flex flex-col items-center justify-center space-y-16">
			<ProjectCard publicKey={new PublicKey(projectPk)} />
			<div className="w-full">
				<div>Grant</div>
				<GrantCard />
			</div>
			<div className="w-full">
				<div>Milestones</div>
				<MilestoneCard />
			</div>
		</main>
	);
}

"use client";

import { ProjectCard } from "@/components/barn";
import { GrantCard, MilestoneCard } from "@/components/barn/profile";

export default function Project() {
	return (
		<main className="flex-1 flex flex-col items-center justify-center space-y-16">
			<ProjectCard />
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

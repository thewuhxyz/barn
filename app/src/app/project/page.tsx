"use client";

import { AllProjects } from "@/components/barn/project";

export default function Home() {
	return (
		<main className="flex-1 items-center justify-center space-y-16">
			<p className="text-center"> All Projects</p>
			<AllProjects />
		</main>
	);
}

"use client";

import { AllGrantedProjects } from "@/components/barn/project";

export default function Home() {
	return (
		<main className="flex-1 items-center justify-center space-y-16">
			<p className=""> All Granted Projects</p>
			<AllGrantedProjects />
		</main>
	);
}

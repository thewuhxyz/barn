"use client";

import { AllGrantPrograms } from "@/components/barn/program";

export default function Program() {
	return (
		<main className="flex-1 items-center justify-center space-y-16">
			<p className="text-center"> All Grant Programs</p>
			<AllGrantPrograms />
		</main>
	);
}

"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export type ProjectCardProps = {};

export function AllGrantedProjects() {
	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{Array.from({ length: 10 }).map((_, i) => (
				<ProjectCard key={i} />
			))}
		</div>
	);
}

export function ProjectCard() {
	return (
		<Link className="w-full" href={"/project/address"}>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>ProjectTitle | "approved_amount"</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>Desecripttion: "description"</CardDescription>
					<CardDescription>Github: {"<github_url>"}</CardDescription>
					<CardDescription>Owner: "owner"</CardDescription>
					<CardDescription>Amount paid out: "amount_paid_out"</CardDescription>
				</CardContent>
			</Card>
		</Link>
	);
}

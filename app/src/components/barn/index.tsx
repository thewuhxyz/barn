"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useBarnGrantProgram, useBarnProject } from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { AwardGrant } from "./project";

export type ProjectCardProps = {};

export function AllGrantedProjects() {
	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{Array.from({ length: 10 }).map((_, i) => (
				<ProjectCards key={i} />
			))}
		</div>
	);
}

export function ProjectCard({ publicKey }: { publicKey: PublicKey }) {
	const {
		project: { data: project },
	} = useBarnProject(publicKey.toBase58());

	if (!project) {
		return <></>;
	}

	return (
		<Link className="w-full" href={`/project/${publicKey.toBase58()}`}>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>ProjectTitle - {project.id}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>Desecription: "description"</CardDescription>
					<CardDescription>Owner: {project.profile.toBase58()}</CardDescription>
					<CardDescription>
						grant: {project.grant?.toBase58() ?? null}
					</CardDescription>
				</CardContent>
			</Card>
		</Link>
	);
}

export function GrantProgramCard({ publicKey }: { publicKey: PublicKey }) {
	const {
		grantProgram: { data: grantProgram },
	} = useBarnGrantProgram(publicKey.toBase58());

	if (!grantProgram) {
		return <></>;
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Grant Program - {grantProgram.id}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>Desecription: "description"</CardDescription>
				<CardDescription>
					Owner: {grantProgram.profile.toBase58()}
				</CardDescription>
				<CardDescription>
					No of grants issued: {grantProgram.count}
				</CardDescription>
			</CardContent>
			<CardFooter>
				<AwardGrant grantProgram={publicKey} />
			</CardFooter>
		</Card>
	);
}

export function ProjectCards() {
	return (
		<Link className="w-full" href={"/project/address"}>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>ProjectTitle | "approved_amount"</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>Desecription: "description"</CardDescription>
					<CardDescription>Github: {"<github_url>"}</CardDescription>
					<CardDescription>Owner: "owner"</CardDescription>
					<CardDescription>Amount paid out: "amount_paid_out"</CardDescription>
				</CardContent>
			</Card>
		</Link>
	);
}

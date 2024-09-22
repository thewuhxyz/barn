"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	useBarnAccount,
	useBarnGrantProgram,
	useBarnProject,
} from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { AwardGrant } from "./project";

export type ProjectCardProps = {};

export function AllGrantedProjects() {
	const { allGrants } = useBarnAccount();
	if (!allGrants) return <></>;
	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{allGrants.map((grant, i) => (
				<ProjectCard key={i} publicKey={grant.project}></ProjectCard>
			))}
		</div>
	);
}

export function AllGrantPrograms() {
	const { allGrantPrograms } = useBarnAccount();
	if (!allGrantPrograms) return <></>;
	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{allGrantPrograms.map(({ publicKey }, i) => (
				<GrantProgramCard key={i} publicKey={publicKey}></GrantProgramCard>
			))}
		</div>
	);
}

export function ProjectCard({ publicKey }: { publicKey: PublicKey }) {
	const { project, projectUri, authority } = useBarnProject(publicKey.toBase58());

	if (!project || !authority) {
		return <></>;
	}

	return (
		<Link className="w-full" href={`/project/${publicKey.toBase58()}`}>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>
						{projectUri?.name ?? ""} - {project.id}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>Desecription: {projectUri?.description ?? "Nil"} </CardDescription>
					<CardDescription>Owner: {authority.signer.toBase58()}</CardDescription>
					<CardDescription>
						grant: {project.grant?.toBase58() ?? null}
					</CardDescription>
				</CardContent>
			</Card>
		</Link>
	);
}

export function GrantProgramCard({ publicKey }: { publicKey: PublicKey }) {
	const { grantProgram } = useBarnGrantProgram(publicKey.toBase58());

	if (!grantProgram) {
		return <></>;
	}

	return (
		<Card className="w-full">
			<Link className="w-full" href={`/program/${publicKey}`}>
				<CardHeader>
					<CardTitle>Grant Program - {grantProgram.id}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>Desecription: description</CardDescription>
					<CardDescription>
						Owner: {grantProgram.profile.toBase58()}
					</CardDescription>
					<CardDescription>
						No of grants issued: {grantProgram.count}
					</CardDescription>
				</CardContent>
			</Link>
			<CardFooter>
				<AwardGrant grantProgram={publicKey} />
			</CardFooter>
		</Card>
	);
}

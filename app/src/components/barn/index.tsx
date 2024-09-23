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
import { AwardGrant } from "./project-page";
import { useGithubRepo } from "@/hooks/barn/uri";

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
	const { project, projectUri, authority, profile } = useBarnProject(
		publicKey.toBase58()
	);

	const projectRepo = useGithubRepo({ repo: projectUri?.github || null });

	if (!project || !authority || !profile) {
		return <></>;
	}

	return (
		<Card className="w-full">
			<Link className="w-full" href={`/project/${publicKey.toBase58()}`}>
				<CardHeader>
					<CardTitle>
						{projectUri?.name ?? `Untitled Project ${project.id}`}
					</CardTitle>
				</CardHeader>
			</Link>
			<CardContent className="space-y-4">
				<CardDescription>{projectUri?.description ?? "Nil"} </CardDescription>
				<CardDescription>
					Owner: {`@${profile.seed}` || authority.signer.toBase58()}
				</CardDescription>
				<CardDescription>
					Github Repo: {`https://github.com/${projectUri?.github}`}
				</CardDescription>
				<CardDescription>address: {publicKey.toBase58()}</CardDescription>
				<CardDescription>
					grant: {project.grant?.toBase58() ?? "None"}
				</CardDescription>
			</CardContent>
			<CardFooter>
				<Link href={`https://github.com/${projectUri?.github}`}>Github</Link>
			</CardFooter>
		</Card>
	);
}

export function GrantProgramCard({ publicKey }: { publicKey: PublicKey }) {
	const { grantProgram, profile, grantProgramUri, authority } =
		useBarnGrantProgram(publicKey.toBase58());

	if (!grantProgram || !profile || !authority) {
		return <></>;
	}

	return (
		<Card className="w-full">
			<Link className="w-full" href={`/program/${publicKey}`}>
				<CardHeader>
					<CardTitle>
						{grantProgramUri?.name ?? `Untitled Program ${grantProgram.id}`}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<CardDescription>
						{grantProgramUri?.description ?? "Nil"}
					</CardDescription>
					<CardDescription>
						Owner: {`@${profile.seed}` || authority.signer.toBase58()}
					</CardDescription>
					<CardDescription>Grants issued: {grantProgram.count}</CardDescription>
				</CardContent>
			</Link>
			<CardFooter>
				<AwardGrant grantProgram={publicKey} />
			</CardFooter>
		</Card>
	);
}

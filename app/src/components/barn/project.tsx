import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useBarnAccount, useBarnGrant, useBarnProject } from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function AllProjects() {
	const { allProjects } = useBarnAccount();
	if (!allProjects) return <>No Granted Project</>;
	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{allProjects.map(({ publicKey }, i) => (
				<ProjectCardFromPubkey key={i} publicKey={publicKey} />
			))}
		</div>
	);
}

export function AllGrantedProjects() {
	const { allGrants } = useBarnAccount();
	if (!allGrants) return <>No Granted Project</>;
	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{allGrants.map((grant, i) => (
				<ProjectCardFromGrantPubkey key={i} publicKey={grant.key} />
			))}
		</div>
	);
}

export function ProjectCardFromGrantPubkey({
	publicKey,
}: {
	publicKey: PublicKey;
}) {
	const { project } = useBarnGrant(publicKey.toBase58());

	if (!project) {
		return <></>;
	}

	return <ProjectCardFromPubkey publicKey={project.key} />;
}

export function ProjectCardFromPubkey({ publicKey }: { publicKey: PublicKey }) {
	const { project, projectUri, authority, profile } = useBarnProject(
		publicKey.toBase58()
	);

	const { grantProgramUri, grant } = useBarnGrant(
		project?.grant?.toBase58() || null
	);

	if (!project || !authority || !profile) {
		return <></>;
	}

	const props: ProjectCardProps = {
		description: projectUri?.description ?? undefined,
		owner: profile.seed,
		program: grantProgramUri?.name,
		title: projectUri?.name ?? `Untitled ${project.id}`,
		approvedAmount: grant?.approvedAmount,
		publicKey: project.key.toBase58(),
		profileKey: profile.key.toBase58(),
		programKey: grant?.program.toBase58(),
	};

	return <ProjectCard {...props} />;
}

export function ProjectCard(props: ProjectCardProps) {
	return (
		<Card className="w-full">
			<Link href={`/project/${props.publicKey}`}>
				<CardHeader>
					<Image
						src="/next.svg"
						alt="Card image"
						width={120}
						height={120}
						className="h-full w-full object-cover"
					/>
					<div className="flex justify-between">
						<CardTitle>{props.title}</CardTitle>
						{props.approvedAmount && <Badge>{props.approvedAmount} SOL</Badge>}
					</div>
				</CardHeader>
				<CardContent>
					<CardDescription>{props.description}</CardDescription>
				</CardContent>
			</Link>
			<CardFooter className="flex justify-between">
				<Link
					href={`/profile/${props.profileKey}`}
					className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
				>
					@{props.owner}
				</Link>
				{props.program && (
					<Link
						href={`/program/${props.programKey}`}
						className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
					>
						{props.program}
					</Link>
				)}
			</CardFooter>
		</Card>
	);
}

export type ProjectCardProps = {
	title: string;
	approvedAmount?: number;
	description?: string;
	owner: string;
	program?: string | null;
	publicKey: string;
	profileKey: string;
	programKey?: string | null;
};

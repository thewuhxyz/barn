import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useBarnGrant, useBarnProject } from "@/hooks/barn";
import { useGithubRepo } from "@/hooks/barn/uri";
import { PublicKey } from "@solana/web3.js";

export function ProjectCardFromGrantPubkey({ publicKey }: { publicKey: PublicKey }) {
	
	const {project} = useBarnGrant(publicKey.toBase58())

	if (!project) {
		return <></>;
	}

	return <ProjectCardFromPubkey publicKey={project.key} />;
}

export function ProjectCardFromPubkey({ publicKey }: { publicKey: PublicKey }) {
	const { project, projectUri, authority, profile } = useBarnProject(
		publicKey.toBase58()
	);

	const projectRepo = useGithubRepo({ repo: projectUri?.github || null });

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
	};

	return <ProjectCard {...props} />;
}

export function ProjectCard(props: ProjectCardProps) {
	return (
		<Card className="w-full">
			<div className="">
				<Image
					src="/next.svg"
					alt="Card image"
					width={300}
					height={300}
					className="h-full w-full object-cover"
				/>
			</div>
			<div className="">
				<CardHeader>
					<div className="flex justify-between">
						<CardTitle>{props.title}</CardTitle>
						{props.approvedAmount && <Badge>{props.approvedAmount} SOL</Badge>}
					</div>
				</CardHeader>
				<CardContent>
					<CardDescription>{props.description}</CardDescription>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline" size="sm">
						{props.owner}
					</Button>
					{props.program && (
						<Button variant="ghost" size="sm">
							{props.program}
						</Button>
					)}
				</CardFooter>
			</div>
		</Card>
	);
}

export type ProjectCardProps = {
	title: string;
	approvedAmount?: number;
	description?: string;
	owner: string;
	program?: string | null;
};

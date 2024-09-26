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
import { useBarnGrant, useBarnProject } from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
	GitHubLogoIcon,
	GlobeIcon,
	TwitterLogoIcon,
} from "@radix-ui/react-icons";

export function ProjectPageHeaderFromPubkey({
	publicKey,
}: {
	publicKey: PublicKey;
}) {
	const { project, projectUri, authority, profile } = useBarnProject(
		publicKey.toBase58()
	);

	const { grantProgramUri, grant } = useBarnGrant(
		project?.grant?.toBase58() || null
	);

	if (!project || !authority || !profile) {
		return <></>;
	}

	const props: ProjectPageHeaderProps = {
		description: projectUri?.description ?? undefined,
		owner: profile.seed,
		program: grantProgramUri?.name,
		title: projectUri?.name ?? `Untitled ${project.id}`,
		approvedAmount: grant?.approvedAmount,
		publicKey: project.key.toBase58(),
		profileKey: profile.key.toBase58(),
		programKey: grant?.program.toBase58(),
		website: projectUri?.website,
		github: projectUri?.github
			? `https://github.com/${projectUri.github}`
			: null,
		twitter: projectUri?.twitter
			? `https://twitter.com/${projectUri.twitter}`
			: null,
		image: projectUri?.image_url,
	};

	return <ProjectPageHeader {...props} />;
}

export function ProjectPageHeader(props: ProjectPageHeaderProps) {
	return (
		<Card className="w-full">
			<CardHeader>
				{props.image && (
					<Image
						src={props.image}
						alt="Card image"
						width={120}
						height={120}
						className="object-fill pb-4"
					/>
				)}
				<div className="flex justify-between">
					<CardTitle className="text-xl">{props.title}</CardTitle>
					{props.approvedAmount && <Badge>{props.approvedAmount} SOL</Badge>}
				</div>
			</CardHeader>
			<CardContent>
				<CardDescription>{props.description}</CardDescription>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Link
					href={`/profile/${props.profileKey}`}
					className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
				>
					@{props.owner}
				</Link>
				<div className="flex items-center space-x-4">
					{props.github && (
						<Link
							href={props.github}
							className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
						>
							<GitHubLogoIcon />
						</Link>
					)}
					{props.website && (
						<Link
							href={props.website}
							className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
						>
							<GlobeIcon />
						</Link>
					)}
					{props.twitter && (
						<Link
							href={props.twitter}
							className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
						>
							<TwitterLogoIcon />
						</Link>
					)}
				</div>
			</CardFooter>
		</Card>
	);
}

export type ProjectPageHeaderProps = {
	title: string;
	approvedAmount?: number;
	description?: string;
	owner: string;
	github?: string | null;
	website?: string | null;
	twitter?: string | null;
	program?: string | null;
	publicKey: string;
	profileKey: string;
	programKey?: string | null;
	image?: string | null;
};

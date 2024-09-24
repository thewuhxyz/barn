import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useBarnProject } from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";

export function ProjectPageDetailsFromPubkey({
	publicKey,
}: {
	publicKey: PublicKey;
}) {
	const { project, projectUri, authority, profile } = useBarnProject(
		publicKey.toBase58()
	);

	if (!project || !authority || !profile) {
		return <></>;
	}

	const props: ProjectPageDetailsProps = {
		description: projectUri?.description ?? undefined,
		publicKey: project.key.toBase58(),
		additionalInfo: projectUri?.additional_info,
		objectives: projectUri?.objectives,
	};

	return <ProjectPageDetails {...props} />;
}

export function ProjectPageDetails(props: ProjectPageDetailsProps) {
	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex justify-between">
					<CardTitle>Details</CardTitle>
					<CardDescription>PK: {props.publicKey}</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 text-muted-foreground">
				<p>{props.description}</p>
				<div className="space-y-1">
					{props.objectives?.length ? (
						<>
							<p>Project Objectives</p>
							{props.objectives.map((obj, i) => (
								<li key={i}>{obj}</li>
							))}
						</>
					) : (
						" "
					)}
				</div>
				<div className="space-y-1">
					{props.additionalInfo?.length ? (
						<>
							<p>Addtional Info</p>
							{props.additionalInfo.map((info, i) => (
								<li key={i}>{info}</li>
							))}
						</>
					) : (
						""
					)}
				</div>
			</CardContent>
		</Card>
	);
}

export type ProjectPageDetailsProps = {
	description?: string;
	publicKey: string;
	objectives?: string[] | null;
	additionalInfo?: string[] | null;
};

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	useBarnGrant,
	useBarnGrantMilestone,
	useBarnUser,
} from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";
import { MilestoneState } from "@barn/protocol";
import Link from "next/link";

export function NotificationCardFromGrantPubkey({
	publicKey,
}: {
	publicKey: PublicKey;
}) {
	const { sponsor } = useBarnUser();

	const {
		project,
		projectUri,
		authority,
		profile,
		latestMilestone,
		grantProgram,
	} = useBarnGrant(publicKey.toBase58());

	const { grantProgramUri, grant, milestoneUri, milestone } =
		useBarnGrantMilestone(latestMilestone?.toBase58() || null);

	if (
		sponsor === undefined ||
		!project ||
		!authority ||
		!profile ||
		!grantProgram ||
		!grant ||
		!milestone
	) {
		return <></>;
	}

	const status = MilestoneState.toStatus(milestone.state);

	const props: NotificationCardProps = {
		description: milestoneUri?.name ?? `Untitled Milestone ${milestone.id}`,
		owner: profile.seed,
		status,
		program: grantProgramUri?.name || `Untitled Program ${grantProgram.id}`,
		title: projectUri?.name ?? `Untitled Project ${project.id}`,
		approvedAmount: grant.approvedAmount,
		projectKey: project.key.toBase58()
	};

	if (!sponsor && status === "accepted") {
		return <NotificationCard {...props} />;
	}

	if (sponsor && (status === "accepted" || status === "inReview")) {
		return <NotificationCard {...props} />;
	}

	return <></>;
}

export function NotificationCard(props: NotificationCardProps) {
	return (
		<Link href={`/project/${props.projectKey}`}>
			<Card className="w-full">
				<CardHeader>
					<div className="flex justify-between">
						<CardTitle>{props.title}</CardTitle>
						<div className="flex space-x-4 items-center">
							<Badge variant="secondary">{props.approvedAmount} SOL</Badge>
							<Badge
								className={`text-xs ${props.status === "accepted" ? "text-red-400" : "text-blue-400"}`}
							>
								{props.status === "accepted"
									? "Awaiting payment"
									: "Needs Review"}
							</Badge>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<CardDescription>{props.description}</CardDescription>
				</CardContent>
				<CardFooter className="flex justify-between">
					<p className="text-sm text-muted-foreground">@{props.owner}</p>
					<p className="text-sm text-muted-foreground">{props.program}</p>
				</CardFooter>
			</Card>
		</Link>
	);
}

export type NotificationCardProps = {
	title: string;
	approvedAmount: number;
	status: string;
	description: string;
	owner: string;
	program: string;
	projectKey: string
};

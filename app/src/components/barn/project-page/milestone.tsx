import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useBarnGrantMilestone } from "@/hooks/barn";
import { cn } from "@/lib/utils";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { UpdateMilestone } from "../rpc";
import { MilestoneState, toUiAmount } from "@barn/protocol";

export function MilestoneDetailsFromPubkey({
	publicKey,
}: {
	publicKey: PublicKey;
}) {
	const { grantUri, grant, milestoneUri, milestone } = useBarnGrantMilestone(
		publicKey.toBase58()
	);

	if (!milestone || !grant) {
		return <></>;
	}

	const props: MilestoneDetailsCardProps = {
		description: milestoneUri?.description ?? undefined,
		title: milestoneUri?.name ?? `Untitled Milestone - ${milestone.id}`,
		amount: toUiAmount(milestone.amount, grant.paymentDecimals),
		additionalInfo: grantUri?.additional_info,
		discussion: grantUri?.discussion,
		publicKey: milestone.key,
		id: milestone.id,
		status: MilestoneState.toStatus(milestone.state),
	};

	return <MilestoneDetailsCard {...props} />;
}

export function MilestoneDetailsCard(props: MilestoneDetailsCardProps) {
	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex justify-between">
					<CardTitle>{props.title}</CardTitle>
					<Badge className="max-w">
						{props.amount} SOL - {props.status}
					</Badge>
				</div>
				<div className="flex justify-between">
					<p className="text-muted-foreground text-xs">id: {props.id}</p>
					{props.discussion && (
						<Link
							href={props.discussion}
							className={cn(
								buttonVariants({
									size: "sm",
									variant: "link",
									className: "px-0 items-center",
								})
							)}
						>
							<p className="text-muted-foreground">See Discussion</p>
						</Link>
					)}
				</div>
			</CardHeader>
			<CardContent className="text-sm text-muted-foreground">
				<p>{props.description}</p>
			</CardContent>
			<CardFooter>
				<UpdateMilestone grantMilestonePk={props.publicKey} />
			</CardFooter>
		</Card>
	);
}

export type MilestoneDetailsCardProps = {
	title: string;
	amount: number;
	id: number;
	publicKey: PublicKey;
	description?: string;
	discussion?: string | null;
	program?: string | null;
	programKey?: string | null;
	objectives?: string[] | null;
	additionalInfo?: string[] | null;
	status: string;
};

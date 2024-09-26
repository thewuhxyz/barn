import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useBarnGrant } from "@/hooks/barn";
import { cn } from "@/lib/utils";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { MilestoneDetailsFromPubkey } from "./milestone";
import { AddGrantMilestone } from "../rpc";

export function GrantDetailsFromPubkey({
	publicKey,
}: {
	publicKey: PublicKey;
}) {
	const {
		projectUri,
		authority,
		profile,
		grantProgramUri,
		grantUri,
		grant,
		milestonePks,
	} = useBarnGrant(publicKey.toBase58());

	if (!grant || !authority || !profile) {
		return <></>;
	}

	const props: GrantDetailsCardProps = {
		description: grantUri?.description ?? undefined,
		publicKey: grant.key,
		title: grantUri?.name ?? projectUri?.name ?? `Untitled Grant - ${grant.id}`,
		approvedAmount: grant.approvedAmount,
		paidOut: grant.paidOut,
		program: grantProgramUri?.name ?? `Untitled Grant Program - ${grant.id}`,
		additionalInfo: grantUri?.additional_info,
		objectives: grantUri?.objectives,
		discussion: grantUri?.discussion,
		programKey: grant.program.toBase58(),
		milestones: milestonePks,
	};

	return <GrantDetailsCard {...props} />;
}

export function GrantDetailsCard(props: GrantDetailsCardProps) {
	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex justify-between">
					<CardTitle>{props.title}</CardTitle>
					<Badge className="max-w">
						{props.paidOut} / {props.approvedAmount} SOL
					</Badge>
				</div>
				<div className="flex justify-between">
					<Link
						href={`/program/${props.programKey}`}
						className={cn(
							buttonVariants({
								size: "sm",
								variant: "link",
								className: "px-0",
							})
						)}
					>
						<p className="text-muted-foreground">{props.program}</p>
					</Link>
					{props.discussion && (
						<Link
							href={props.discussion}
							className={cn(
								buttonVariants({
									size: "sm",
									variant: "link",
									className: "px-0",
								})
							)}
						>
							<p className="text-muted-foreground">See Discussion</p>
						</Link>
					)}
				</div>
			</CardHeader>
			<CardContent className="text-sm space-y-4 text-muted-foreground">
				<p>{props.description}</p>
				<div className="space-y-1">
					{props.objectives?.length ? (
						<>
							<p>Grant Objectives</p>
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

			<CardFooter className="flex flex-col space-y-4">
				{props.milestones &&
					props.milestones.map((pk, i) => (
						<MilestoneDetailsFromPubkey key={i} publicKey={pk} />
					))}
				<AddGrantMilestone grantPk={props.publicKey} />
			</CardFooter>
		</Card>
	);
}

export type GrantDetailsCardProps = {
	title: string;
	approvedAmount: number;
	paidOut: number;
	description?: string;
	discussion?: string | null;
	program?: string | null;
	publicKey: PublicKey;
	programKey?: string | null;
	objectives?: string[] | null;
	additionalInfo?: string[] | null;
	milestones?: PublicKey[] | null;
};

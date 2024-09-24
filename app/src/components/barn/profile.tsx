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
	useBarnGrant,
	useBarnGrantMilestone,
	useBarnGrantProgram,
	useBarnProject,
	useBarnUser,
} from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";
import {
	AddGrantMilestone,
	EditGrantMilestone,
	UpdateMilestone,
} from "./rpc";
import Link from "next/link";
import { MilestoneState } from "@barn/protocol";
import { useGithubProfile } from "@/hooks/barn/uri";
import Image from "next/image";
import { ProjectCardFromGrantPubkey, ProjectCardFromPubkey } from "./project";
import { GrantProgramCardFromPubkey } from "./program";
import { NotificationCardFromGrantPubkey } from "./notification";

export type ProjectCardProps = {};

export function AllUserProjects() {
	const { projectPks } = useBarnUser();

	if (!projectPks || !projectPks) return <p>No Projects For User</p>;

	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{projectPks.map((pk) => {
				console.log("pk:", pk.toBase58());
				return <ProjectCardFromPubkey key={pk.toBase58()} publicKey={pk} />;
			})}
		</div>
	);
}

export function AllUserGrantPrograms() {
	const { programPks: grantProgramPks } = useBarnUser();

	if (!grantProgramPks || !grantProgramPks.length)
		return <p>No Grant Programs For User</p>;

	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{grantProgramPks.map((pk) => {
				return (
					<GrantProgramCardFromPubkey key={pk.toBase58()} publicKey={pk} />
				);
			})}
		</div>
	);
}

export function AllUserGrants() {
	const { grantPks } = useBarnUser();

	if (!grantPks || !grantPks.length) return <p>No Projects For User</p>;

	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{grantPks.map((pk) => (
				<ProjectCardFromGrantPubkey publicKey={pk} />
			))}
		</div>
	);
}

export function AllUserNotifications() {
	const { profile, grantPks } = useBarnUser();

	if (!profile || !grantPks) return <p>No Notifications For User</p>;

	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{grantPks.map((pk) => (
				<NotificationCardFromGrantPubkey key={pk.toBase58()} publicKey={pk} />
			))}
		</div>
	);
}

export function ProfileCard() {
	const { profile, authority, profileUri } = useBarnUser();

	const some = useGithubProfile({ user: profileUri?.github || null });

	if (!profile || !authority) {
		return "Create a Profile";
	}

	return (
		<Card className="w-full">
			<CardHeader>
				{some?.avatar_url && (
					<Image
						width={120}
						height={120}
						src={some.avatar_url}
						alt={some.twitter_username || profile.seed}
					/>
				)}
				<CardTitle>@{profile.seed}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<CardDescription>name: {profileUri?.name}</CardDescription>
				<CardDescription>bio: {profileUri?.bio}</CardDescription>
				<CardDescription>Pubkey: {authority.signer.toBase58()}</CardDescription>
				<CardDescription>
					Profile: {authority.profile.toBase58()}
				</CardDescription>
				<CardDescription>
					Account: {profile.sponsor ? "Sponsor" : "Developer"}
				</CardDescription>
				<CardDescription>
					{profile.sponsor ? "Grant Programs" : "Projects"}: {profile.count}
				</CardDescription>
			</CardContent>
			<CardFooter className="space-x-4">
				<Link href={`https://github.com/${profileUri?.github}`}>Github</Link>
				<Link href={`https://twitter.com/${profileUri?.twitter}`}>Twitter</Link>
			</CardFooter>
		</Card>
	);
}

export function MilestoneCard({ publicKey }: { publicKey: PublicKey }) {
	const {
		grant,
		project,
		milestone,
		milestoneUri,
		projectUri,
		profile,
		grantProgramUri,
	} = useBarnGrantMilestone(publicKey.toBase58());

	if (!grant || !project || !milestone) return;
	return (
		<Card className="w-full">
			<Link href={`/project/${grant.project}`}>
				<CardHeader>
					<CardTitle>{milestoneUri?.name}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>
						Description: {milestoneUri?.description}
					</CardDescription>
					<CardDescription>Project: {projectUri?.name}</CardDescription>
					<CardDescription>
						Grant Program: {grantProgramUri?.name}
					</CardDescription>
					<CardDescription>Owner: {profile?.seed}</CardDescription>
					<CardDescription>
						Amount: {milestone.amount.toNumber() / 10 ** grant.paymentDecimals}
					</CardDescription>
					<CardDescription>Milestone id: {milestone.id}</CardDescription>
					<CardDescription>
						Status: {MilestoneState.toStatus(milestone.state)}
					</CardDescription>
				</CardContent>
			</Link>
			<CardFooter className="flex flex-col space-y-4">
				<UpdateMilestone grantMilestonePk={publicKey} />
				<EditGrantMilestone grantMilestonePk={publicKey} />
			</CardFooter>
		</Card>
	);
}

export function GrantCard({ publicKey }: { publicKey: PublicKey }) {
	const {
		grant,
		project,
		grantUri,
		projectUri,
		sponsorProfileUri,
		profile,
	} = useBarnGrant(publicKey.toBase58());
	if (!grant || !project || !profile) return;
	return (
		<Card className="w-full">
			<Link href={`/project/${grant.project}`}>
				<CardHeader>
					<CardTitle>
						{projectUri?.name ?? `Untitled Project -${project.id}`} |{" "}
						{grant.approvedAmount} SOL
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<CardDescription>
						Desecription: {grantUri?.description}
					</CardDescription>
					<CardDescription>Project: {grant.project.toBase58()}</CardDescription>
					<div className="space-y-1">
						{grantUri?.objectives?.length &&
							grantUri.objectives.map((obj, i) => (
								<CardDescription key={i}>
									Task {i + 1}: {obj}
								</CardDescription>
							))}
					</div>
					<CardDescription>
						Grant Program: {grant.program.toBase58()}
					</CardDescription>
					<CardDescription>Owner: {`@${profile.seed}`}</CardDescription>
					<CardDescription>
						Sponsor: {`${sponsorProfileUri?.name}`}
					</CardDescription>
					<CardDescription>Amount paid out: {grant.paidOut} </CardDescription>
					<CardDescription>Milestones: {grant.count}</CardDescription>
				</CardContent>
			</Link>
			<CardFooter>
				<AddGrantMilestone grantPk={publicKey} />
			</CardFooter>
		</Card>
	);
}


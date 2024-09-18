"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { GrantProgramCard, ProjectCard } from ".";
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
} from "./project";
import Link from "next/link";
import BN from "bn.js";
import { MilestoneState } from "@barn/protocol";

export type ProjectCardProps = {};

export function AllUserProjects() {
	const {
		projectOrProgramPks: { data: projectsPks },
	} = useBarnUser();

	if (!projectsPks || !projectsPks.length) return <p>No Projects For User</p>;

	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{projectsPks.map((pk) => {
				console.log("pk:", pk.toBase58());
				return <ProjectCard key={pk.toBase58()} publicKey={pk} />;
			})}
		</div>
	);
}

export function AllUserGrantPrograms() {
	const {
		projectOrProgramPks: { data: grantProgramPks },
	} = useBarnUser();

	if (!grantProgramPks || !grantProgramPks.length)
		return <p>No Grant Programs For User</p>;

	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{grantProgramPks.map((pk) => {
				console.log("pk:", pk.toBase58());
				return <GrantProgramCard key={pk.toBase58()} publicKey={pk} />;
			})}
		</div>
	);
}

export function AllUserGrants() {
	const {
		profile: { data: profile },
		projectOrProgramPks: { data: projectsPks },
	} = useBarnUser();

	if (!profile || !projectsPks || !projectsPks.length)
		return <p>No Projects For User</p>;

	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{projectsPks.map((pk) => {
				return profile.sponsor ? (
					<GrantsFromProgramCard key={pk.toBase58()} publicKey={pk} />
				) : (
					<GrantsFromProjectCard key={pk.toBase58()} publicKey={pk} />
				);
			})}
		</div>
	);
}

export function GrantsFromProjectCard({ publicKey }: { publicKey: PublicKey }) {
	const { grantPk } = useBarnProject(publicKey.toBase58());

	if (!grantPk) {
		return <></>;
	}

	return (
		<>
			<GrantCard key={grantPk.toBase58()} publicKey={grantPk} />
		</>
	);
}

export function GrantsFromProgramCard({ publicKey }: { publicKey: PublicKey }) {
	const { grantPks } = useBarnGrantProgram(publicKey.toBase58());

	if (!grantPks) {
		return <></>;
	}

	return (
		<>
			{grantPks.map((pk) => {
				return <GrantCard key={pk.toBase58()} publicKey={pk} />;
			})}
		</>
	);
}

export function Notifications() {
	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{Array.from({ length: 10 }).map((_, i) => (
				<div></div>
				// <MilestoneCard key={i} />
			))}
		</div>
	);
}

export function ProfileCard() {
	const {
		profile: userProfile,
		authority: { data: authority },
	} = useBarnUser();
	const { data: profile } = userProfile;
	if (!profile || !authority) {
		return "Create a Profile";
	}
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>username: {profile.seed}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>Owner: {authority.signer.toBase58()}</CardDescription>
				<CardDescription>
					Authority: {profile.authority.toBase58()}
				</CardDescription>
				<CardDescription>
					Account: {profile.sponsor ? "Sponsor" : "Developer"}
				</CardDescription>
				<CardDescription>
					{profile.sponsor ? "Grant Programs" : "Projects"}: {profile.count}
				</CardDescription>
			</CardContent>
		</Card>
	);
}

export function MilestoneCard({ publicKey }: { publicKey: PublicKey }) {
	const {
		grant: { data: grant },
		project: { data: project },
		milestone: { data: milestone },
	} = useBarnGrantMilestone(publicKey.toBase58());

	const {
		profile: { data: profile },
	} = useBarnUser();

	if (!grant || !project || !milestone) return;
	return (
		<Card className="w-full">
			<Link href={`/project/${grant.project}`}>
				<CardHeader>
					<CardTitle>
						Project - {project.id} | ${grant.approvedAmount}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>Description: "description"</CardDescription>
					<CardDescription>Project: {grant.project.toBase58()}</CardDescription>
					<CardDescription>
						Grant Program: {grant.program.toBase58()}
					</CardDescription>
					<CardDescription>Owner: {project.profile.toBase58()}</CardDescription>
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
		grant: { data: grant },
		project: { data: project },
	} = useBarnGrant(publicKey.toBase58());
	if (!grant || !project) return;
	return (
		<Card className="w-full">
			<Link href={`/project/${grant.project}`}>
				<CardHeader>
					<CardTitle>
						Project - {project.id} | ${grant.approvedAmount}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>Desecription: "description"</CardDescription>
					<CardDescription>Project: {grant.project.toBase58()}</CardDescription>
					<CardDescription>
						Grant Program: {grant.program.toBase58()}
					</CardDescription>
					<CardDescription>Owner: {project.profile.toBase58()}</CardDescription>
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

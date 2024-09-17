"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GrantProgramCard, ProjectCard } from ".";
import {
	useBarnGrant,
	useBarnGrantProgram,
	useBarnProject,
	useBarnUser,
} from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";

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
	const { grantPks } = useBarnProject(publicKey.toBase58());

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
				<MilestoneCard key={i} />
			))}
		</div>
	);
}

export function ProfileCard() {
	const { profile: userProfile } = useBarnUser();
	const { data: profile } = userProfile;
	if (!profile) {
		return "Create a Profile";
	}
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>username: {profile.seed}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>Owner: {profile.signer.toBase58()}</CardDescription>
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

export function MilestoneCard() {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>ProjectTitle - id | "amount"</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>Description : "description"</CardDescription>
				<CardDescription>Grant Program : "program"</CardDescription>
				<CardDescription>Github: {"<github_url>"}</CardDescription>
				<CardDescription>Owner: "owner"</CardDescription>
			</CardContent>
			<CardFooter className="space-x-4">
				<Button className="w-full" size="sm">
					Approve
				</Button>
				<Button className="w-full" size="sm" variant="secondary">
					Reject
				</Button>
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
		</Card>
	);
}

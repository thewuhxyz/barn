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
import { ProjectCard } from ".";
import { useBarnUser } from "@/hooks/barn";

export type ProjectCardProps = {};

export function AllUserProjects() {
	const {
		projectsPks: { data: projectsPks },
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

export function AllUserGrants() {
	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{Array.from({ length: 10 }).map((_, i) => (
				<GrantCard key={i} />
			))}
		</div>
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
				<CardDescription>
					Authority: {profile.authority.toBase58()}
				</CardDescription>
				<CardDescription>Projects: {profile.count}</CardDescription>
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

export function GrantCard() {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>ProjectTitle | "approved_amount"</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>Desecripttion: "description"</CardDescription>
				<CardDescription>Grant Program: "Program"</CardDescription>
				<CardDescription>Owner: "owner"</CardDescription>
				<CardDescription>Amount paid out: "amount_paid_out"</CardDescription>
				<CardDescription>Milestones: "X/Y"</CardDescription>
			</CardContent>
		</Card>
	);
}

export function GrantProgramCard() {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>ProjectTitle | "approved_amount"</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>Desecripttion: "description"</CardDescription>
				<CardDescription>Grant Program: "Program"</CardDescription>
				<CardDescription>Owner: "owner"</CardDescription>
				<CardDescription>Amount paid out: "amount_paid_out"</CardDescription>
			</CardContent>
		</Card>
	);
}

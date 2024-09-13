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

export type ProjectCardProps = {};

export function AllUserProjects() {
	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{Array.from({ length: 10 }).map((_, i) => (
				<ProjectCard key={i} />
			))}
		</div>
	);
}

export function AllUserGrants() {
	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{Array.from({ length: 10 }).map((_, i) => (
				<GrantCard key={i}/>
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
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Name: Username</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>Authority: "Authority"</CardDescription>
				<CardDescription>Profile: "Profile"</CardDescription>
				<CardDescription>Github: {"<github_url>"}</CardDescription>
				<CardDescription>Grants: "no_of_grants"</CardDescription>
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

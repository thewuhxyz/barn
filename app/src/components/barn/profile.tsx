"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useBarnProfile, useBarnUser } from "@/hooks/barn";
import Link from "next/link";
import { useGithubProfile } from "@/hooks/barn/uri";
import Image from "next/image";
import { ProjectCardFromGrantPubkey, ProjectCardFromPubkey } from "./project";
import { GrantProgramCardFromPubkey } from "./program";
import { NotificationCardFromGrantPubkey } from "./notification";
import {
	GitHubLogoIcon,
	GlobeIcon,
	TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export function AllUserProjects() {
	const { profile } = useBarnUser();

	return <AllProjectsForProfile profilePk={profile?.key.toBase58() ?? null} />;
}

export function AllUserGrantPrograms() {
	const { profile } = useBarnUser();

	return <AllGrantsForProfile profilePk={profile?.key.toBase58() ?? null} />;
}

export function AllUserGrants() {
	const { profile } = useBarnUser();

	return <AllGrantsForProfile profilePk={profile?.key.toBase58() ?? null} />;
}

export function AllUserNotifications() {
	const { profile } = useBarnUser();

	return (
		<AllNotificationsForProfile profilePk={profile?.key.toBase58() ?? null} />
	);
}

export function UserProfileCard() {
	const { profile } = useBarnUser();

	if (!profile) {
		return "Create a Profile";
	}

	return <ProfileCardFromPubkey profilePk={profile.key.toBase58()} />;
}

export function AllProjectsForProfile({
	profilePk,
}: {
	profilePk: string | null;
}) {
	const { projectPks } = useBarnProfile(profilePk);

	if (!projectPks || !projectPks) return <p>No Projects For User</p>;

	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{projectPks.map((pk, i) => (
				<ProjectCardFromPubkey key={i} publicKey={pk} />
			))}
		</div>
	);
}

export function AllGrantProgramsForProfile({
	profilePk,
}: {
	profilePk: string | null;
}) {
	const { programPks: grantProgramPks } = useBarnProfile(profilePk);

	if (!grantProgramPks || !grantProgramPks.length)
		return <p>No Grant Programs For User</p>;

	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{grantProgramPks.map((pk, i) => (
				<GrantProgramCardFromPubkey key={i} publicKey={pk} />
			))}
		</div>
	);
}

export function AllGrantsForProfile({
	profilePk,
}: {
	profilePk: string | null;
}) {
	const { grantPks } = useBarnProfile(profilePk);

	if (!grantPks || !grantPks.length) return <p>No Projects For User</p>;

	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{grantPks.map((pk, i) => (
				<ProjectCardFromGrantPubkey key={i} publicKey={pk} />
			))}
		</div>
	);
}

export function AllNotificationsForProfile({
	profilePk,
}: {
	profilePk: string | null;
}) {
	const { profile, grantPks } = useBarnProfile(profilePk);

	if (!profile || !grantPks) return <p>No Notifications For User</p>;

	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{grantPks.map((pk, i) => (
				<NotificationCardFromGrantPubkey key={i} publicKey={pk} />
			))}
		</div>
	);
}

export function ProfileCardFromPubkey({
	profilePk,
}: {
	profilePk: string | null;
}) {
	const { profile, authority, profileUri } = useBarnProfile(profilePk);

	const githubUser = useGithubProfile({ user: profileUri?.github || null });

	if (!profile || !authority) {
		return "No Profile For User";
	}

	const props: ProfileCardProps = {
		count: profile.count,
		name: githubUser?.name,
		publicKey: profile.key.toBase58(),
		sponsor: profile.sponsor,
		username: profile.seed,
		bio: profileUri?.bio,
		github: profileUri?.github
			? `https://github.com/${profileUri?.github}`
			: null,
		twitter: profileUri?.twitter
			? `https://github.com/${profileUri?.twitter}`
			: null,
		imageUrl: profileUri?.image_url ?? githubUser?.avatar_url,
		website: profileUri?.website,
	};

	return <ProfileCard {...props}></ProfileCard>;
}

export function ProfileCard(props: ProfileCardProps) {
	return (
		<Card className="w-full">
			<CardHeader>
				{props.imageUrl && (
					<Image
						width={120}
						height={120}
						src={props.imageUrl}
						alt={props.username}
					/>
				)}
				<div className="flex justify-between">
					<CardTitle>@{props.username}</CardTitle>
					<Badge>{props.sponsor ? "Sponsor" : "Developer"}</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<CardDescription className="text-lg">
					{props.name ?? ""}
				</CardDescription>
				<CardDescription>{props.bio ?? ""}</CardDescription>
				<CardDescription>
					{props.sponsor ? "Grant Programs" : "Projects"}: {props.count}
				</CardDescription>
			</CardContent>
			<CardFooter className="space-x-4">
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

export type ProfileCardProps = {
	name?: string | null;
	bio?: string | null;
	username: string;
	sponsor: boolean;
	github?: string | null;
	website?: string | null;
	twitter?: string | null;
	publicKey: string;
	count: number;
	imageUrl?: string | null;
};

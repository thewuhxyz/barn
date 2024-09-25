"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AllGrantProgramsForProfile,
	AllGrantsForProfile,
	AllNotificationsForProfile,
	AllProjectsForProfile,
	ProfileCard,
	ProfileCardFromPubkey,
} from "@/components/barn/profile";
import { useBarnProfile } from "@/hooks/barn";

export default function Profile({ params }: { params: { address: string } }) {
	const profilePk = params.address;

	const { profile } = useBarnProfile(profilePk);

	return (
		<main className="flex flex-col items-center space-y-16">
			{profile ? (
				<>
					<ProfileCardFromPubkey profilePk={profilePk} />
					<Tabs
						defaultValue="grants"
						className="flex w-full flex-col items-center justify-center space-y-8 max-w-6xl"
					>
						<TabsList className="grid w-[400px] grid-cols-3">
							<TabsTrigger value="projects">
								{profile.sponsor ? "Grant Programs" : "Projects"}
							</TabsTrigger>
							<TabsTrigger value="grants">Grants</TabsTrigger>
							<TabsTrigger value="notifications">Nofications</TabsTrigger>
						</TabsList>
						<TabsContent className="w-full" value="projects">
							{profile.sponsor ? (
								<AllGrantProgramsForProfile profilePk={profilePk} />
							) : (
								<AllProjectsForProfile profilePk={profilePk} />
							)}
						</TabsContent>
						<TabsContent className="w-full" value="grants">
							<AllGrantsForProfile profilePk={profilePk} />
						</TabsContent>
						<TabsContent className="w-full" value="notifications">
							<AllNotificationsForProfile profilePk={profilePk} />
						</TabsContent>
					</Tabs>
				</>
			) : (
				<>
					<p>Cannot find profile with address: {profilePk}</p>
				</>
			)}
		</main>
	);
}

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AllUserGrants,
	AllUserProjects,
	Notifications,
	ProfileCard,
} from "@/components/barn/profile";
import { useBarnState } from "@/hooks/barn";
import { CreateUserProfile } from "@/components/barn/project";

export default function Profile() {
	const { userProfile } = useBarnState();
	const { data: profile } = userProfile;
	return (
		<main className="flex-1 flex flex-col items-center justify-center space-y-16">
			{profile ? (
				<>
					<ProfileCard />
					<Tabs
						defaultValue="grants"
						className="flex w-full flex-col items-center justify-center space-y-8 max-w-6xl"
					>
						<TabsList className="grid w-[400px] grid-cols-3">
							<TabsTrigger value="projects">Projects</TabsTrigger>
							<TabsTrigger value="grants">Grants</TabsTrigger>
							<TabsTrigger value="notifications">Nofications</TabsTrigger>
						</TabsList>
						<TabsContent className="w-full" value="projects">
							<AllUserProjects />
						</TabsContent>
						<TabsContent className="w-full" value="grants">
							<AllUserGrants />
						</TabsContent>
						<TabsContent className="w-full" value="notifications">
							<Notifications />
						</TabsContent>
					</Tabs>
				</>
			) : (
				<CreateUserProfile />
			)}
		</main>
	);
}

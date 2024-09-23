"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AllUserGrantPrograms,
	AllUserGrants,
	AllUserNotifications,
	AllUserProjects,
	Notifications,
	ProfileCard,
} from "@/components/barn/profile";
import { useBarnUser } from "@/hooks/barn";
import {
	AddGrantProgram,
	AddNewProject,
	CreateUserProfile,
} from "@/components/barn/project-page";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/context";

export default function Profile() {
	const { publicKey } = useWallet();
	const { profile } = useBarnUser();

	return (
		<main className="flex flex-col items-center space-y-16">
			{profile ? (
				<>
					<ProfileCard />
					{profile.sponsor ? <AddGrantProgram /> : <AddNewProject />}
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
							{profile.sponsor ? <AllUserGrantPrograms /> : <AllUserProjects />}
						</TabsContent>
						<TabsContent className="w-full" value="grants">
							<AllUserGrants />
						</TabsContent>
						<TabsContent className="w-full" value="notifications">
							<AllUserNotifications />
						</TabsContent>
					</Tabs>
				</>
			) : publicKey ? (
				<CreateUserProfile />
			) : (
				<>
					<p>Connect wallet to create a profile</p>
					<WalletButton />
				</>
			)}
		</main>
	);
}

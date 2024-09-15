"use client";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useBarn, useBarnRPC, useBarnUser } from "@/hooks/barn";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PublicKey } from "@solana/web3.js";

export function CreateUserProfile() {
	const [userName, setUserName] = useState("");
	const { createUser } = useBarnRPC();
	const wallet = useAnchorWallet();

	function handleCreateUser() {
		try {
			if (!wallet) throw "wallet not connected";
			return createUser({ seed: userName, uri: "", signer: wallet.publicKey });
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<Popover>
			<PopoverTrigger className={cn(buttonVariants())}>
				Create User Profile
			</PopoverTrigger>
			<PopoverContent>
				<Input
					id="username"
					type="text"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					className="col-span-3"
				/>
				<Button className="w-full" onClick={handleCreateUser}>
					Create
				</Button>
			</PopoverContent>
		</Popover>
	);
}

export function ApproveSponsor() {
	const [sponsor, setSponsor] = useState("");
	const { approveSponsor } = useBarnRPC();
	const wallet = useAnchorWallet();
	const barn = useBarn();

	async function handleCreateUser() {
		try {
			if (!wallet) throw "wallet not connected";
			let signer = new PublicKey(sponsor);
			const profile = await barn.account.getUserProfile(signer);
			return approveSponsor({
				admin: wallet.publicKey,
				signer: new PublicKey(sponsor),
				profile: profile!.profile,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<Popover>
			<PopoverTrigger className={cn(buttonVariants())}>
				Approve Sponsor
			</PopoverTrigger>
			<PopoverContent>
				<Input
					id="approve"
					type="text"
					value={sponsor}
					onChange={(e) => setSponsor(e.target.value)}
					placeholder="Enter Sponsor"
				/>
				<Button className="w-full" onClick={handleCreateUser}>
					Approve
				</Button>
			</PopoverContent>
		</Popover>
	);
}

export function AddNewProject() {
	const [userName, setUserName] = useState("");
	const { addProject } = useBarnRPC();
	const wallet = useAnchorWallet();
	const {
		profile: { data: profile },
	} = useBarnUser();

	function handleAddProject() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile) throw "profile not created";
			return addProject({
				uri: "some.json",
				signer: wallet.publicKey,
				profile: profile.profile,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<Button onClick={handleAddProject}>Add New Project</Button>
		// <Popover>
		// 	<PopoverTrigger className={cn(buttonVariants())}>
		// 		Add New Project
		// 	</PopoverTrigger>
		// 	<PopoverContent>
		// 		<Button className="w-full" onClick={handleAddProject}>
		// 			Create Project
		// 		</Button>
		// 	</PopoverContent>
		// </Popover>
	);
}

export function AddGrantProgram() {
	const [userName, setUserName] = useState("");
	const { addGrantProgram } = useBarnRPC();
	const wallet = useAnchorWallet();

	function handleAddProject() {
		if (!wallet) throw "wallet not connected";
		return addGrantProgram({ uri: "", signer: wallet.publicKey });
	}

	return (
		<Popover>
			<PopoverTrigger>Create User Profile</PopoverTrigger>
			<PopoverContent>
				<Input
					id="amount"
					type="number"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					className="col-span-3"
				/>
				<Button onClick={handleAddProject}>Create</Button>
			</PopoverContent>
		</Popover>
	);
}

export function awardGrant() {
	const [userName, setUserName] = useState("");
	const { addGrantProgram } = useBarnRPC();
	const wallet = useAnchorWallet();

	function handleAddProject() {
		if (!wallet) throw "wallet not connected";
		return addGrantProgram({ uri: "", signer: wallet.publicKey });
	}

	return (
		<Popover>
			<PopoverTrigger>Create User Profile</PopoverTrigger>
			<PopoverContent>
				<Input
					id="amount"
					type="number"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					className="col-span-3"
				/>
				<Button onClick={handleAddProject}>Create</Button>
			</PopoverContent>
		</Popover>
	);
}

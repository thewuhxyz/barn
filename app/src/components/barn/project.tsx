"use client";

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useBarn, useBarnGrant, useBarnRPC, useBarnUser } from "@/hooks/barn";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { getMint, NATIVE_MINT } from "@solana/spl-token";

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

	return <Button onClick={handleAddProject}>Add New Project</Button>;
}

export function AddGrantProgram() {
	const { addGrantProgram } = useBarnRPC();
	const wallet = useAnchorWallet();
	const {
		profile: { data: profile },
	} = useBarnUser();

	function handleAddGrantProgram() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile) throw "profile not created";
			return addGrantProgram({
				uri: "some.json",
				signer: wallet.publicKey,
				profile: profile.profile,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return <Button onClick={handleAddGrantProgram}>Add New Grant Program</Button>;
}

export function AwardGrant({ grantProgram }: { grantProgram: PublicKey }) {
	const [awardGrantConfig, setAwardGrantConfig] = useState<{
		amount: string;
		project: string;
	}>({ amount: "", project: "" });

	const wallet = useAnchorWallet();
	const { connection } = useConnection();

	const {
		profile: { data: profile },
	} = useBarnUser();
	const { awardGrant } = useBarnRPC();

	const { amount, project } = awardGrantConfig;

	async function handleAddProject() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile) throw "no profile for user";

			const paymentMint = NATIVE_MINT; // todo: any token
			const decimals = (await getMint(connection, paymentMint)).decimals;

			return awardGrant({
				uri: "",
				signer: wallet.publicKey,
				grantProgram,
				project: new PublicKey(project),
				approvedAmount: new BN(parseFloat(amount) * 10 ** decimals),
				paymentMint,
				profile: profile.profile,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<Popover>
			<PopoverTrigger className={`${cn(buttonVariants())} w-full`}>
				Award Grant
			</PopoverTrigger>
			<PopoverContent className="space-y-4">
				<Input
					id="amount"
					type="number"
					value={amount}
					onChange={(e) =>
						setAwardGrantConfig({ ...awardGrantConfig, amount: e.target.value })
					}
					placeholder="Amount"
					className="col-span-3"
				/>
				<Input
					id="project"
					type="text"
					value={project}
					onChange={(e) =>
						setAwardGrantConfig({
							...awardGrantConfig,
							project: e.target.value,
						})
					}
					placeholder="Enter Project"
				/>
				<Button onClick={handleAddProject}>Award Grant</Button>
			</PopoverContent>
		</Popover>
	);
}

export function AddGrantMilestone({ grantPk }: { grantPk: PublicKey }) {
	const [awardGrantConfig, setAwardGrantConfig] = useState<{
		amount: string;
	}>({ amount: "" });

	const wallet = useAnchorWallet();

	const {
		profile: { data: profile },
	} = useBarnUser();

	const {
		grant: { data: grant },
	} = useBarnGrant(grantPk.toBase58());

	const { addGrantMilestone } = useBarnRPC();

	const { amount } = awardGrantConfig;

	async function handleAddProject() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile) throw "no profile for user";
			if (!grant) throw "no grant project for user";

			return addGrantMilestone({
				uri: "",
				signer: wallet.publicKey,
				project: grant.project,
				amount: new BN(parseFloat(amount) * 10 ** grant.paymentDecimals),
				profile: profile.profile,
				grant: grantPk,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<>
			{profile?.sponsor === false && (
				<Popover>
					<PopoverTrigger className={`${cn(buttonVariants())} w-full`}>
						Add Milestone
					</PopoverTrigger>
					<PopoverContent className="space-y-4">
						<Input
							id="amount"
							type="text"
							value={amount}
							onChange={(e) =>
								setAwardGrantConfig({
									...awardGrantConfig,
									amount: e.target.value,
								})
							}
							placeholder="Amount"
							className="col-span-3"
						/>
						{/* <Input
					id="project"
					type="text"
					value={project}
					onChange={(e) =>
						setAwardGrantConfig({
							...awardGrantConfig,
							project: e.target.value,
						})
					}
					placeholder="Enter Project"
				/> */}
						<Button className="w-full" onClick={handleAddProject}>Add Milestone</Button>
					</PopoverContent>
				</Popover>
			)}
		</>
	);
}

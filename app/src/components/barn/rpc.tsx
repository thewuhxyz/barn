"use client";

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
	useBarn,
	useBarnGrant,
	useBarnGrantMilestone,
	useBarnRPC,
	useBarnUser,
} from "@/hooks/barn";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import {
	getAssociatedTokenAddressSync,
	getMint,
	NATIVE_MINT,
} from "@solana/spl-token";
import { MilestoneState } from "@barn/protocol";

export function CreateUserProfile() {
	const [createUserConfig, setCreateUserConfig] = useState<{
		seed: string;
		uri: string;
	}>({
		uri: "",
		seed: "",
	});
	const { createUser } = useBarnRPC();
	const wallet = useAnchorWallet();

	function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			return createUser({ ...createUserConfig, signer: wallet.publicKey });
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<Popover>
			<PopoverTrigger className={cn(buttonVariants())}>
				Create User Profile
			</PopoverTrigger>
			<PopoverContent className="space-y-4">
				<Input
					id="username"
					type="text"
					value={createUserConfig.seed}
					onChange={(e) =>
						setCreateUserConfig({ ...createUserConfig, seed: e.target.value })
					}
					placeholder="Enter username"
				/>
				<Input
					id="uri"
					type="text"
					value={createUserConfig.uri}
					onChange={(e) =>
						setCreateUserConfig({ ...createUserConfig, uri: e.target.value })
					}
					placeholder="Enter Profile URI"
				/>
				<Button className="w-full" onClick={handleClick}>
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

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			let signer = new PublicKey(sponsor);
			const profile = await barn.account.getUserProfile(signer);
			return approveSponsor({
				admin: wallet.publicKey,
				signer: new PublicKey(sponsor),
				profile: profile!.key,
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
			<PopoverContent className="space-y-4">
				<Input
					id="approve"
					type="text"
					value={sponsor}
					onChange={(e) => setSponsor(e.target.value)}
					placeholder="Enter Sponsor"
				/>
				<Button className="w-full" onClick={handleClick}>
					Approve
				</Button>
			</PopoverContent>
		</Popover>
	);
}

export function AddNewProject() {
	const { addProject } = useBarnRPC();
	const wallet = useAnchorWallet();
	const { profile, authority } = useBarnUser();
	const [uri, setUri] = useState("");

	function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile || !authority) throw "profile not created";
			return addProject({
				uri,
				signer: wallet.publicKey,
				profile: authority.profile,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<Popover>
			<PopoverTrigger className={cn(buttonVariants())}>
				Add New Project
			</PopoverTrigger>
			<PopoverContent className="space-y-4">
				<Input
					id="uri"
					type="text"
					value={uri}
					onChange={(e) => setUri(e.target.value)}
					placeholder="Project URI"
				/>
				<Button className="w-full" onClick={handleClick}>
					Add New Project
				</Button>
			</PopoverContent>
		</Popover>
	);
}

export function AddGrantProgram() {
	const { addGrantProgram } = useBarnRPC();
	const wallet = useAnchorWallet();
	const { authority, profile } = useBarnUser();
	const [uri, setUri] = useState("");

	function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile || !authority) throw "profile not created";
			return addGrantProgram({
				uri,
				signer: wallet.publicKey,
				profile: authority.profile,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<Popover>
			<PopoverTrigger className={cn(buttonVariants())}>
				Add Grant Program
			</PopoverTrigger>
			<PopoverContent className="space-y-4">
				<Input
					id="uri"
					type="text"
					value={uri}
					onChange={(e) => setUri(e.target.value)}
					placeholder="Grant Program URI"
				/>
				<Button className="w-full" onClick={handleClick}>
					Add Grant Program
				</Button>
			</PopoverContent>
		</Popover>
	);
}

export function AwardGrant({ grantProgram }: { grantProgram: PublicKey }) {
	const [awardGrantConfig, setAwardGrantConfig] = useState<{
		amount: string;
		project: string;
		uri: string;
	}>({ amount: "", project: "", uri: "" });

	const wallet = useAnchorWallet();
	const { connection } = useConnection();

	const { authority, profile } = useBarnUser();
	const { awardGrant } = useBarnRPC();

	const { amount, project, uri } = awardGrantConfig;

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile || !authority) throw "no profile for user";

			const paymentMint = NATIVE_MINT; // todo: any token
			const decimals = (await getMint(connection, paymentMint)).decimals;

			return awardGrant({
				uri,
				signer: wallet.publicKey,
				grantProgram,
				project: new PublicKey(project),
				approvedAmount: new BN(parseFloat(amount) * 10 ** decimals),
				paymentMint,
				profile: authority.profile,
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
					type="string"
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
				<Input
					id="uri"
					type="text"
					value={uri}
					onChange={(e) =>
						setAwardGrantConfig({
							...awardGrantConfig,
							uri: e.target.value,
						})
					}
					placeholder="Enter Grant URI"
				/>
				<Button className="w-full" onClick={handleClick}>
					Award Grant
				</Button>
			</PopoverContent>
		</Popover>
	);
}

export function AddGrantMilestone({ grantPk }: { grantPk: PublicKey }) {
	const [awardGrantConfig, setAwardGrantConfig] = useState<{
		amount: string;
		uri: string;
	}>({ amount: "", uri: "" });

	const wallet = useAnchorWallet();

	const { authority, profile } = useBarnUser();

	const { grant } = useBarnGrant(grantPk.toBase58());

	const { addGrantMilestone } = useBarnRPC();

	const { amount, uri } = awardGrantConfig;

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile || !authority) throw "no profile for user";
			if (!grant) throw "no grant project for user";

			return addGrantMilestone({
				uri,
				signer: wallet.publicKey,
				project: grant.project,
				amount: new BN(parseFloat(amount) * 10 ** grant.paymentDecimals),
				profile: authority.profile,
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
						Add New Milestone
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
						<Input
							id="uri"
							type="text"
							value={uri}
							onChange={(e) =>
								setAwardGrantConfig({
									...awardGrantConfig,
									uri: e.target.value,
								})
							}
							placeholder="Enter Grant URI"
						/>
						<Button className="w-full" onClick={handleClick}>
							Add New Milestone
						</Button>
					</PopoverContent>
				</Popover>
			)}
		</>
	);
}

export function EditGrantMilestone({
	grantMilestonePk,
}: {
	grantMilestonePk: PublicKey;
}) {
	const [awardGrantConfig, setAwardGrantConfig] = useState<{
		amount: string;
		uri: string;
	}>({ amount: "", uri: "" });

	const wallet = useAnchorWallet();

	const { authority, profile } = useBarnUser();

	const { grant, milestone } = useBarnGrantMilestone(
		grantMilestonePk.toBase58()
	);

	const { editGrantMilestone } = useBarnRPC();

	const { amount, uri } = awardGrantConfig;

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile || !authority) throw "no profile for user";
			if (!milestone) throw "no grant project for user";
			if (!grant) throw "no grant project for user";

			return editGrantMilestone({
				uri,
				signer: wallet.publicKey,
				amount: new BN(parseFloat(amount) * 10 ** grant.paymentDecimals),
				profile: authority.profile,
				project: grant.project,
				grant: milestone.grant,
				grantMilestone: grantMilestonePk,
				grantProgram: grant.program,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<>
			{profile?.sponsor === false && (
				<Popover>
					<PopoverTrigger
						className={cn(
							buttonVariants({
								variant: "secondary",
								className: "w-full",
								size: "sm",
							})
						)}
					>
						Edit Milestone
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
						<Input
							id="uri"
							type="text"
							value={uri}
							onChange={(e) =>
								setAwardGrantConfig({
									...awardGrantConfig,
									uri: e.target.value,
								})
							}
							placeholder="Enter Milestone URI"
						/>
						<Button size="sm" className="w-full" onClick={handleClick}>
							Edit Milestone
						</Button>
					</PopoverContent>
				</Popover>
			)}
		</>
	);
}

export function ReviseGrantMilestone({
	grantMilestonePk,
}: {
	grantMilestonePk: PublicKey;
}) {
	const wallet = useAnchorWallet();

	const { authority, profile } = useBarnUser();

	const { grant, milestone } = useBarnGrantMilestone(
		grantMilestonePk.toBase58()
	);

	const { reviseGrantMilestone } = useBarnRPC();

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile || !authority) throw "no profile for user";
			if (!milestone) throw "no grant project for user";
			if (!grant) throw "no grant project for user";

			return reviseGrantMilestone({
				signer: wallet.publicKey,
				profile: authority.profile,
				project: grant.project,
				grant: milestone.grant,
				grantMilestone: grantMilestonePk,
				grantProgram: grant.program,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<Button size="sm" className="w-full" onClick={handleClick}>
			Revise
		</Button>
	);
}

export function ReviewGrantMilestone({
	grantMilestonePk,
}: {
	grantMilestonePk: PublicKey;
}) {
	const wallet = useAnchorWallet();

	const { authority, profile } = useBarnUser();

	const { grant, milestone } = useBarnGrantMilestone(
		grantMilestonePk.toBase58()
	);

	const { reviewGrantMilestone } = useBarnRPC();

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile || !authority) throw "no profile for user";
			if (!milestone) throw "no grant project for user";
			if (!grant) throw "no grant project for user";

			return reviewGrantMilestone({
				signer: wallet.publicKey,
				profile: authority.profile,
				project: grant.project,
				grant: milestone.grant,
				grantMilestone: grantMilestonePk,
				grantProgram: grant.program,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<Button size="sm" className="w-full" onClick={handleClick}>
			Review
		</Button>
	);
}

export function AcceptGrantMilestone({
	grantMilestonePk,
}: {
	grantMilestonePk: PublicKey;
}) {
	const wallet = useAnchorWallet();

	const { authority, profile } = useBarnUser();

	const { grant, milestone } = useBarnGrantMilestone(
		grantMilestonePk.toBase58()
	);

	const { acceptGrantMilestone } = useBarnRPC();

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile || !authority) throw "no profile for user";
			if (!milestone) throw "no grant project for user";
			if (!grant) throw "no grant project for user";

			return acceptGrantMilestone({
				signer: wallet.publicKey,
				profile: authority.profile,
				project: grant.project,
				grant: milestone.grant,
				grantMilestone: grantMilestonePk,
				grantProgram: grant.program,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<Button size="sm" className="w-full" onClick={handleClick}>
			Accept
		</Button>
	);
}

export function RejectGrantMilestone({
	grantMilestonePk,
}: {
	grantMilestonePk: PublicKey;
}) {
	const wallet = useAnchorWallet();

	const { authority, profile } = useBarnUser();

	const { grant, milestone } = useBarnGrantMilestone(
		grantMilestonePk.toBase58()
	);

	const { rejectGrantMilestone } = useBarnRPC();

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile || !authority) throw "no profile for user";
			if (!milestone) throw "no grant project for user";
			if (!grant) throw "no grant project for user";

			return rejectGrantMilestone({
				signer: wallet.publicKey,
				profile: authority.profile,
				project: grant.project,
				grant: milestone.grant,
				grantMilestone: grantMilestonePk,
				grantProgram: grant.program,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<Button
			size="sm"
			className="w-full"
			variant="destructive"
			onClick={handleClick}
		>
			Reject
		</Button>
	);
}

export function SettleGrantMilestone({
	grantMilestonePk,
}: {
	grantMilestonePk: PublicKey;
}) {
	const wallet = useAnchorWallet();
	const { connection } = useConnection();

	const { authority, profile } = useBarnUser();

	const {
		authority: projectAuthority,
		grant,
		milestone,
	} = useBarnGrantMilestone(grantMilestonePk.toBase58());

	const { settleGrantMilestone } = useBarnRPC();

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile || !authority) throw "no profile for user";
			if (!milestone) throw "no grant project for user";
			if (!grant) throw "no grant project for user";
			if (!projectAuthority) throw "project owner not found";

			const mintAccountInfo = await connection.getAccountInfo(
				grant.paymentMint
			);

			if (!mintAccountInfo) throw "token mint not creted";

			return settleGrantMilestone({
				signer: wallet.publicKey,
				profile: authority.profile,
				grant: milestone.grant,
				grantMilestone: grantMilestonePk,
				paymentMint: grant.paymentMint,
				signerTokenAccount: getAssociatedTokenAddressSync(
					grant.paymentMint,
					wallet.publicKey,
					true
				), // expects signer token account to already be created and funded
				to: projectAuthority.signer,
				tokenProgram: mintAccountInfo.owner,
			});
		} catch (e: any) {
			toast.error(`Error occurred: ${e.message || e}`);
		}
	}

	return (
		<Button size="sm" className="w-full" onClick={handleClick}>
			Settle Payment
		</Button>
	);
}

export function UpdateMilestone({
	grantMilestonePk,
}: {
	grantMilestonePk: PublicKey;
}) {
	const { profile: userProfile } = useBarnUser();
	const { milestone, profile, grantProgram, project } = useBarnGrantMilestone(
		grantMilestonePk.toBase58()
	);

	if (!profile || !milestone || !project || !grantProgram) return <></>;

	const userIsInvolved = !userProfile
		? false
		: userProfile?.key.equals(project.profile) ||
			userProfile?.key.equals(grantProgram.profile)

	return (
		<>
			{userIsInvolved &&
				!profile.sponsor &&
				MilestoneState.toStatus(milestone.state) === "inProgress" && (
					<ReviewGrantMilestone grantMilestonePk={grantMilestonePk} />
				)}
			{userIsInvolved &&
				!profile.sponsor &&
				MilestoneState.toStatus(milestone.state) === "inReview" && (
					<ReviseGrantMilestone grantMilestonePk={grantMilestonePk} />
				)}
			{userIsInvolved &&
				profile.sponsor &&
				MilestoneState.toStatus(milestone.state) === "inReview" && (
					<div className="flex w-full space-x-4">
						<AcceptGrantMilestone grantMilestonePk={grantMilestonePk} />
						<RejectGrantMilestone grantMilestonePk={grantMilestonePk} />
					</div>
				)}
			{userIsInvolved &&
				profile.sponsor &&
				MilestoneState.toStatus(milestone.state) === "accepted" && (
					<SettleGrantMilestone grantMilestonePk={grantMilestonePk} />
				)}
			{userIsInvolved &&
				profile.sponsor &&
				MilestoneState.toStatus(milestone.state) === "rejected" && (
					<Button disabled={true} className="w-full">
						Settle Payment
					</Button>
				)}
			{userIsInvolved &&
				MilestoneState.toStatus(milestone.state) === "paid" && (
					<Button disabled={true} className="w-full">
						Paid
					</Button>
				)}
		</>
	);
}

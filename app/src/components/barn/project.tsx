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
import { getMint, NATIVE_MINT } from "@solana/spl-token";
import Project from "@/app/project/[address]/page";
import { MilestoneState } from "@barn/protocol";

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
						<Button className="w-full" onClick={handleAddProject}>
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
	}>({ amount: "" });

	const wallet = useAnchorWallet();

	const {
		profile: { data: profile },
	} = useBarnUser();

	const {
		grant: { data: grant },
		milestone: { data: milestone },
	} = useBarnGrantMilestone(grantMilestonePk.toBase58());

	const { editGrantMilestone } = useBarnRPC();

	const { amount } = awardGrantConfig;

	async function handleAddProject() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile) throw "no profile for user";
			if (!milestone) throw "no grant project for user";
			if (!grant) throw "no grant project for user";

			return editGrantMilestone({
				uri: "",
				signer: wallet.publicKey,
				amount: new BN(parseFloat(amount) * 10 ** grant.paymentDecimals),
				profile: profile.profile,
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
							buttonVariants({ variant: "secondary", className: "w-full" })
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
						<Button className="w-full" onClick={handleAddProject}>
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

	const {
		profile: { data: profile },
	} = useBarnUser();

	const {
		grant: { data: grant },
		milestone: { data: milestone },
	} = useBarnGrantMilestone(grantMilestonePk.toBase58());

	const { reviseGrantMilestone } = useBarnRPC();

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile) throw "no profile for user";
			if (!milestone) throw "no grant project for user";
			if (!grant) throw "no grant project for user";

			return reviseGrantMilestone({
				signer: wallet.publicKey,
				profile: profile.profile,
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
		<Button className="w-full" onClick={handleClick}>
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

	const {
		profile: { data: profile },
	} = useBarnUser();

	const {
		grant: { data: grant },
		milestone: { data: milestone },
	} = useBarnGrantMilestone(grantMilestonePk.toBase58());

	const { reviewGrantMilestone } = useBarnRPC();

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile) throw "no profile for user";
			if (!milestone) throw "no grant project for user";
			if (!grant) throw "no grant project for user";

			return reviewGrantMilestone({
				signer: wallet.publicKey,
				profile: profile.profile,
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
		<Button className="w-full" onClick={handleClick}>
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

	const {
		profile: { data: profile },
	} = useBarnUser();

	const {
		grant: { data: grant },
		milestone: { data: milestone },
	} = useBarnGrantMilestone(grantMilestonePk.toBase58());

	const { acceptGrantMilestone } = useBarnRPC();

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile) throw "no profile for user";
			if (!milestone) throw "no grant project for user";
			if (!grant) throw "no grant project for user";

			return acceptGrantMilestone({
				signer: wallet.publicKey,
				profile: profile.profile,
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
		<Button className="w-full" onClick={handleClick}>
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

	const {
		profile: { data: profile },
	} = useBarnUser();

	const {
		grant: { data: grant },
		milestone: { data: milestone },
	} = useBarnGrantMilestone(grantMilestonePk.toBase58());

	const { rejectGrantMilestone } = useBarnRPC();

	async function handleClick() {
		try {
			if (!wallet) throw "wallet not connected";
			if (!profile) throw "no profile for user";
			if (!milestone) throw "no grant project for user";
			if (!grant) throw "no grant project for user";

			return rejectGrantMilestone({
				signer: wallet.publicKey,
				profile: profile.profile,
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
		<Button className="w-full" variant="destructive" onClick={handleClick}>
			Reject
		</Button>
	);
}

// export function SettleGrantMilestone({
// 	grantMilestonePk,
// }: {
// 	grantMilestonePk: PublicKey;
// }) {
// 	const wallet = useAnchorWallet();

// 	const {
// 		profile: { data: profile },
// 	} = useBarnUser();

// 	const {
// 		grant: { data: grant },
// 		milestone: { data: milestone },
// 	} = useBarnGrantMilestone(grantMilestonePk.toBase58());

// 	const { settleGrantMilestone } = useBarnRPC();

// 	async function handleClick() {
// 		try {
// 			if (!wallet) throw "wallet not connected";
// 			if (!profile) throw "no profile for user";
// 			if (!milestone) throw "no grant project for user";
// 			if (!grant) throw "no grant project for user";

// 			return settleGrantMilestone({
// 				signer: wallet.publicKey,
// 				profile: profile.profile,
// 				grant: milestone.grant,
// 				grantMilestone: grantMilestonePk,
// 				paymentMint: grant.paymentMint,
// 				// signerTokenAccount: getA
// 				to:

// 			});
// 		} catch (e: any) {
// 			toast.error(`Error occurred: ${e.message || e}`);
// 		}
// 	}

// 	return (
// 		<Button className="w-full" variant="secondary" onClick={handleClick}>
// 			Reject
// 		</Button>
// 	);
// }

export function DevUpdateMilestone({
	grantMilestonePk,
}: {
	grantMilestonePk: PublicKey;
}) {
	const {
		profile: { data: profile },
	} = useBarnUser();
	const {
		milestone: { data: milestone },
	} = useBarnGrantMilestone(grantMilestonePk.toBase58());
	if (!profile || !milestone) return <></>;
	return (
		<>
			{!profile.sponsor &&
				MilestoneState.toStatus(milestone.state) === "inProgress" && (
					<ReviewGrantMilestone grantMilestonePk={grantMilestonePk} />
				)}
			{!profile.sponsor &&
				MilestoneState.toStatus(milestone.state) === "inReview" && (
					<ReviseGrantMilestone grantMilestonePk={grantMilestonePk} />
				)}
		</>
	);
}

export function UpdateMilestone({
	grantMilestonePk,
}: {
	grantMilestonePk: PublicKey;
}) {
	const {
		profile: { data: profile },
	} = useBarnUser();
	const {
		milestone: { data: milestone },
	} = useBarnGrantMilestone(grantMilestonePk.toBase58());
	if (!profile || !milestone) return <></>;
	return (
		<>
			{!profile.sponsor &&
				MilestoneState.toStatus(milestone.state) === "inProgress" && (
					<ReviewGrantMilestone grantMilestonePk={grantMilestonePk} />
				)}
			{!profile.sponsor &&
				MilestoneState.toStatus(milestone.state) === "inReview" && (
					<ReviseGrantMilestone grantMilestonePk={grantMilestonePk} />
				)}
			{profile.sponsor &&
				MilestoneState.toStatus(milestone.state) === "inReview" && (
					<div className="flex w-full space-x-4">
						<AcceptGrantMilestone grantMilestonePk={grantMilestonePk} />
						<RejectGrantMilestone grantMilestonePk={grantMilestonePk} />
					</div>
				)}
			{profile.sponsor &&
				MilestoneState.toStatus(milestone.state) === "accepted" && (
					<Button className="w-full">Settle Payment</Button>
				)}
			{profile.sponsor &&
				MilestoneState.toStatus(milestone.state) === "rejected" && (
					<Button disabled={true} className="w-full">
						Settle Payment
					</Button>
				)}
		</>
	);
}

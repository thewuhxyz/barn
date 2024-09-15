import { PublicKey } from "@solana/web3.js";
import type BN from "bn.js";

export type CreateUserArgs = {
	seed: string;
	uri: string;
	signer: PublicKey;
};

export type ApproveSponsorArgs = { admin: PublicKey; signer: PublicKey };

export type AddProjectArgs = { uri: string; signer: PublicKey };

export type AddGrantProgramArgs = { uri: string; signer: PublicKey };

export type AwardGrantArgs = {
	uri: string;
	approvedAmount: BN;
	paymentMint: PublicKey;
	grantProgram: PublicKey;
	project: PublicKey;
	signer: PublicKey;
};

export type AddGrantMilestoneArgs = {
	uri: string;
	amount: BN;
	grant: PublicKey;
	project: PublicKey;
	signer: PublicKey;
};

export type ReviseGrantMilestoneArgs = {
	uri: string | null;
	amount: BN | null;
	grant: PublicKey;
	grantMilestone: PublicKey;
	signer: PublicKey;
};

export type ReviewGrantMilestoneArgs = {
	grant: PublicKey;
	grantMilestone: PublicKey;
	signer: PublicKey;
};

export type AcceptGrantMilestoneArgs = {
	grant: PublicKey;
	grantMilestone: PublicKey;
	signer: PublicKey;
};

export type RejectGrantMilestoneArgs = {
	grant: PublicKey;
	grantMilestone: PublicKey;
	signer: PublicKey;
};

export type SettleGrantMilestoneArgs = {
	grant: PublicKey;
	grantMilestone: PublicKey;
	to: PublicKey;
	signer: PublicKey;
	signerTokenAccount: PublicKey;
	paymentMint: PublicKey;
	tokenProgram: PublicKey;
};

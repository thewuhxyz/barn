import { BN, Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import { PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import { toUiAmount } from "./helpers";

export class BarnAccount {
	static async grant(
		barn: Program<Barn>,
		grant: PublicKey
	): Promise<GrantAccount | null> {
		const grantAccount = await barn.account.grant.fetchNullable(grant);
		if (!grantAccount) return grantAccount;

		const { paymentMint } = grantAccount;

		const { decimals } = await getMint(barn.provider.connection, paymentMint);

		return {
			...grantAccount,
			paymentDecimals: decimals,
			approvedAmount: toUiAmount(grantAccount.approvedAmount, decimals),
			paidOut: toUiAmount(grantAccount.paidOut, decimals),
		};
	}

	static async grantMilestone(
		barn: Program<Barn>,
		grantMilestonePk: PublicKey
	): Promise<GrantMilestoneAccount | null> {
		const grantMilestone = await barn.account.grantMilestone.fetchNullable(
			grantMilestonePk
		);
		return grantMilestone;
	}
}

export type GrantMilestoneAccount = {
	amount: BN;
	bump: number;
	grant: PublicKey;
	id: number;
	state: MilestoneState
	uri: string;
};

export type GrantAccount = {
	approvedAmount: number;
	bump: number;
	count: number;
	id: number;
	paidOut: number;
	paymentDecimals: number;
	paymentMint: PublicKey;
	program: PublicKey;
	project: PublicKey;
	uri: string;
};

export class MilestoneState {
	static IN_PROGRESS = { inProgress: {} };
	static IN_REVIEW = { inReview: {} };
	static ACCEPTED = { accepted: {} };
	static REJECTED = { rejected: {} };
	static PAID = { paid: {} };
};

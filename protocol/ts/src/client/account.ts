import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import { PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import { toUiAmount } from "./helpers";
import BN from "bn.js";

export class BarnAccount {
	static authorityAddress(barn: Program<Barn>, signer: PublicKey): PublicKey {
		return PublicKey.findProgramAddressSync(
			[signer.toBuffer()],
			barn.programId
		)[0];
	}

	static profileAddress(barn: Program<Barn>, seed: string): PublicKey {
		return PublicKey.findProgramAddressSync(
			[Buffer.from("proflle"), Buffer.from(seed)],
			barn.programId
		)[0];
	}

	static projectAddress(
		barn: Program<Barn>,
		profile: PublicKey,
		id: number
	): PublicKey {
		return PublicKey.findProgramAddressSync(
			[
				Buffer.from("project"),
				profile.toBuffer(),
				new BN(id).toArrayLike(Buffer, "le", 4), // u32
			],
			barn.programId
		)[0];
	}
	
	static grantProgramAddress(
		barn: Program<Barn>,
		profile: PublicKey,
		id: number
	): PublicKey {
		return PublicKey.findProgramAddressSync(
			[
				Buffer.from("grant-program"),
				profile.toBuffer(),
				new BN(id).toArrayLike(Buffer, "le", 4), // u32
			],
			barn.programId
		)[0];
	}
	
	static grantAddress(
		barn: Program<Barn>,
		grantProgram: PublicKey,
		id: number
	): PublicKey {
		return PublicKey.findProgramAddressSync(
			[
				Buffer.from("grant"),
				grantProgram.toBuffer(),
				new BN(id).toArrayLike(Buffer, "le", 4), // u32
			],
			barn.programId
		)[0];
	}
	
	static grantMilestoneAddress(
		barn: Program<Barn>,
		grant: PublicKey,
		id: number
	): PublicKey {
		return PublicKey.findProgramAddressSync(
			[
				Buffer.from("grant-milestone"),
				grant.toBuffer(),
				new BN(id).toArrayLike(Buffer, "le", 4), // u32
			],
			barn.programId
		)[0];
	}

	static async authority(
		barn: Program<Barn>,
		authorityPk: PublicKey
	): Promise<AuthorityAccount | null> {
		const authority = await barn.account.authority.fetchNullable(authorityPk);
		return authority;
	}

	static async profile(
		barn: Program<Barn>,
		profilePk: PublicKey
	): Promise<ProfileAccount | null> {
		const profile = await barn.account.profile.fetchNullable(profilePk);
		return profile;
	}

	static async project(
		barn: Program<Barn>,
		projectPk: PublicKey
	): Promise<ProjectAccount | null> {
		const project = await barn.account.project.fetchNullable(projectPk);
		return project;
	}

	static async grantProgram(
		barn: Program<Barn>,
		grantProgramPk: PublicKey
	): Promise<GrantProgramAccount | null> {
		const grantProgram = await barn.account.grantProgram.fetchNullable(
			grantProgramPk
		);
		return grantProgram;
	}

	static async grant(
		barn: Program<Barn>,
		grantPk: PublicKey
	): Promise<GrantAccount | null> {
		const grant = await barn.account.grant.fetchNullable(grantPk);
		if (!grant) return grant;

		const { paymentMint } = grant;

		const { decimals } = await getMint(barn.provider.connection, paymentMint);

		return {
			...grant,
			paymentDecimals: decimals,
			approvedAmount: toUiAmount(grant.approvedAmount, decimals),
			paidOut: toUiAmount(grant.paidOut, decimals),
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

export type AuthorityAccount = {
	signer: PublicKey;
	profile: PublicKey;
	bump: number;
};

export type ProfileAccount = {
	authority: PublicKey;
	uri: string;
	seed: string;
	sponsor: boolean;
	count: number;
	bump: number;
};

export type ProjectAccount = {
	profile: PublicKey;
	grant: PublicKey | null;
	id: number;
	uri: string;
	bump: number;
};

export type GrantProgramAccount = {
	profile: PublicKey;
	uri: string;
	id: number;
	count: number;
	bump: number;
};

export type GrantMilestoneAccount = {
	amount: BN;
	bump: number;
	grant: PublicKey;
	id: number;
	state: MilestoneState;
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
}

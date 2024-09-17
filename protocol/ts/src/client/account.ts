import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import { PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import { toUiAmount } from "./helpers";
import BN from "bn.js";

export class BarnAccount {
	constructor(private barn: Program<Barn>) {}

	async getUserProjects(signer: PublicKey): Promise<ProjectAccount[] | null> {
		const authority = await this.getUserAuthority(signer);
		if (!authority) return authority;

		const profile = await this.profile(authority.profile);
		if (!profile) return profile;

		const { count } = profile;
		if (!count) return null;

		const projectPks = Array.from({ length: count }, (_, i) =>
			this.getProjectOrGrantProgramAddress(authority.profile, i, profile.sponsor)
		);

		const projects = await Promise.all(
			projectPks.map((pk) => this.project(pk))
		).then((nullableProjects) => {
			let projects: ProjectAccount[] = [];
			// remove all projects that are null
			nullableProjects.forEach((p) => {
				if (p !== null) {
					projects.push(p);
				}
			});
			return projects;
		});

		// if the projects array is empty, return null
		if (!projects.length) return null;

		return projects;
	}

	async getUserProjectsPks(signer: PublicKey): Promise<PublicKey[] | null> {
		const authority = await this.getUserAuthority(signer);
		if (!authority) return authority;

		const profile = await this.profile(authority.profile);
		if (!profile) return profile;

		const { count } = profile;
		if (!count) return null;

		const projectPks = Array.from({ length: count }, (_, i) =>
			this.getProjectOrGrantProgramAddress(
				authority.profile,
				i,
				profile.sponsor
			)
		);

		return projectPks;
	}

	getProjectOrGrantProgramPks(
		profilePk: PublicKey,
		count: number,
		sponsor: boolean
	): PublicKey[] | null {
		const projectPks = Array.from({ length: count }, (_, i) =>
			this.getProjectOrGrantProgramAddress(profilePk, i, sponsor)
		);

		return projectPks;
	}
	
	getGrantProgramPks(
		projectPk: PublicKey,
		count: number,
	): PublicKey[] | null {
		const grantProgramPks = Array.from({ length: count }, (_, i) =>
			this.grantProgramAddress(projectPk, i)
		);

		return grantProgramPks;
	}

	getProjectPks(
		projectPk: PublicKey,
		count: number,
	): PublicKey[] | null {
		const projectPks = Array.from({ length: count }, (_, i) =>
			this.projectAddress(projectPk, i)
		);

		return projectPks;
	}

	getGrantsPks(
		grantProgramPk: PublicKey,
		count: number
	): PublicKey[] | null {
		const projectPks = Array.from({ length: count }, (_, i) =>
			this.grantAddress(grantProgramPk, i)
		);

		return projectPks;
	}

	getGrantMilestonesPks(
		grantPk: PublicKey,
		count: number
	): PublicKey[] | null {
		const projectPks = Array.from({ length: count }, (_, i) =>
			this.grantMilestoneAddress(grantPk, i)
		);

		return projectPks;
	}

	async getUserProfile(
		user: PublicKey
	): Promise<(ProfileAccount & AuthorityAccount) | null> {
		const authority = await this.getUserAuthority(user);
		if (!authority) return authority;
		const { profile } = authority;
		const profileAccount = await this.profile(profile);
		if (!profileAccount) return profileAccount;
		return { ...profileAccount, ...authority };
	}

	async getUserAuthority(signer: PublicKey): Promise<AuthorityAccount | null> {
		return await this.authority(this.authorityAddress(signer));
	}

	async getAllProjects(): Promise<PublicKey[]> {
		const projects = await this.barn.account.project.all();
		return projects.map((p) => p.publicKey);
	}

	async getAllProjectAccounts(): Promise<ProjectAccount[]> {
		const projects = await this.barn.account.project.all();
		return projects.map((p) => p.account);
	}

	async authority(authorityPk: PublicKey): Promise<AuthorityAccount | null> {
		const authority = await this.barn.account.authority.fetchNullable(
			authorityPk
		);
		return authority;
	}

	async profile(profilePk: PublicKey): Promise<ProfileAccount | null> {
		const profile = await this.barn.account.profile.fetchNullable(profilePk);
		return profile;
	}

	async project(projectPk: PublicKey): Promise<ProjectAccount | null> {
		const project = await this.barn.account.project.fetchNullable(projectPk);
		return project;
	}

	async grantProgram(
		grantProgramPk: PublicKey
	): Promise<GrantProgramAccount | null> {
		const grantProgram = await this.barn.account.grantProgram.fetchNullable(
			grantProgramPk
		);
		return grantProgram;
	}

	async grant(grantPk: PublicKey): Promise<GrantAccount | null> {
		const grant = await this.barn.account.grant.fetchNullable(grantPk);
		if (!grant) return grant;

		const { paymentMint } = grant;

		const { decimals } = await getMint(
			this.barn.provider.connection,
			paymentMint
		);

		return {
			...grant,
			paymentDecimals: decimals,
			approvedAmount: toUiAmount(grant.approvedAmount, decimals),
			paidOut: toUiAmount(grant.paidOut, decimals),
		};
	}

	async grantMilestone(
		grantMilestonePk: PublicKey
	): Promise<GrantMilestoneAccount | null> {
		const grantMilestone = await this.barn.account.grantMilestone.fetchNullable(
			grantMilestonePk
		);
		return grantMilestone;
	}

	getProjectOrGrantProgramAddress(
		profilePk: PublicKey,
		id: number,
		sponsor: boolean
	) {
		return sponsor
			? this.grantProgramAddress(profilePk, id)
			: this.projectAddress(profilePk, id);
	}

	//////////////////////////////////////////
	//
	// PDA
	//
	//////////////////////////////////////////
	authorityAddress(signer: PublicKey): PublicKey {
		return PublicKey.findProgramAddressSync(
			[signer.toBuffer()],
			this.barn.programId
		)[0];
	}

	profileAddress(seed: string): PublicKey {
		return PublicKey.findProgramAddressSync(
			[Buffer.from("proflle"), Buffer.from(seed)],
			this.barn.programId
		)[0];
	}

	projectAddress(profile: PublicKey, id: number): PublicKey {
		return PublicKey.findProgramAddressSync(
			[
				Buffer.from("project"),
				profile.toBuffer(),
				new BN(id).toArrayLike(Buffer, "le", 4), // u32
			],
			this.barn.programId
		)[0];
	}

	grantProgramAddress(profile: PublicKey, id: number): PublicKey {
		return PublicKey.findProgramAddressSync(
			[
				Buffer.from("grant-program"),
				profile.toBuffer(),
				new BN(id).toArrayLike(Buffer, "le", 4), // u32
			],
			this.barn.programId
		)[0];
	}

	grantAddress(grantProgram: PublicKey, id: number): PublicKey {
		return PublicKey.findProgramAddressSync(
			[
				Buffer.from("grant"),
				grantProgram.toBuffer(),
				new BN(id).toArrayLike(Buffer, "le", 4), // u32
			],
			this.barn.programId
		)[0];
	}

	grantMilestoneAddress(grant: PublicKey, id: number): PublicKey {
		return PublicKey.findProgramAddressSync(
			[
				Buffer.from("grant-milestone"),
				grant.toBuffer(),
				new BN(id).toArrayLike(Buffer, "le", 4), // u32
			],
			this.barn.programId
		)[0];
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

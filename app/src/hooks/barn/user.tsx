"use client";

import {
	useQuery,
	QueryFunctionContext,
	useQueries,
} from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useBarn } from "./client";
import { useFetchBarnURI } from "./uri";
import {
	GrantMilestoneURI,
	GrantProgramURI,
	GrantURI,
	ProfileURI,
	ProjectURI,
} from "@/lib/uri-schema";
import {
	barnAuthorityQuery,
	barnGrantMilestoneQuery,
	barnGrantProgramQuery,
	barnGrantQuery,
	barnProfileQuery,
	barnProjectQuery,
} from "@/lib/query/barn";
import { useBarnAuthority, useBarnProfile } from "./state";

export function useBarnUser() {
	const barn = useBarn();
	const { publicKey } = useWallet();

	const { profile, authority, programPks, projectPks, profileUri, sponsor } =
		useBarnAuthority(
			publicKey ? barn.account.authorityAddress(publicKey).toBase58() : null
		);

	const { grantPks } = useBarnProfile(profile?.key.toBase58() ?? null);

	return {
		profile,
		authority,
		projectPks,
		programPks,
		profileUri,
		sponsor,
		grantPks,
	};
}

// export function useBarnAuthority(authorityPk: string | null) {
// 	const barn = useBarn();

// 	const authority = useQuery({
// 		...barnAuthorityQuery.query(barn, authorityPk),
// 	});

// 	const profile = useQuery({
// 		...barnProfileQuery.query(barn, authority.data?.profile.toBase58() || null),
// 	});

// 	const projectPks = useQuery({
// 		...barnProjectQuery.pubkeysQuery(
// 			barn,
// 			authority.data?.profile.toBase58() || null,
// 			profile.data?.count || null
// 		),
// 	});

// 	const programPks = useQuery({
// 		...barnGrantProgramQuery.pubkeysQuery(
// 			barn,
// 			authority.data?.profile.toBase58() || null,
// 			profile.data?.count || null
// 		),
// 	});

// 	// todo: replace
// 	const projectOrProgramPks = useQuery({
// 		queryKey: [
// 			"project-or-program-keys",
// 			{
// 				profilePk: authority.data?.profile.toBase58() || null,
// 				count: profile.data?.count || null,
// 				sponsor: profile.data?.sponsor ?? null,
// 			},
// 		],
// 		queryFn: ({
// 			queryKey,
// 		}: QueryFunctionContext<
// 			[
// 				string,
// 				{
// 					profilePk: string | null;
// 					count: number | null;
// 					sponsor: boolean | null;
// 				},
// 			]
// 		>) => {
// 			const [_, { profilePk, count, sponsor }] = queryKey;
// 			return profilePk && count && sponsor !== null
// 				? barn.account.getProjectOrGrantProgramPks(
// 						new PublicKey(profilePk),
// 						count,
// 						sponsor
// 					)
// 				: null;
// 		},
// 	});

// 	const profileUri = useFetchBarnURI<ProfileURI>({
// 		pk: authority.data?.profile.toBase58() || null,
// 		uri: profile.data?.uri || null,
// 	});

// 	return {
// 		authority: authority.data,
// 		profile: profile.data,
// 		profileUri: profileUri,
// 		projectOrProgramPks: projectOrProgramPks.data,
// 		projectPks: projectPks.data,
// 		programPks: programPks.data,
// 	};
// }

// export function useBarnProfile(profilePk: string | null) {
// 	const barn = useBarn();

// 	const profile = useQuery({ ...barnProfileQuery.query(barn, profilePk) });

// 	const { projectOrProgramPks, authority } = useBarnAuthority(
// 		profile.data?.authority.toBase58() || null
// 	);

// 	const profileUri = useFetchBarnURI<ProfileURI>({
// 		pk: profilePk,
// 		uri: profile.data?.uri || null,
// 	});

// 	return { profile: profile.data, projectOrProgramPks, authority, profileUri };
// }

// export function useBarnProject(projectPk: string | null) {
// 	const barn = useBarn();

// 	const project = useQuery({ ...barnProjectQuery.query(barn, projectPk) });

// 	const { profile, authority, profileUri } = useBarnProfile(
// 		project.data?.profile.toBase58() || null
// 	);

// 	const projectUri = useFetchBarnURI<ProjectURI>({
// 		pk: projectPk,
// 		uri: project.data?.uri || null,
// 	});

// 	return {
// 		project: project.data,
// 		profile,
// 		profileUri,
// 		projectUri,
// 		authority,
// 		grantPk: project.data?.grant,
// 	};
// }

// export function useBarnGrantProgram(grantProgramPk: string | null) {
// 	const barn = useBarn();

// 	const grantProgram = useQuery({
// 		...barnGrantProgramQuery.query(barn, grantProgramPk),
// 	});

// 	const { profile, authority, profileUri } = useBarnProfile(
// 		grantProgram.data?.profile.toBase58() || null
// 	);

// 	const grantPks = useQuery({
// 		...barnGrantQuery.pubkeysQuery(
// 			barn,
// 			grantProgramPk,
// 			grantProgram.data?.count || null
// 		),
// 	});

// 	const grantProgramUri = useFetchBarnURI<GrantProgramURI>({
// 		pk: grantProgramPk,
// 		uri: grantProgram.data?.uri || null,
// 	});

// 	const grants = useQueries({
// 		queries: (grantPks.data ? grantPks.data : []).map((grantPk) => ({
// 			...barnGrantQuery.query(barn, grantPk.toBase58()),
// 			staleTime: Infinity,
// 		})),
// 		combine: (results) => {
// 			return {
// 				data: results.map((result) => result.data),
// 				pending: results.some((result) => result.isPending),
// 			};
// 		},
// 	});

// 	return {
// 		grantProgram: grantProgram.data,
// 		authority,
// 		profile,
// 		profileUri,
// 		grantProgramUri,
// 		grantPks: grantPks.data,
// 		grants: grants.data,
// 	};
// }

// export function useBarnGrant(grantPk: string | null) {
// 	const barn = useBarn();

// 	const grant = useQuery({ ...barnGrantQuery.query(barn, grantPk) });

// 	const { project, authority, profile, profileUri, projectUri } =
// 		useBarnProject(grant.data?.project.toBase58() || null);

// 	const {
// 		authority: sponsorAuthority,
// 		profile: sponsorProfile,
// 		profileUri: sponsorProfileUri,
// 		grantProgram,
// 		grantProgramUri,
// 	} = useBarnGrantProgram(grant.data?.program.toBase58() || null);

// 	const milestonePks = useQuery({
// 		...barnGrantMilestoneQuery.pubkeysQuery(
// 			barn,
// 			grantPk,
// 			grant.data?.count || null
// 		),
// 	});

// 	const grantUri = useFetchBarnURI<GrantURI>({
// 		pk: grantPk,
// 		uri: grant.data?.uri || null,
// 	});

// 	return {
// 		grant: grant.data,
// 		project,
// 		grantUri,
// 		profileUri,
// 		projectUri,
// 		milestonePks: milestonePks.data,
// 		authority,
// 		profile,
// 		grantProgram,
// 		sponsorProfile,
// 		sponsorProfileUri,
// 		sponsorAuthority,
// 		grantProgramUri,
// 	};
// }

// export function useBarnGrantMilestone(milestonePk: string) {
// 	const barn = useBarn();

// 	const milestone = useQuery({
// 		...barnGrantMilestoneQuery.query(barn, milestonePk),
// 	});

// 	const {
// 		grant,
// 		project,
// 		authority,
// 		profile,
// 		profileUri,
// 		projectUri,
// 		grantUri,
// 		grantProgramUri,
// 	} = useBarnGrant(milestone.data?.grant.toBase58() || null);

// 	const milestoneUri = useFetchBarnURI<GrantMilestoneURI>({
// 		pk: milestonePk,
// 		uri: milestone.data?.uri || null,
// 	});

// 	return {
// 		milestone: milestone.data,
// 		grant,
// 		project,
// 		authority,
// 		profile,
// 		profileUri,
// 		projectUri,
// 		grantUri,
// 		milestoneUri,
// 		grantProgramUri,
// 	};
// }

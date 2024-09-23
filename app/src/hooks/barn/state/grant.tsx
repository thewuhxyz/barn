import { useQueries, useQuery } from "@tanstack/react-query";
import { useBarn } from "../client";
import { barnGrantMilestoneQuery, barnGrantQuery } from "@/lib/query/barn";
import { useFetchBarnURI } from "../uri";
import { GrantURI } from "@/lib/uri-schema";
import { useBarnProject } from "./project";
import { useBarnGrantProgram } from "./grant-program";
import { PublicKey } from "@solana/web3.js";
import { GrantProgramAccount } from "@barn/protocol";

export function useBarnGrant(grantPk: string | null) {
	const barn = useBarn();

	const grant = useQuery({ ...barnGrantQuery.query(barn, grantPk) });

	const { project, authority, profile, profileUri, projectUri } =
		useBarnProject(grant.data?.project.toBase58() || null);

	const {
		authority: sponsorAuthority,
		profile: sponsorProfile,
		profileUri: sponsorProfileUri,
		grantProgram,
		grantProgramUri,
	} = useBarnGrantProgram(grant.data?.program.toBase58() || null);

	const milestonePks = useQuery({
		...barnGrantMilestoneQuery.pubkeysQuery(
			barn,
			grantPk,
			grant.data?.count || null
		),
	});

	const grantUri = useFetchBarnURI<GrantURI>({
		pk: grantPk,
		uri: grant.data?.uri || null,
	});

	return {
		grant: grant.data,
		project,
		grantUri,
		profileUri,
		projectUri,
		milestonePks: milestonePks.data,
		authority,
		profile,
		grantProgram,
		sponsorProfile,
		sponsorProfileUri,
		sponsorAuthority,
		grantProgramUri,
	};
}

export function useBarnGrants(grantPks: PublicKey[]) {
	const barn = useBarn();
	const grants = useQueries({
		queries: grantPks.map((grantPk) => ({
			...barnGrantQuery.query(barn, grantPk.toBase58()),
			staleTime: Infinity,
		})),
		combine: (results) => {
			return {
				data: results.map((result) => result.data),
				pending: results.some((result) => result.isPending),
			};
		},
	}).data;

	return { grants };
}

export function useBarnGrantsFromProgram(
	grantPrograms: GrantProgramAccount[] | null
) {
	const barn = useBarn();

	const grantPks = useQueries({
		queries: (grantPrograms ?? []).map(({ key, count }) => ({
			...barnGrantQuery.pubkeysQuery(barn, key.toBase58(), count),
			staleTime: Infinity,
		})),
		combine: (results) => {
			return {
				data: results.flatMap((result) => result.data ?? []),
				pending: results.some((result) => result.isPending),
			};
		},
	}).data;

	return { grantPks };
}

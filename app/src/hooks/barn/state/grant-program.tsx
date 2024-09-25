import { useQueries, useQuery } from "@tanstack/react-query";
import { useBarn } from "../client";
import { barnGrantProgramQuery, barnGrantQuery } from "@/lib/query/barn";
import { useFetchBarnURI } from "../uri";
import { useBarnProfile } from "./profile";
import { GrantProgramURI } from "@/lib/uri-schema";
import { PublicKey } from "@solana/web3.js";

export function useBarnGrantProgram(grantProgramPk: string | null) {
	const barn = useBarn();

	const grantProgram = useQuery({
		...barnGrantProgramQuery.query(barn, grantProgramPk),
	});

	const { profile, authority, profileUri } = useBarnProfile(
		grantProgram.data?.profile.toBase58() || null
	);

	const grantPks = useQuery({
		...barnGrantQuery.pubkeysQuery(
			barn,
			grantProgramPk,
			grantProgram.data?.count || null
		),
	});

	const grantProgramUri = useFetchBarnURI<GrantProgramURI>({
		pk: grantProgramPk,
		uri: grantProgram.data?.uri || null,
	});

	return {
		grantProgram: grantProgram.data,
		authority,
		profile,
		profileUri,
		grantProgramUri,
		grantPks: grantPks.data,
	};
}

export function useBarnGrantPrograms(grantProgramPks: PublicKey[] | null) {
	const barn = useBarn();
	const grantPrograms = useQueries({
		queries: (grantProgramPks ?? []).map((grantProgramPk) => ({
			...barnGrantProgramQuery.query(barn, grantProgramPk.toBase58()),
			staleTime: Infinity,
		})),
		combine: (results) => {
			return {
				data: results.flatMap((result) => result.data ?? []),
				pending: results.some((result) => result.isPending),
			};
		},
	}).data;

	return { grantPrograms };
}


import { useQueries, useQuery } from "@tanstack/react-query";
import { useBarn } from "../client";
import {
	barnGrantMilestoneQuery,
	barnGrantProgramQuery,
	barnGrantQuery,
} from "@/lib/query/barn";
import { useFetchBarnURI } from "../uri";
import { GrantMilestoneURI } from "@/lib/uri-schema";
import { useBarnGrant } from "./grant";
import { PublicKey } from "@solana/web3.js";

export function useBarnGrantMilestone(milestonePk: string | null) {
	const barn = useBarn();

	const milestone = useQuery({
		...barnGrantMilestoneQuery.query(barn, milestonePk),
	});

	const {
		grant,
		project,
		authority,
		profile,
		profileUri,
		projectUri,
		grantUri,
		grantProgram,
		grantProgramUri,
	} = useBarnGrant(milestone.data?.grant.toBase58() || null);

	const milestoneUri = useFetchBarnURI<GrantMilestoneURI>({
		pk: milestonePk,
		uri: milestone.data?.uri || null,
	});

	return {
		milestone: milestone.data,
		grant,
		project,
		authority,
		profile,
		profileUri,
		projectUri,
		grantUri,
		milestoneUri,
		grantProgram,
		grantProgramUri,
	};
}

export function useBarnGrantMilestones(milestonesPk: PublicKey[]) {
	const barn = useBarn();
	const grantMilestones = useQueries({
		queries: milestonesPk.map((milestonePk) => ({
			...barnGrantMilestoneQuery.query(barn, milestonePk.toBase58()),
			staleTime: Infinity,
		})),
		combine: (results) => {
			return {
				data: results.map((result) => result.data),
				pending: results.some((result) => result.isPending),
			};
		},
	}).data;

	return { grantMilestones };
}

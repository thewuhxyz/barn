import { useQueries, useQuery } from "@tanstack/react-query";
import { useBarn } from "../client";
import { barnProjectQuery } from "@/lib/query/barn";
import { useFetchBarnURI } from "../uri";
import { useBarnProfile } from "./profile";
import { ProjectURI } from "@/lib/uri-schema";
import { PublicKey } from "@solana/web3.js";

export function useBarnProject(projectPk: string | null) {
	const barn = useBarn();

	const project = useQuery({ ...barnProjectQuery.query(barn, projectPk) });

	const { profile, authority, profileUri } = useBarnProfile(
		project.data?.profile.toBase58() || null
	);

	const projectUri = useFetchBarnURI<ProjectURI>({
		pk: projectPk,
		uri: project.data?.uri || null,
	});

	return {
		project: project.data,
		profile,
		profileUri,
		projectUri,
		authority,
		grantPk: project.data?.grant,
	};
}

export function useBarnProjects(projectPks: PublicKey[] | null) {
	const barn = useBarn();
	const projects = useQueries({
		queries: (projectPks ?? []).map((projectPk) => ({
			...barnProjectQuery.query(barn, projectPk.toBase58()),
			staleTime: Infinity,
		})),
		combine: (results) => {
			return {
				data: results.flatMap((result) => result.data ?? []),
				pending: results.some((result) => result.isPending),
			};
		},
	}).data;

	return { projects };
}

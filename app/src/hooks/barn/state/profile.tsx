import { useQuery } from "@tanstack/react-query";
import { useBarn } from "../client";
import {
	barnAuthorityQuery,
	barnGrantProgramQuery,
	barnProfileQuery,
	barnProjectQuery,
} from "@/lib/query/barn";
import { useFetchBarnURI } from "../uri";
import { ProfileURI } from "@/lib/uri-schema";
import { useBarnProjects } from "./project";
import { useBarnGrantPrograms } from "./grant-program";
import { useBarnGrantsFromProgram } from "./grant";

export function useBarnProfile(profilePk: string | null) {
	const barn = useBarn();

	const profile = useQuery({ ...barnProfileQuery.query(barn, profilePk) });

	const authority = useQuery({
		...barnAuthorityQuery.query(
			barn,
			profile.data?.authority.toBase58() || null
		),
	});

	const _projectPks = useQuery({
		...barnProjectQuery.pubkeysQuery(
			barn,
			profilePk,
			profile.data?.count || null
		),
	});

	const _programPks = useQuery({
		...barnGrantProgramQuery.pubkeysQuery(
			barn,
			profilePk,
			profile.data?.count || null
		),
	});

	const profileUri = useFetchBarnURI<ProfileURI>({
		pk: authority.data?.profile.toBase58() || null,
		uri: profile.data?.uri || null,
	});

	const programPks = profile.data?.sponsor ? _programPks.data : null;
	const projectPks = !profile.data?.sponsor ? _projectPks.data : null;

	const { projects } = useBarnProjects(projectPks ?? null);

	const { grantPrograms } = useBarnGrantPrograms(programPks ?? null);

	const { grantPks: grantPksFromPrograms } =
		useBarnGrantsFromProgram(grantPrograms);

	const grantPksFromProjects = projects.flatMap((p) => p.grant ?? []);

	return {
		profile: profile.data,
		authority: authority.data,
		profileUri,
		programPks,
		projectPks,
		sponsor: profile.data?.sponsor ?? null,
		grantPks:
			profile.data?.sponsor === undefined
				? profile.data?.sponsor
				: profile.data?.sponsor
					? grantPksFromPrograms
					: grantPksFromProjects,
	};
}

export function useBarnGrantsForProfile(profilePk: string | null) {
	const { sponsor, programPks, projectPks } = useBarnProfile(profilePk);

	const { projects } = useBarnProjects(projectPks ?? null);

	const { grantPrograms } = useBarnGrantPrograms(programPks ?? null);

	const { grantPks: grantPksFromPrograms } =
		useBarnGrantsFromProgram(grantPrograms);

	const grantPksFromProjects = projects.flatMap((p) => p.grant ?? []);

	return sponsor === null
		? sponsor
		: sponsor
			? grantPksFromPrograms
			: grantPksFromProjects;
}

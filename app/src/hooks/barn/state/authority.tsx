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

export function useBarnAuthority(authorityPk: string | null) {
	const barn = useBarn();

	const authority = useQuery({
		...barnAuthorityQuery.query(barn, authorityPk),
	});

	const profile = useQuery({
		...barnProfileQuery.query(barn, authority.data?.profile.toBase58() || null),
	});

	const projectPks = useQuery({
		...barnProjectQuery.pubkeysQuery(
			barn,
			authority.data?.profile.toBase58() || null,
			profile.data?.count || null
		),
	});

	const programPks = useQuery({
		...barnGrantProgramQuery.pubkeysQuery(
			barn,
			authority.data?.profile.toBase58() || null,
			profile.data?.count || null
		),
	});

	const profileUri = useFetchBarnURI<ProfileURI>({
		pk: authority.data?.profile.toBase58() || null,
		uri: profile.data?.uri || null,
	});

	return {
		authority: authority.data,
		profile: profile.data,
		profileUri: profileUri,
		programPks: profile.data?.sponsor ? programPks.data : null,
		projectPks: !profile.data?.sponsor ? projectPks.data : null,
		sponsor: profile.data?.sponsor,
	};
}

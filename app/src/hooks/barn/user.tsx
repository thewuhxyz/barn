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

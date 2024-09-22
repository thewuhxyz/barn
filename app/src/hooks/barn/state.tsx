"use client";

import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
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

export function useBarnUser() {
	const barn = useBarn();
	const { publicKey } = useWallet();

	const { profile, projectOrProgramPks, authority, programPks, projectPks, profileUri } =
		useBarnAuthority(
			publicKey ? barn.account.authorityAddress(publicKey).toBase58() : null
		);

	return { profile, projectOrProgramPks, authority, projectPks, programPks, profileUri };
}

export function useBarnAuthority(authorityPk: string | null) {
	const barn = useBarn();

	const authority = useQuery({
		queryKey: ["authority", { authorityPk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { authorityPk: string | null }]>) => {
			const [_, { authorityPk }] = queryKey;
			return authorityPk
				? barn.account.authority(new PublicKey(authorityPk))
				: null;
		},
	});

	const profile = useQuery({
		queryKey: [
			"profile",
			{ profilePk: authority.data?.profile.toBase58() || null },
		],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { profilePk: string | null }]>) => {
			const [_, { profilePk }] = queryKey;
			return profilePk ? barn.account.profile(new PublicKey(profilePk)) : null;
		},
	});

	const projectPks = useQuery({
		queryKey: [
			"project-keys",
			{
				profilePk: authority.data?.profile.toBase58() || null,
				count: profile.data?.count || null,
			},
		],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<
			[
				string,
				{
					profilePk: string | null;
					count: number | null;
				},
			]
		>) => {
			const [_, { profilePk, count }] = queryKey;
			return profilePk && count
				? barn.account.getProjectPks(new PublicKey(profilePk), count)
				: null;
		},
	});

	const programPks = useQuery({
		queryKey: [
			"program-keys",
			{
				profilePk: authority.data?.profile.toBase58() || null,
				count: profile.data?.count || null,
			},
		],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<
			[
				string,
				{
					profilePk: string | null;
					count: number | null;
				},
			]
		>) => {
			const [_, { profilePk, count }] = queryKey;
			return profilePk && count
				? barn.account.getGrantProgramPks(new PublicKey(profilePk), count)
				: null;
		},
	});

	const projectOrProgramPks = useQuery({
		queryKey: [
			"project-or-program-keys",
			{
				profilePk: authority.data?.profile.toBase58() || null,
				count: profile.data?.count || null,
				sponsor: profile.data?.sponsor ?? null,
			},
		],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<
			[
				string,
				{
					profilePk: string | null;
					count: number | null;
					sponsor: boolean | null;
				},
			]
		>) => {
			const [_, { profilePk, count, sponsor }] = queryKey;
			return profilePk && count && sponsor !== null
				? barn.account.getProjectOrGrantProgramPks(
						new PublicKey(profilePk),
						count,
						sponsor
					)
				: null;
		},
	});

	const profileUri = useFetchBarnURI<ProfileURI>({
		pk: authority.data?.profile.toBase58() || null,
		uri: profile.data?.uri || null,
	});

	return {
		authority: authority.data,
		profile: profile.data,
		profileUri: profileUri,
		projectOrProgramPks: projectOrProgramPks.data,
		projectPks: projectPks.data,
		programPks: programPks.data,
	};
}

export function useBarnProfile(profilePk: string | null) {
	const barn = useBarn();

	const profile = useQuery({
		queryKey: ["profile", { profilePk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { profilePk: string | null }]>) => {
			const [_, { profilePk }] = queryKey;
			return profilePk ? barn.account.profile(new PublicKey(profilePk)) : null;
		},
	});

	const { projectOrProgramPks, authority } = useBarnAuthority(
		profile.data?.authority.toBase58() || null
	);

	const profileUri = useFetchBarnURI<ProfileURI>({
		pk: profilePk,
		uri: profile.data?.uri || null,
	});

	return { profile: profile.data, projectOrProgramPks, authority, profileUri };
}

export function useBarnProject(projectPk: string | null) {
	const barn = useBarn();

	const project = useQuery({
		queryKey: ["project", { projectPk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { projectPk: string | null }]>) => {
			const [_, { projectPk }] = queryKey;
			return projectPk ? barn.account.project(new PublicKey(projectPk)) : null;
		},
	});

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

export function useBarnGrantProgram(grantProgramPk: string) {
	const barn = useBarn();

	const grantProgram = useQuery({
		queryKey: ["grant-program", { grantProgramPk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { grantProgramPk: string }]>) => {
			const [_, { grantProgramPk }] = queryKey;
			return barn.account.grantProgram(new PublicKey(grantProgramPk));
		},
	});

	const { profile, authority, profileUri } = useBarnProfile(
		grantProgram.data?.profile.toBase58() || null
	);

	const grantPks = useQuery({
		queryKey: [
			"grant-keys",
			{
				grantProgramPk: grantProgramPk,
				count: grantProgram.data?.count || null,
			},
		],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<
			[
				string,
				{
					grantProgramPk: string;
					count: number | null;
				},
			]
		>) => {
			const [_, { grantProgramPk, count }] = queryKey;
			return grantProgramPk && count !== null
				? barn.account.getGrantsPks(new PublicKey(grantProgramPk), count)
				: null;
		},
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

export function useBarnGrant(grantPk: string | null) {
	const barn = useBarn();

	const grant = useQuery({
		queryKey: ["grant", { grantPk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { grantPk: string | null }]>) => {
			const [_, { grantPk }] = queryKey;
			return grantPk ? barn.account.grant(new PublicKey(grantPk)) : null;
		},
	});

	const { project, authority, profile, profileUri, projectUri } =
		useBarnProject(grant.data?.project.toBase58() || null);

	const milestonePks = useQuery({
		queryKey: [
			"milestones-keys",
			{
				grantPk: grantPk,
				count: grant.data?.count || null,
			},
		],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<
			[string, { grantPk: string | null; count: number | null }]
		>) => {
			const [_, { grantPk, count }] = queryKey;
			return grantPk && count
				? barn.account.getGrantMilestonesPks(new PublicKey(grantPk), count)
				: null;
		},
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
	};
}

export function useBarnGrantMilestone(milestonePk: string) {
	const barn = useBarn();

	const milestone = useQuery({
		queryKey: ["milestone", { milestonePk }],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<[string, { milestonePk: string }]>) => {
			const [_, { milestonePk }] = queryKey;
			return barn.account.grantMilestone(new PublicKey(milestonePk));
		},
	});

	const {
		grant,
		project,
		authority,
		profile,
		profileUri,
		projectUri,
		grantUri,
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
	};
}

export function useBarnAccount() {
	const barn = useBarn();

	const allGrants = useQuery({
		queryKey: ["all-grants"],
		queryFn: () => {
			return barn.account.getAllGrantAccount();
		},
	});

	const addGrantPrograms = useQuery({
		queryKey: ["all-grant-programs"],
		queryFn: () => {
			return barn.program.account.grantProgram.all();
		},
	});

	return { allGrants: allGrants.data, allGrantPrograms: addGrantPrograms.data };
}

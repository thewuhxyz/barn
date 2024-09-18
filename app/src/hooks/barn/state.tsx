"use client";

import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useBarn } from "./client";

export function useBarnUser() {
	const barn = useBarn();
	const { publicKey } = useWallet();

	const { profile, projectOrProgramPks, authority } = useBarnAuthority(
		publicKey ? barn.account.authorityAddress(publicKey).toBase58() : null
	);

	return { profile, projectOrProgramPks, authority };
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

	const projectOrProgramPks = useQuery({
		queryKey: [
			"project-keys",
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

	return {
		authority: authority.data,
		profile: profile.data,
		projectOrProgramPks: projectOrProgramPks.data,
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

	return { profile: profile.data, projectOrProgramPks, authority };
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

	const { profile, authority } = useBarnProfile(
		project.data?.profile.toBase58() || null
	);

	return {
		project: project.data,
		profile,
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

	const { profile, authority } = useBarnProfile(
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

	return {
		grantProgram: grantProgram.data,
		authority,
		profile,
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

	const { project, authority, profile } = useBarnProject(
		grant.data?.project.toBase58() || null
	);

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

	return {
		grant: grant.data,
		project,
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

	const { grant, project, authority, profile } = useBarnGrant(
		milestone.data?.grant.toBase58() || null
	);

	return { milestone: milestone.data, grant, project, authority, profile };
}

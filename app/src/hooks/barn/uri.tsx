"use client";

import { useQuery } from "@tanstack/react-query";

export function useFetchBarnURI<T>({
	pk,
	uri,
}: {
	pk: string | null;
	uri: string | null;
}) {
	return useQuery({
		queryKey: ["uri", { pk }],
		queryFn: () => {
			return uri ? fetch(uri).then((res) => res.json() as Promise<T>) : null;
		},
	}).data;
}

export function useGithubProfile({ user }: { user: string | null }) {
	return useQuery({
		queryKey: ["github-user", { user }],
		queryFn: () => {
			return user
				? fetch(`https://api.github.com/users/${user}`).then(
						(res) =>
							res.json() as Promise<{
								avatar_url?: string | null;
								twitter_username?: string | null;
								name?: string | null;
								blog?: string | null;
								login?: string | null;
								bio?: string | null;
							}>
					)
				: null;
		},
	}).data;
}

export function useGithubRepo({ repo }: { repo: string | null }) {
	return useQuery({
		queryKey: ["github-repo", { repo }],
		queryFn: () => {
			return repo
				? fetch(`https://api.github.com/repos/${repo}`).then(
						(res) =>
							res.json() as Promise<{
								description?: string | null;
								homepage?: string | null;
								name?: string | null;
								owner: {
									avatar_url?: string | null;
									twitter_username?: string | null;
									name?: string | null;
									blog?: string | null;
									login?: string | null;
									bio?: string | null;
								};
							}>
					)
				: null;
		},
	}).data;
}

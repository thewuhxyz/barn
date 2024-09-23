import { PublicKey } from "@solana/web3.js";
import { ProjectAccount } from "@barn/protocol";
import { BarnAccountQuery } from "./interface";

export const barnProjectQuery = {
	queryKey(publicKey) {
		return ["project", { publicKey }];
	},

	query(barn, publicKey) {
		return {
			queryKey: this.queryKey(publicKey),
			queryFn: ({ queryKey }) => {
				const [_, { publicKey }] = queryKey;
				return publicKey
					? barn.account.project(new PublicKey(publicKey))
					: null;
			},
		};
	},

	pubkeysQueryKey(profilePk, count) {
		return ["project", { publicKey: profilePk, keys: count }];
	},

	pubkeysQuery(barn, profilePk, count) {
		return {
			queryKey: this.pubkeysQueryKey(profilePk, count),
			queryFn: ({ queryKey }) => {
				const [_, { publicKey, keys }] = queryKey;
				return publicKey && keys
					? barn.account.getProjectPks(new PublicKey(publicKey), keys)
					: null;
			},
		};
	},
} satisfies BarnAccountQuery<"project", ProjectAccount>;

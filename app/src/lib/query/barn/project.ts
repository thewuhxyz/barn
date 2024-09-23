import { PublicKey } from "@solana/web3.js";
import { ProjectAccount } from "@barn/protocol";
import { BarnAccountQuery } from "./interface";

export const BarnProfileQuery = {
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

	pubkeysQueryKey(publicKey, count) {
		return ["project", { publicKey, keys: count }];
	},

	pubkeysQuery(barn, publicKey, count) {
		return {
			queryKey: this.pubkeysQueryKey(publicKey, count),
			queryFn: () => {
				throw "not implemented";
			},
		};
	},
} satisfies BarnAccountQuery<"project", ProjectAccount>;

import { PublicKey } from "@solana/web3.js";
import { ProfileAccount } from "@barn/protocol";
import { BarnAccountQuery } from "./interface";

export const barnProfileQuery = {
	queryKey(publicKey) {
		return ["profile", { publicKey }];
	},

	query(barn, publicKey) {
		return {
			queryKey: this.queryKey(publicKey),
			queryFn: ({ queryKey }) => {
				const [_, { publicKey }] = queryKey;
				return publicKey
					? barn.account.profile(new PublicKey(publicKey))
					: null;
			},
		};
	},

	pubkeysQueryKey(publicKey, count) {
		return ["profile", { publicKey, keys: count }];
	},

	pubkeysQuery(barn, publicKey, count) {
		return {
			queryKey: this.pubkeysQueryKey(publicKey, count),
			queryFn: () => {
				throw "not implemented";
			},
		};
	},
} satisfies BarnAccountQuery<"profile", ProfileAccount>;

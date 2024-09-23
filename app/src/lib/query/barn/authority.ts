import { PublicKey } from "@solana/web3.js";
import { AuthorityAccount } from "@barn/protocol";
import { BarnAccountQuery } from "./interface";

export const BarnAuthorityQuery = {
	queryKey(publicKey) {
		return ["authority", { publicKey }];
	},

	query(barn, publicKey) {
		return {
			queryKey: this.queryKey(publicKey),
			queryFn: ({ queryKey }) => {
				const [_, { publicKey }] = queryKey;
				return publicKey
					? barn.account.authority(new PublicKey(publicKey))
					: null;
			},
		};
	},

	pubkeysQueryKey(publicKey, count) {
		return ["authority", { publicKey, keys: count }];
	},

	pubkeysQuery(barn, publicKey, count) {
		return {
			queryKey: this.pubkeysQueryKey(publicKey, count),
			queryFn: () => {
				throw "not implemented";
			},
		};
	},
} satisfies BarnAccountQuery<"authority", AuthorityAccount>;

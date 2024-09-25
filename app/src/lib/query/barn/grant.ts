import { PublicKey } from "@solana/web3.js";
import { GrantAccount } from "@barn/protocol";
import { BarnAccountQuery } from "./interface";

export const barnGrantQuery = {
	queryKey(publicKey) {
		return ["grant", { publicKey }];
	},

	query(barn, publicKey) {
		return {
			queryKey: this.queryKey(publicKey),
			queryFn: ({ queryKey }) => {
				const [_, { publicKey }] = queryKey;
				return publicKey ? barn.account.grant(new PublicKey(publicKey)) : null;
			},
		};
	},

	pubkeysQueryKey(grantProgramPk, count) {
		return ["grant", { publicKey: grantProgramPk, keys: count }];
	},

	pubkeysQuery(barn, grantProgramPk, count) {
		return {
			queryKey: this.pubkeysQueryKey(grantProgramPk, count),
			queryFn: ({ queryKey }) => {
				const [_, { publicKey, keys }] = queryKey;
				return publicKey && keys
					? barn.account.getGrantsPks(new PublicKey(publicKey), keys)
					: null;
			},
		};
	},
} satisfies BarnAccountQuery<"grant", GrantAccount>;

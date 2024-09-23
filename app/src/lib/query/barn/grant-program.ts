import { PublicKey } from "@solana/web3.js";
import { GrantProgramAccount } from "@barn/protocol";
import { BarnAccountQuery } from "./interface";

export const BarnGrantProgramQuery = {
	queryKey(publicKey) {
		return ["grant-program", { publicKey }];
	},

	query(barn, publicKey) {
		return {
			queryKey: this.queryKey(publicKey),
			queryFn: ({ queryKey }) => {
				const [_, { publicKey }] = queryKey;
				return publicKey
					? barn.account.grantProgram(new PublicKey(publicKey))
					: null;
			},
		};
	},

	pubkeysQueryKey(profilePk, count) {
		return ["grant-program", { publicKey: profilePk, keys: count }];
	},

	pubkeysQuery(barn, profilePk, count) {
		return {
			queryKey: this.pubkeysQueryKey(profilePk, count),
			queryFn: ({ queryKey }) => {
				const [_, { publicKey, keys }] = queryKey;
				return publicKey && keys
					? barn.account.getGrantProgramPks(new PublicKey(publicKey), keys)
					: null;
			},
		};
	},
} satisfies BarnAccountQuery<"grant-program", GrantProgramAccount>;

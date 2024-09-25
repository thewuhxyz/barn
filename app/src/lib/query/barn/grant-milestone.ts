import { PublicKey } from "@solana/web3.js";
import { GrantMilestoneAccount } from "@barn/protocol";
import { BarnAccountQuery } from "./interface";

export const barnGrantMilestoneQuery = {
	queryKey(publicKey) {
		return ["grant-milestone", { publicKey }];
	},

	query(barn, publicKey) {
		return {
			queryKey: this.queryKey(publicKey),
			queryFn: ({ queryKey }) => {
				const [_, { publicKey }] = queryKey;
				return publicKey
					? barn.account.grantMilestone(new PublicKey(publicKey))
					: null;
			},
		};
	},

	pubkeysQueryKey(grantPk, count) {
		return ["grant-milestone", { publicKey: grantPk, keys: count }];
	},

	pubkeysQuery(barn, grantPk, count) {
		return {
			queryKey: this.pubkeysQueryKey(grantPk, count),
			queryFn: ({ queryKey }) => {
				const [_, { publicKey, keys }] = queryKey;
				return grantPk && keys
					? barn.account.getGrantMilestonesPks(new PublicKey(grantPk), keys)
					: null;
			},
		};
	},
} satisfies BarnAccountQuery<"grant-milestone", GrantMilestoneAccount>;

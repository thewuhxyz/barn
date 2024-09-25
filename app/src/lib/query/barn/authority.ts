import { PublicKey } from "@solana/web3.js";
import { AuthorityAccount } from "@barn/protocol";
import { BarnAccountQuery } from "./interface";

export const barnAuthorityQuery = {
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

	pubkeysQueryKey() {
		throw "not implemented";
	},

	pubkeysQuery() {
		throw "not implemented";
	},
} satisfies BarnAccountQuery<"authority", AuthorityAccount>;

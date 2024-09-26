import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import { BarnInstructon } from "./instruction";
import { Barn, BarnIDLJson } from "../idl";
import BN from "bn.js";
import {
	getAssociatedTokenAddressSync,
	getMint,
	Mint,
} from "@solana/spl-token";
import { AuthorityAccount, BarnAccount, ProfileAccount } from "./account";
import { type BarnMethod, BarnMethods } from "./methods";
import { BarnRPC } from "./rpc";
import { BarnTransaction } from "./transaction";

export class BarnClient {
	program: Program<Barn>;
	rpc: BarnRPC;
	instructions: BarnInstructon;
	transaction: BarnTransaction;
	account: BarnAccount;

	constructor(public provider: AnchorProvider) {
		this.program = new Program(BarnIDLJson as Barn, provider);
		this.rpc = new BarnRPC(this.program);
		this.instructions = new BarnInstructon(this.program);
		this.transaction = new BarnTransaction(this.program);
		this.account = new BarnAccount(this.program);
	}

	get connection() {
		return this.provider.connection;
	}

	get signer(): PublicKey {
		if (!this.provider.publicKey) throw "wallet not connected";
		return this.provider.publicKey;
	}

	async getMintAccount(mint: PublicKey): Promise<Mint> {
		return getMint(this.connection, mint);
	}

	getAtaAddress(mint: PublicKey, owner: PublicKey): PublicKey {
		return getAssociatedTokenAddressSync(mint, owner, true);
	}
}

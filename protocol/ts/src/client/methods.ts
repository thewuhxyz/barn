import { Program } from "@coral-xyz/anchor";
import { Barn } from "../idl";
import {
	ConfirmOptions,
	PublicKey,
	Transaction,
	TransactionInstruction,
} from "@solana/web3.js";
import type BN from "bn.js";

export class BarnMethods {
	constructor(private program: Program<Barn>) {}

	createUser(args: {
		seed: string;
		uri: string;
		signer: PublicKey;
	}): BarnMethod {
		return BarnMethods.createUser(this.program, args);
	}

	approveSponsor(args: { admin: PublicKey; signer: PublicKey }): BarnMethod {
		return BarnMethods.approveSponsor(this.program, args);
	}

	addProject(args: { uri: string; signer: PublicKey }): BarnMethod {
		return BarnMethods.addProject(this.program, args);
	}

	addGrantProgram(args: { uri: string; signer: PublicKey }): BarnMethod {
		return BarnMethods.addGrantProgram(this.program, args);
	}

	awardGrant(args: {
		uri: string;
		approvedAmount: BN;
		paymentMint: PublicKey;
		grantProgram: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): BarnMethod {
		return BarnMethods.awardGrant(this.program, args);
	}

	addGrantMilestone(args: {
		uri: string;
		amount: BN;
		grant: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): BarnMethod {
		return BarnMethods.addGrantMilestone(this.program, args);
	}

	reviseGrantMilestone(args: {
		uri: string | null;
		amount: BN | null;
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): BarnMethod {
		return BarnMethods.reviseGrantMilestone(this.program, args);
	}

	reviewGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): BarnMethod {
		return BarnMethods.reviewGrantMilestone(this.program, args);
	}

	acceptGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): BarnMethod {
		return BarnMethods.acceptGrantMilestone(this.program, args);
	}

	rejectGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): BarnMethod {
		return BarnMethods.rejectGrantMilestone(this.program, args);
	}

	settleGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		to: PublicKey;
		signer: PublicKey;
		signerTokenAccount: PublicKey;
		paymentMint: PublicKey;
		tokenProgram: PublicKey;
	}): BarnMethod {
		return BarnMethods.settleGrantMilestone(this.program, args);
	}

	static createUser(
		program: Program<Barn>,
		{
			seed,
			uri,
			signer,
		}: {
			seed: string;
			uri: string;
			signer: PublicKey;
		}
	): BarnMethod {
		return program.methods.createUser(seed, uri).accounts({
			signer,
		});
	}

	static approveSponsor(
		program: Program<Barn>,
		{
			admin,
			signer,
		}: {
			admin: PublicKey;
			signer: PublicKey;
		}
	): BarnMethod {
		return program.methods.approveSponsor().accounts({
			signer,
			admin,
		});
	}

	static addProject(
		program: Program<Barn>,
		{
			uri,
			signer,
		}: {
			uri: string;
			signer: PublicKey;
		}
	): BarnMethod {
		return program.methods.addProject(uri).accounts({
			signer,
		});
	}

	static addGrantProgram(
		program: Program<Barn>,
		{
			uri,
			signer,
		}: {
			uri: string;
			signer: PublicKey;
		}
	): BarnMethod {
		return program.methods.addGrantProgram(uri).accounts({
			signer,
		});
	}

	static awardGrant(
		program: Program<Barn>,
		{
			uri,
			approvedAmount,
			grantProgram,
			project,
			paymentMint,
			signer,
		}: {
			uri: string;
			approvedAmount: BN;
			paymentMint: PublicKey;
			grantProgram: PublicKey;
			project: PublicKey;
			signer: PublicKey;
		}
	): BarnMethod {
		return program.methods.awardGrant(uri, approvedAmount).accountsPartial({
			paymentMint,
			signer,
			grantProgram,
			project,
		});
	}

	static addGrantMilestone(
		program: Program<Barn>,
		{
			uri,
			amount,
			grant,
			project,
			signer,
		}: {
			uri: string;
			amount: BN;
			grant: PublicKey;
			project: PublicKey;
			signer: PublicKey;
		}
	): BarnMethod {
		return program.methods.addGrantMilestone(uri, amount).accountsPartial({
			signer,
			project,
			grant,
		});
	}

	static reviseGrantMilestone(
		program: Program<Barn>,
		{
			uri,
			amount,
			grant,
			grantMilestone,
			signer,
		}: {
			uri: string | null;
			amount: BN | null;
			grant: PublicKey;
			grantMilestone: PublicKey;
			signer: PublicKey;
		}
	): BarnMethod {
		return program.methods
			.reviseGrantMilestone({ uri, amount })
			.accountsPartial({
				signer,
				grant,
				grantMilestone,
			});
	}

	static reviewGrantMilestone(
		program: Program<Barn>,
		{
			grant,
			grantMilestone,
			signer,
		}: {
			grant: PublicKey;
			grantMilestone: PublicKey;
			signer: PublicKey;
		}
	): BarnMethod {
		return program.methods.reviewGrantMilestone().accountsPartial({
			signer,
			grant,
			grantMilestone,
		});
	}

	static acceptGrantMilestone(
		program: Program<Barn>,
		{
			grant,
			grantMilestone,
			signer,
		}: {
			grant: PublicKey;
			grantMilestone: PublicKey;
			signer: PublicKey;
		}
	): BarnMethod {
		return program.methods.acceptGrantMilestone().accountsPartial({
			signer,
			grant,
			grantMilestone,
		});
	}

	static rejectGrantMilestone(
		program: Program<Barn>,
		{
			grant,
			grantMilestone,
			signer,
		}: {
			grant: PublicKey;
			grantMilestone: PublicKey;
			signer: PublicKey;
		}
	): BarnMethod {
		return program.methods.rejectGrantMilestone().accountsPartial({
			signer,
			grant,
			grantMilestone,
		});
	}

	static settleGrantMilestone(
		program: Program<Barn>,
		{
			grant,
			grantMilestone,
			signer,
			signerTokenAccount,
			paymentMint,
			to,
			tokenProgram,
		}: {
			grant: PublicKey;
			grantMilestone: PublicKey;
			to: PublicKey;
			signer: PublicKey;
			signerTokenAccount: PublicKey;
			paymentMint: PublicKey;
			tokenProgram: PublicKey;
		}
	): BarnMethod {
		return program.methods.settleGrantMilestone().accountsPartial({
			to,
			signer,
			grant,
			grantMilestone,
			signerTokenAccount,
			paymentMint,
			tokenProgram,
		});
	}
}

export interface BarnMethod {
	rpc: (config?: ConfirmOptions) => Promise<string>;
	transaction: () => Promise<Transaction>;
	instruction: () => Promise<TransactionInstruction>;
}

export interface IBarnMethods<T> {
	createUser(args: {
		seed: string;
		uri: string;
		signer: PublicKey;
	}): Promise<T>;

	approveSponsor(args: { admin: PublicKey; signer: PublicKey }): Promise<T>;

	addProject(args: { uri: string; signer: PublicKey }): Promise<T>;

	addGrantProgram(args: { uri: string; signer: PublicKey }): Promise<T>;

	awardGrant(args: {
		uri: string;
		approvedAmount: BN;
		paymentMint: PublicKey;
		grantProgram: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): Promise<T>;

	addGrantMilestone(args: {
		uri: string;
		amount: BN;
		grant: PublicKey;
		project: PublicKey;
		signer: PublicKey;
	}): Promise<T>;

	reviseGrantMilestone(args: {
		uri: string | null;
		amount: BN | null;
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<T>;

	reviewGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<T>;

	acceptGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<T>;

	rejectGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		signer: PublicKey;
	}): Promise<T>;

	settleGrantMilestone(args: {
		grant: PublicKey;
		grantMilestone: PublicKey;
		to: PublicKey;
		signer: PublicKey;
		signerTokenAccount: PublicKey;
		paymentMint: PublicKey;
		tokenProgram: PublicKey;
	}): Promise<T>;
}

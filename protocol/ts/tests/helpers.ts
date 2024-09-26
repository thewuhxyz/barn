import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { Cluster, Connection, Keypair } from "@solana/web3.js";
import { BarnClient } from "../src";

export function createClient(keypair: Keypair, connection: Connection) {
	const wallet = new Wallet(keypair);
	const provider = new AnchorProvider(connection, wallet);
	return new BarnClient(provider);
}

export const sleep = (sec: number) =>
	new Promise((resolve) => setTimeout(resolve, sec * 1000));

export function generateRandomSeed(prefix?: string): string {
	const text = Keypair.generate().publicKey.toBase58().slice(0, 10);
	return prefix ? prefix + "-" + text : text;
}

export function goToExplorer(tx: string, cluster: Cluster | "custom") {
	return `https://explorer.solana.com/tx/${tx}${
		cluster === "mainnet-beta" ? "" : `?cluster=${cluster}`
	}`;
}

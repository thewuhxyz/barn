"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cluster } from "@solana/web3.js";

export function GoToExplorer({
	tx,
	cluster,
}: {
	tx: string;
	cluster: Cluster | "custom";
}) {
	const explorer = `https://explorer.solana.com/tx/${tx}?cluster=${cluster}`;
	return (
		<a href={explorer} className={cn(buttonVariants({ size: "sm" }))}>
			See Explorer
		</a>
	);
}

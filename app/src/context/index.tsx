"use client";

import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React, {
	CSSProperties,
	MouseEvent,
	PropsWithChildren,
	ReactElement,
} from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";

const queryClient = new QueryClient();

export function QueryContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export function WalletContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const endpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT!;

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={[]} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
}

export function UIProvider({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Toaster />
			{children}
		</>
	);
}

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryContextProvider>
			<WalletContextProvider>
				<UIProvider>{children}</UIProvider>
			</WalletContextProvider>
		</QueryContextProvider>
	);
}

export const WalletButton = dynamic(
	async () =>
		(await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
	{ ssr: false }
);

export type ButtonProps = PropsWithChildren<{
	className?: string;
	disabled?: boolean;
	endIcon?: ReactElement;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	startIcon?: ReactElement;
	style?: CSSProperties;
	tabIndex?: number;
}>;

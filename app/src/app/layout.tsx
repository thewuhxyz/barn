import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers, WalletButton } from "@/context";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Barn",
	description: "Solana Grants Manager",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<main className="mx-auto max-w-6xl p-2 min-h-screen flex flex-col">
						<header className="mx-auto flex w-full max-w-6xl justify-between py-4 pb-16">
							<Link href="/">
								<p className="text-3xl cursor-default">OG|</p>
							</Link>
							<nav className="flex space-x-8 items-center text-sm text-muted-foreground">
								<ul>
									<Link href="/project">
										<p className="cursor-default hover:text-primary">
											Project
										</p>
									</Link>
								</ul>
								<ul>
									<Link href="/program">
										<p className="cursor-default hover:text-primary">
											Grant Program
										</p>
									</Link>
								</ul>
								<ul>
									<Link href="/profile">
										<p className="cursor-default hover:text-primary">My Profile</p>
									</Link>
								</ul>
								<ul>
									<Link href="/admin">
										<p className="cursor-default hover:text-primary">Admin</p>
									</Link>
								</ul>
							</nav>
							<WalletButton />
						</header>
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
}

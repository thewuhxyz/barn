import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { useBarnAccount, useBarnGrantProgram } from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function AllGrantPrograms() {
	const { allGrantPrograms } = useBarnAccount();
	if (!allGrantPrograms) return <></>;
	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			{allGrantPrograms.map(({ publicKey }, i) => (
				<GrantProgramCardFromPubkey
					key={i}
					publicKey={publicKey}
				></GrantProgramCardFromPubkey>
			))}
		</div>
	);
}

export function GrantProgramCardFromPubkey({
	publicKey,
}: {
	publicKey: PublicKey;
}) {
	const { authority, profile, grantProgram, grantProgramUri } =
		useBarnGrantProgram(publicKey.toBase58());

	if (!grantProgram || !authority || !profile) {
		return <></>;
	}

	const props: GrantProgramCardProps = {
		publicKey: grantProgram.key.toBase58(),
		description: grantProgramUri?.description ?? "No description provided",
		owner: profile.seed,
		title: grantProgramUri?.name ?? `Untitled ${grantProgram.id}`,
		count: grantProgram.count,
		profileKey: grantProgram.profile.toBase58()

	};

	return <GrantProgramCard {...props} />;
}

export function GrantProgramCard(props: GrantProgramCardProps) {
	return (
		<Card className="w-full">
			<Link href={`/program/${props.publicKey}`}>
				<CardHeader>
					<Image
						src="/next.svg"
						alt="Card image"
						width={300}
						height={300}
						className="h-full w-full object-cover"
					/>
					<div className="flex justify-between">
						<CardTitle>{props.title}</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<CardDescription>{props.description}</CardDescription>
				</CardContent>
			</Link>
			<CardFooter className="flex justify-between">
				<Link
					href={`/profile/${props.profileKey}`}
					className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
				>
					@{props.owner}
				</Link>
				<p>Grants awarded: {props.count}</p>
			</CardFooter>
		</Card>
	);
}

export type GrantProgramCardProps = {
	title: string;
	description: string;
	owner: string;
	count: number;
	publicKey: string;
	profileKey: string
};

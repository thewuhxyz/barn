import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useBarnGrantProgram } from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";

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
		description: grantProgramUri?.description ?? "No description provided",
		owner: profile.seed,
		title: grantProgramUri?.name ?? `Untitled ${grantProgram.id}`,
		count: grantProgram.count,
	};

	return <GrantProgramCard {...props} />;
}

export function GrantProgramCard(props: GrantProgramCardProps) {
	return (
		<Card className="w-full">
			<div className="">
				<Image
					src="/next.svg"
					alt="Card image"
					width={300}
					height={300}
					className="h-full w-full object-cover"
				/>
			</div>
			<div className="">
				<CardHeader>
					<div className="flex justify-between">
						<CardTitle>{props.title}</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<CardDescription>{props.description}</CardDescription>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline" size="sm">
						{props.owner}
					</Button>
					<p>Grants awarded: {props.count}</p>
				</CardFooter>
			</div>
		</Card>
	);
}

export type GrantProgramCardProps = {
	title: string;
	description: string;
	owner: string;
	count: number;
};

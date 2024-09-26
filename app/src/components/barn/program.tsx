import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { useBarnAccount, useBarnGrantProgram, useBarnUser } from "@/hooks/barn";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { AwardGrant } from "./rpc";
import { useGithubProfile } from "@/hooks/barn/uri";

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
	const { authority, profile, profileUri, grantProgram, grantProgramUri } =
		useBarnGrantProgram(publicKey.toBase58());

	const { profile: userProfile } = useBarnUser();

	const githubUser = useGithubProfile({ user: profileUri?.github || null });

	if (!grantProgram || !authority || !profile) {
		return <></>;
	}

	const props: GrantProgramCardProps = {
		publicKey: grantProgram.key,
		description: grantProgramUri?.description ?? "No description provided",
		owner: profile.seed,
		title: grantProgramUri?.name ?? `Untitled ${grantProgram.id}`,
		count: grantProgram.count,
		profileKey: grantProgram.profile.toBase58(),
		image:
			grantProgramUri?.image_url ??
			profileUri?.image_url ??
			githubUser?.avatar_url,
		userIsOwner: userProfile?.key.toBase58() === profile.key.toBase58()
	};

	return <GrantProgramCard {...props} />;
}

export function GrantProgramCard(props: GrantProgramCardProps) {
	return (
		<Card className="w-full">
			<Link href={`/program/${props.publicKey}`}>
				<CardHeader>
					<div className="w-full h-24">
						{props.image && (
							<Image
								src={props.image}
								alt={props.publicKey.toBase58()}
								width={120}
								height={120}
								className="object-cover h-24 w-24 pb-4"
							/>
						)}
					</div>
					<div className="flex justify-between">
						<CardTitle>{props.title}</CardTitle>
						<Badge>Awarded: {props.count}</Badge>
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
				{ props.userIsOwner && <AwardGrant grantProgram={props.publicKey} /> }
			</CardFooter>
		</Card>
	);
}

export type GrantProgramCardProps = {
	title: string;
	description: string;
	owner: string;
	count: number;
	publicKey: PublicKey;
	profileKey: string;
	image?: string | null;
	userIsOwner: boolean
};

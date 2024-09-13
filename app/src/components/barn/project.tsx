"use client";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useBarnRPC } from "@/hooks/barn";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";

export function CreateUserProfile() {
	const [userName, setUserName] = useState("");
	const { createUser } = useBarnRPC();
	const wallet = useAnchorWallet();

	function handleCreateUser() {
		if (!wallet) throw "wallet not connected";
		return createUser({ seed: userName, uri: "", signer: wallet.publicKey });
	}
	
	return (
		<Popover>
			<PopoverTrigger>Create User Profile</PopoverTrigger>
			<PopoverContent>
				<Input
					id="amount"
					type="number"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					className="col-span-3"
				/>
				<Button onClick={handleCreateUser}>Create</Button>
			</PopoverContent>
		</Popover>
	);
}

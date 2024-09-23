import { useQuery } from "@tanstack/react-query";
import { useBarn } from "../client";

export function useBarnAccount() {
	const barn = useBarn();

	const allGrants = useQuery({
		queryKey: ["all-grants"],
		queryFn: () => {
			return barn.account.getAllGrantAccount();
		},
	});

	const addGrantPrograms = useQuery({
		queryKey: ["all-grant-programs"],
		queryFn: () => {
			return barn.program.account.grantProgram.all();
		},
	});

	return { allGrants: allGrants.data, allGrantPrograms: addGrantPrograms.data };
}

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

	const allGrantPrograms = useQuery({
		queryKey: ["all-grant-programs"],
		queryFn: () => {
			return barn.program.account.grantProgram.all();
		},
	});
	
	const allProjects = useQuery({
		queryKey: ["all-projects"],
		queryFn: () => {
			return barn.program.account.project.all();
		},
	});

	return { allGrants: allGrants.data, allGrantPrograms: allGrantPrograms.data, allProjects: allProjects.data };
}

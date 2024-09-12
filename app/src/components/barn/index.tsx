"use client";

import { Card, CardContent, CardTitle } from "../ui/card";

export type ProjectCardProps = {};

export function ProjectCard() {
	return (
		<Card>
			<CardTitle>
				<CardTitle>ProjectTitle | "approved_amount"</CardTitle>
			</CardTitle>
			<CardContent>
        <p>Desecripttion: "description"</p>
        <p>Grant Program: "Program"</p>
        <p>Owner: "owner"</p>
        <p>Amount paid out: "amount_paid_out"</p>
      </CardContent>
		</Card>
	);
}

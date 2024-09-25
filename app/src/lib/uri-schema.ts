export type ProfileURI = {
	name?: string | null;
	bio?: string | null;
	image_url?: string | null;
	website?: string | null;
	github?: string | null;
	twitter?: string | null;
	discord?: string | null;
	telegram?: string | null;
	linkedin?: string | null;
	additional_info?: string[];
};

export type ProjectURI = {
	name?: string | null;
	description?: string | null;
	image_url?: string | null;
	objectives?: string[] | null;
	website?: string | null;
	github?: string | null;
	twitter?: string | null;
	additional_info?: string[];
};

export type GrantProgramURI = {
	name?: string | null;
	description?: string | null;
	image_url?: string | null;
	additional_info?: string[];
};

export type GrantURI = {
	name?: string | null;
	description?: string | null;
	discussion?: string | null;
	objectives?: string[];
	additional_info?: string[];
};

export type GrantMilestoneURI = {
	name?: string | null;
	description?: string | null;
	discussion?: string | null;
	pr?: string[];
	additional_info?: string[];
};

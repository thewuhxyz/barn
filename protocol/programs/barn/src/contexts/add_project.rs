use crate::{error::BarnError, state::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct AddProject<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        has_one=profile,
        seeds=[signer.key().as_ref()],
        bump,
    )]
    pub authority: Account<'info, Authority>,

    #[account(
        has_one=authority,
        constraint=profile.sponsor==false@BarnError::NotADev,
        seeds=[b"profile", profile.seed.as_bytes()],
        bump
    )]
    pub profile: Account<'info, Profile>,

    #[account(
        init,
        payer=signer,
        space=8+Project::INIT_SPACE,
        seeds=[b"project", profile.key().as_ref(), profile.count.to_le_bytes().as_ref()],
        bump
    )]
    pub project: Account<'info, Project>,

    pub system_program: Program<'info, System>,
}

impl<'info> AddProject<'info> {
    pub fn add_project(&mut self, uri: String, bumps: &AddProjectBumps) -> Result<()> {
        self.project.set_inner(Project {
            bump: bumps.project,
            profile: self.profile.key(),
            uri,
            grant: None,
            id: self.profile.count,
        });

        self.profile.add_project()
    }
}

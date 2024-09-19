use crate::{error::BarnError, state::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct AddGrantMilestone<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        has_one=profile,
        seeds=[signer.key().as_ref()],
        bump=authority.bump,
    )]
    pub authority: Account<'info, Authority>,

    #[account(
        has_one=authority,
        constraint = !profile.sponsor @ BarnError::NotADev,
        seeds=[b"profile", profile.seed.as_bytes()],
        bump=profile.bump,
    )]
    pub profile: Account<'info, Profile>,

    #[account(
        seeds=[b"project", project.profile.key().as_ref(), project.id.to_le_bytes().as_ref()],
        bump=project.bump,
        constraint=project.is_grant_by(grant.key()) @ BarnError::GrantMismatch
    )]
    pub project: Account<'info, Project>,

    #[account(
        mut,
        seeds=[b"grant", grant.program.key().as_ref(), grant.id.to_le_bytes().as_ref()],
        bump=grant.bump,
        has_one=project,
    )]
    pub grant: Account<'info, Grant>,

    #[account(
        init_if_needed,
        payer=signer,
        space=8+GrantMilestone::INIT_SPACE,
        seeds=[b"grant-milestone", grant.key().as_ref(), grant.count.to_le_bytes().as_ref()],
        bump
    )]
    pub grant_milestone: Account<'info, GrantMilestone>,

    pub system_program: Program<'info, System>,
}

impl<'info> AddGrantMilestone<'info> {
    pub fn add_milestone(
        &mut self,
        uri: String,
        amount: u64,
        bumps: &AddGrantMilestoneBumps,
    ) -> Result<()> {
        self.grant_milestone.set_inner(GrantMilestone {
            bump: bumps.grant_milestone,
            grant: self.grant.key(),
            uri,
            id: self.grant.count,
            amount,
            state: MilestoneState::InProgress,
        });

        self.grant.add_milestone()
    }
}

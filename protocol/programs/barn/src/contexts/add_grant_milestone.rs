use crate::{error::BarnError, state::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct AddGrantMilestone<'info> {
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
        constraint=!profile.sponsor@BarnError::NotADev,
        seeds=[b"profile", profile.seed.as_bytes()],
        bump
    )]
    pub profile: Account<'info, Profile>,

    #[account(
        mut,
        seeds=[b"project", project.profile.key().as_ref(), project.id.to_le_bytes().as_ref()],
        bump
    )]
    pub project: Account<'info, Project>,

    #[account(
        mut,
        seeds=[b"grant-program", profile.key().as_ref(), grant_program.id.to_le_bytes().as_ref()],
        bump
    )]
    pub grant_program: Account<'info, GrantProgram>,

    #[account(
        seeds=[b"grant", grant.program.key().as_ref(), grant_program.count.to_le_bytes().as_ref()],
        bump
    )]
    pub grant: Account<'info, Grant>,

    #[account(
        init,
        payer=signer,
        space=8+GrantMilestone::INIT_SPACE,
        seeds=[b"grant-milestone", grant.key().as_ref(), grant.active_milestone.to_le_bytes().as_ref()],
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
            id: self.grant.active_milestone,
            amount,
            // paid: false,
            state: MilestoneState::InProgress,
        });

        self.grant.add_milestone()
    }
}

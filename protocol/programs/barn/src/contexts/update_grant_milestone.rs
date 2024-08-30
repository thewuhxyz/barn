use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct UpdateGrantMilestone<'info> {
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
        seeds=[b"profile", profile.seed.as_bytes()],
        bump
    )]
    pub profile: Account<'info, Profile>,

    #[account(
        seeds=[b"grant", grant.program.as_ref(), grant.id.to_le_bytes().as_ref()],
        bump
    )]
    pub grant: Account<'info, Grant>,

    #[account(
        mut,
        seeds=[b"grant-milestone", grant.key().as_ref(), grant_milestone.id.to_le_bytes().as_ref()],
        bump
    )]
    pub grant_milestone: Account<'info, GrantMilestone>,
}

impl<'info> UpdateGrantMilestone<'info> {
    pub fn revise_milestone(&mut self, config: MilestoneRevisionConfig) -> Result<()> {
        // self.profile.require_dev()?;
        self.grant_milestone.revise(config)
    }

    pub fn review_milestone(&mut self) -> Result<()> {
        // self.profile.require_dev()?;
        self.grant_milestone.review()
    }
    
    pub fn reject_milestone(&mut self) -> Result<()> {
        self.profile.require_sponsor()?;
        self.grant_milestone.reject()
    }
    
    pub fn accept_milestone(&mut self) -> Result<()> {
        self.profile.require_sponsor()?;
        self.grant_milestone.accept()
    }
}

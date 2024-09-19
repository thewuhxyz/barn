use crate::{error::*, state::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct UpdateGrantMilestone<'info> {
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
        seeds=[b"grant", grant_program.key().as_ref(), grant.id.to_le_bytes().as_ref()], // should confirm grant_program with seed check
        bump=grant.bump,
        has_one=project @ BarnError::GrantMismatch
    )]
    pub grant: Account<'info, Grant>,

    #[account(
        seeds=[b"grant-program", grant_program.profile.key().as_ref(), grant_program.id.to_le_bytes().as_ref()],
        bump=grant_program.bump
    )]
    pub grant_program: Account<'info, GrantProgram>,

    #[account(
        mut,
        seeds=[b"grant-milestone", grant.key().as_ref(), grant_milestone.id.to_le_bytes().as_ref()],
        bump=grant_milestone.bump
    )]
    pub grant_milestone: Account<'info, GrantMilestone>,
}

impl<'info> UpdateGrantMilestone<'info> {
    pub fn edit_milestone(&mut self, config: MilestoneRevisionConfig) -> Result<()> {
        self.check_signer()?;
        self.grant_milestone.edit(config)
    }

    pub fn revise_milestone(&mut self) -> Result<()> {
        self.check_signer()?;
        self.grant_milestone.revise()
    }

    pub fn review_milestone(&mut self) -> Result<()> {
        self.check_signer()?;
        self.grant_milestone.review()
    }

    pub fn reject_milestone(&mut self) -> Result<()> {
        self.profile.require_sponsor()?;
        self.check_signer()?;
        self.grant_milestone.reject()
    }

    pub fn accept_milestone(&mut self) -> Result<()> {
        self.profile.require_sponsor()?;
        self.check_signer()?;
        self.grant_milestone.accept()
    }

    fn check_signer(&self) -> Result<()> {
        if self.profile.sponsor {
            require_keys_eq!(
                self.grant_program.profile,
                self.profile.key(),
                BarnError::ProfileMismatch
            )
        } else {
            require_keys_eq!(
                self.project.profile,
                self.profile.key(),
                BarnError::ProfileMismatch
            )
        }
        Ok(())
    }
}

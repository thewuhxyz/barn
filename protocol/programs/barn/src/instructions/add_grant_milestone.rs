use crate::{error::BarnError, state::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(seed: String)]
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
        constraint=profile.sponsor==false@BarnError::NotADev,
        seeds=[b"profile", seed.as_bytes()],
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
    pub fn award_grant(
        &mut self,
        uri: String,
        approved_amount: u64,
        bumps: &AddGrantMilestoneBumps,
    ) -> Result<()> {
        // self.grant.set_inner(GrantMilestone {
        //     bump: bumps.grant,
        //     program: self.grant_program.key(),
        //     project: self.project.key(),
        //     uri,
        //     id: self.grant_program.count,
        //     payment_mint: self.payment_mint.key(),
        //     approved_amount,
        //     paid_out: 0,
        // });

        self.grant_program.add_grant()?;
        
        self.project.receive_grant(&self.grant.key())
    }
}

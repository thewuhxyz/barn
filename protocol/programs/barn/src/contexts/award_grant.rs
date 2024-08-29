use crate::{error::BarnError, state::*};
use anchor_lang::prelude::*;
use anchor_spl::token_interface::Mint;

#[derive(Accounts)]
pub struct AwardGrant<'info> {
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
        constraint=profile.sponsor==true@BarnError::NotASponsor,
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
        init,
        payer=signer,
        space=8+Grant::INIT_SPACE,
        seeds=[b"grant", grant_program.key().as_ref(), grant_program.count.to_le_bytes().as_ref()],
        bump
    )]
    pub grant: Account<'info, Grant>,

    pub payment_mint: InterfaceAccount<'info, Mint>,

    pub system_program: Program<'info, System>,
}

impl<'info> AwardGrant<'info> {
    pub fn award_grant(
        &mut self,
        uri: String,
        approved_amount: u64,
        bumps: &AwardGrantBumps,
    ) -> Result<()> {
        self.grant.set_inner(Grant {
            bump: bumps.grant,
            program: self.grant_program.key(),
            project: self.project.key(),
            uri,
            id: self.grant_program.count,
            active_milestone: 0,
            payment_mint: self.payment_mint.key(),
            approved_amount,
            paid_out: 0,
        });

        self.grant_program.add_grant()?;
        
        self.project.receive_grant(&self.grant.key())
    }
}

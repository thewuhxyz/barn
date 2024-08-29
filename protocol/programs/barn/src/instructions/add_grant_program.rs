use crate::{error::BarnError, state::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct AddGrantProgram<'info> {
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
        init,
        payer=signer,
        space=8+GrantProgram::INIT_SPACE,
        seeds=[b"grant-program", profile.key().as_ref(), profile.count.to_le_bytes().as_ref()],
        bump
    )]
    pub grant_program: Account<'info, GrantProgram>,

    pub system_program: Program<'info, System>,
}

impl<'info> AddGrantProgram<'info> {
    pub fn add_project(&mut self, uri: String, bumps: &AddGrantProgramBumps) -> Result<()> {
        self.grant_program.set_inner(GrantProgram {
            bump: bumps.grant_program,
            profile: self.profile.key(),
            uri,
            id: self.profile.count,
            count: 0,
        });

        self.profile.add_grant_program()
    }
}

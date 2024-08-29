use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct ResetProfileAuthority<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    /// CHECK: old signer
    pub signer: UncheckedAccount<'info>,

    /// CHECK: new signer
    pub new_signer: UncheckedAccount<'info>,

    #[account(
        mut,
        close=admin,
        has_one=profile,
        seeds=[signer.key().as_ref()],
        bump=authority.bump,
    )]
    pub authority: Account<'info, Authority>,

    #[account(
        init_if_needed,
        payer=admin,
        space=8+Authority::INIT_SPACE,
        seeds=[new_signer.key().as_ref()],
        bump,
    )]
    pub new_authority: Account<'info, Authority>,

    #[account(
        has_one=authority,
        seeds=[b"profile", profile.seed.as_bytes()],
        bump,
    )]
    pub profile: Account<'info, Profile>,

    pub system_program: Program<'info, System>,
}

impl<'info> ResetProfileAuthority<'info> {
    pub fn reset_profile_authority(&mut self, bumps: &ResetProfileAuthorityBumps) -> Result<()> {
        self.authority.set_inner(Authority {
            bump: bumps.new_authority,
            profile: self.profile.key(),
            signer: self.new_signer.key(),
        });

        self.profile
            .change_authority(&self.authority.key(), &self.new_authority.key())
    }
}

use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct ApproveSponsor<'info> {
    pub admin: Signer<'info>,
    
    /// CHECK: signer
    pub signer: UncheckedAccount<'info>,

    #[account(
        seeds=[signer.key().as_ref()],
        bump=authority.bump,
    )]
    pub authority: Account<'info, Authority>,

    #[account(
        seeds=[b"profile", profile.seed.as_bytes()],
        bump
    )]
    pub profile: Account<'info, Profile>,
}

impl<'info> ApproveSponsor<'info> {
    pub fn approve_sponsor(&mut self) -> Result<()> {
        self.profile.approve_sponsor()
    }
}

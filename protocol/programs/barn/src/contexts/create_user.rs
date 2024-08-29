use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(seed: String)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        payer=signer,
        space=8+Authority::INIT_SPACE,
        seeds=[signer.key().as_ref()],
        bump,
    )]
    pub authority: Account<'info, Authority>,

    #[account(
        init,
        payer=signer,
        space=8+Profile::INIT_SPACE,
        seeds=[b"profile", seed.as_bytes()],
        bump
    )]
    pub profile: Account<'info, Profile>,

    pub system_program: Program<'info, System>,
}

impl<'info> CreateUser<'info> {
    pub fn create_user(&mut self, seed: String, uri: String, bumps: &CreateUserBumps) -> Result<()> {
        self.authority.set_inner(Authority {
            bump: bumps.authority,
            profile: self.profile.key(),
            signer: self.signer.key(),
        });
        
        self.profile.set_inner(Profile {
            bump: bumps.profile,
            authority: self.authority.key(),
            count: 0,
            seed,
            uri,
            sponsor: false
        });
        Ok(())
    }
}

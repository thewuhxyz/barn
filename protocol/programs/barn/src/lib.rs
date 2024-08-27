pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("9r5mFwaKhxmyp6iBQeo3fHXP2J1bGneySwyLmvSq1Ggd");

#[program]
pub mod demo_program {

    use super::*;

    pub fn create_user(ctx: Context<CreateUser>, seed: String, uri: String) -> Result<()> {
        ctx.accounts.create_user(seed, uri, &ctx.bumps)
    }
    
    pub fn approve_sponsor(ctx: Context<ApproveSponsor>) -> Result<()> {
        ctx.accounts.approve_sponsor()
    }

    pub fn reset_profile_authority(ctx: Context<ResetProfileAuthority>) -> Result<()> {
        ctx.accounts.reset_profile_authority(&ctx.bumps)
    }
}

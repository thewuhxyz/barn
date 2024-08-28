pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("9r5mFwaKhxmyp6iBQeo3fHXP2J1bGneySwyLmvSq1Ggd");

#[program]
pub mod barn {

    use super::*;

    pub fn create_user(ctx: Context<CreateUser>, seed: String, uri: String) -> Result<()> {
        ctx.accounts.create_user(seed, uri, &ctx.bumps)
    }
    
    pub fn add_project(ctx: Context<AddProject>, uri: String) -> Result<()> {
        ctx.accounts.add_project(uri, &ctx.bumps)
    }

    pub fn award_grant(ctx: Context<AwardGrant>, uri: String, approved_amount: u64) -> Result<()> {
        ctx.accounts.award_grant(uri, approved_amount, &ctx.bumps)
    }
    
    pub fn approve_sponsor(ctx: Context<ApproveSponsor>) -> Result<()> {
        ctx.accounts.approve_sponsor()
    }

    // pub fn reset_profile_authority(ctx: Context<ResetProfileAuthority>) -> Result<()> {
    //     ctx.accounts.reset_profile_authority(&ctx.bumps)
    // }
}

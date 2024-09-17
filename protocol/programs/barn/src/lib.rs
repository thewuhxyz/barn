pub mod constants;
pub mod error;
pub mod contexts;
pub mod state;

use anchor_lang::prelude::*;
use contexts::*;
use state::*;

declare_id!("Aoofv5iGzdDeyySpT9QsiFaK7Db7SKyycb7nTEU1oTYE");

#[program]
pub mod barn {
    use super::*;

    pub fn create_user(ctx: Context<CreateUser>, seed: String, uri: String) -> Result<()> {
        ctx.accounts.create_user(seed, uri, &ctx.bumps)
    }

    pub fn add_project(ctx: Context<AddProject>, uri: String) -> Result<()> {
        ctx.accounts.add_project(uri, &ctx.bumps)
    }

    pub fn add_grant_program(ctx: Context<AddGrantProgram>, uri: String) -> Result<()> {
        ctx.accounts.add_grant_program(uri,  &ctx.bumps)
    }

    pub fn award_grant(ctx: Context<AwardGrant>, uri: String, approved_amount: u64) -> Result<()> {
        ctx.accounts.award_grant(uri, approved_amount, &ctx.bumps)
    }

    pub fn add_grant_milestone(
        ctx: Context<AddGrantMilestone>,
        uri: String,
        amount: u64,
    ) -> Result<()> {
        ctx.accounts.add_milestone(uri, amount, &ctx.bumps)
    }

    pub fn edit_grant_milestone(
        ctx: Context<UpdateGrantMilestone>,
        config: MilestoneRevisionConfig,
    ) -> Result<()> {
        ctx.accounts.edit_milestone(config)
    }

    pub fn revise_grant_milestone(ctx: Context<UpdateGrantMilestone>) -> Result<()> {
        ctx.accounts.revise_milestone()
    }

    pub fn review_grant_milestone(ctx: Context<UpdateGrantMilestone>) -> Result<()> {
        ctx.accounts.review_milestone()
    }

    pub fn reject_grant_milestone(ctx: Context<UpdateGrantMilestone>) -> Result<()> {
        ctx.accounts.accept_milestone()
    }

    pub fn accept_grant_milestone(ctx: Context<UpdateGrantMilestone>) -> Result<()> {
        ctx.accounts.accept_milestone()
    }
    
    pub fn settle_grant_milestone(ctx: Context<SettleGrantMilestone>) -> Result<()> {
        ctx.accounts.settle_milestone()?;
        ctx.accounts.pay_out()
    }

    pub fn approve_sponsor(ctx: Context<ApproveSponsor>) -> Result<()> {
        ctx.accounts.approve_sponsor()
    }

    // pub fn reset_profile_authority(ctx: Context<ResetProfileAuthority>) -> Result<()> {
    //     ctx.accounts.reset_profile_authority(&ctx.bumps)
    // }
}

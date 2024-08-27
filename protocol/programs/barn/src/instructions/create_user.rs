use crate::constants::*;
use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CreateUser<'info> {
    pub system_program: Program<'info, System>
}

pub fn create_user(ctx: Context<CreateUser>) -> Result<()> {
    Ok(())
}

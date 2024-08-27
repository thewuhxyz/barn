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

    pub fn create_user(ctx: Context<CreateUser>) -> Result<()> {
        instructions::create_user(ctx)
    }
}

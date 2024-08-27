use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Authority {
    pub signer: Pubkey,
    pub profile: Pubkey,
}

#[account]
#[derive(InitSpace)]
pub struct Profile {
    pub authority: Pubkey,
    #[max_len(50)]
    pub uri: String,
    #[max_len(32)]
    pub seed: Vec<u8>,
    pub sponsor: bool,
    pub count: u32,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct GrantProgram {
    pub profile: Pubkey,
    #[max_len(50)]
    pub uri: String,
    pub id: u32,
    pub count: u32,
    pub bump: u8
}

#[account]
#[derive(InitSpace)]
pub struct Grant {
    pub project: Pubkey,
    pub program: Pubkey,
    pub id: u32,
    #[max_len(50)]
    pub uri: String,
    pub payment_mint: Pubkey,
    pub approved_amount: u64,
    pub paid_out: u64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Project {
    pub profile: Pubkey,
    pub grant: Option<Pubkey>,
    pub id: u32,
    #[max_len(50)]
    pub uri: String,
    pub bump: u8,
}
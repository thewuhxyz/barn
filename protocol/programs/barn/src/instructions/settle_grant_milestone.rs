use crate::state::*;
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, Mint, TokenAccount, TokenInterface, TransferChecked},
};

#[derive(Accounts)]
pub struct SettleGrantMilestone<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    /// CHECK: dev
    #[account(mut)]
    pub to: AccountInfo<'info>,

    #[account(
        has_one=profile,
        seeds=[signer.key().as_ref()],
        bump,
    )]
    pub authority: Account<'info, Authority>,

    #[account(
        has_one=authority,
        seeds=[b"profile", profile.seed.as_bytes()],
        bump=profile.bump,
    )]
    pub profile: Account<'info, Profile>,

    #[account(
        mut,
        seeds=[b"grant", grant.program.as_ref(), grant.id.to_le_bytes().as_ref()],
        bump=grant.bump,
        has_one=payment_mint,
    )]
    pub grant: Account<'info, Grant>,

    #[account(
        mut,
        seeds=[b"grant-milestone", grant.key().as_ref(), grant.active_milestone.to_le_bytes().as_ref()],
        bump=grant_milestone.bump,
    )]
    pub grant_milestone: Account<'info, GrantMilestone>,

    #[account(
        mut,
        associated_token::authority=signer,
        associated_token::mint=payment_mint,
        associated_token::token_program=token_program
    )]
    pub signer_token_account: InterfaceAccount<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer=signer,
        associated_token::authority=to,
        associated_token::mint=payment_mint,
        associated_token::token_program=token_program
    )]
    pub to_token_account: InterfaceAccount<'info, TokenAccount>,

    pub payment_mint: InterfaceAccount<'info, Mint>,

    pub token_program: Interface<'info, TokenInterface>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub system_program: Program<'info, System>,
}

impl<'info> SettleGrantMilestone<'info> {
    pub fn settle_milestone(&mut self) -> Result<()> {
        self.profile.require_sponsor()?;
        self.grant.settle_milestone(self.grant_milestone.amount)?;
        self.grant_milestone.settle()
    }

    pub fn pay_out(&mut self) -> Result<()> {
        let cpi_accounts = TransferChecked {
            authority: self.signer.to_account_info(),
            from: self.signer.to_account_info(),
            to: self.signer.to_account_info(),
            mint: self.signer.to_account_info(),
        };

        let _cpi_program = self.token_program.to_account_info();

        let cpi_ctx = CpiContext::new(self.token_program.to_account_info(), cpi_accounts);

        transfer_checked(
            cpi_ctx,
            self.grant_milestone.amount,
            self.payment_mint.decimals,
        )
    }
}

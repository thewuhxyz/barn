use anchor_lang::prelude::*;

#[error_code]
pub enum BarnError {
    #[msg("Authority does not match")]
    AuthorityMismatch
}
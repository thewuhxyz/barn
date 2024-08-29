use anchor_lang::prelude::*;

#[error_code]
pub enum BarnError {
    #[msg("Authority does not match")]
    AuthorityMismatch,
    
    #[msg("Not A Sponsor")]
    NotASponsor,
    
    #[msg("Not A Dev")]
    NotADev,
    
    #[msg("Dev profile cannot be sponsor. Projects already exists for Dev profile")]
    ProfileCannotBeSponsor,
    
    #[msg("Grant already awarded to project")]
    GrantAlreadyAwarded,
    
    #[msg("Milestone already confirmed")]
    MilestoneAlreadyConfirmed,
    
    #[msg("Milestone not confirmed")]
    MilestoneNotConfirmed,
    
    #[msg("Milestone not accepted")]
    MilestoneNotAccepted,
    
    #[msg("Milestone already paid")]
    MilestoneAlreadyPaid,
    
    #[msg("Overflow occured")]
    OverflowOccured,
    
    #[msg("Approved amount exceeded")]
    ApprovedAmountExceeded,
}
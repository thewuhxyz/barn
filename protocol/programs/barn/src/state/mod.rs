use crate::error::BarnError;
use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Authority {
    pub signer: Pubkey,
    pub profile: Pubkey,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Profile {
    pub authority: Pubkey,
    #[max_len(50)]
    pub uri: String,
    #[max_len(32)]
    pub seed: String,
    pub sponsor: bool,
    pub count: u32,
    pub bump: u8,
}

impl Profile {
    pub fn approve_sponsor(&mut self) -> Result<()> {
        require_eq!(self.count, 0, BarnError::ProfileCannotBeSponsor);
        self.sponsor = true;
        Ok(())
    }

    pub fn change_authority(
        &mut self,
        current_authority: &Pubkey,
        new_authority: &Pubkey,
    ) -> Result<()> {
        require_keys_eq!(
            self.authority,
            current_authority.key(),
            BarnError::AuthorityMismatch
        );
        self.authority = new_authority.key();
        Ok(())
    }

    pub fn add_project(&mut self) -> Result<()> {
        self.require_dev()?;
        self.count = self
            .count
            .checked_add(1)
            .ok_or(BarnError::OverflowOccured)?;
        Ok(())
    }

    pub fn add_grant_program(&mut self) -> Result<()> {
        self.require_sponsor()?;
        self.count = self
            .count
            .checked_add(1)
            .ok_or(BarnError::OverflowOccured)?;
        Ok(())
    }

    pub fn require_dev(&self) -> Result<()> {
        require_eq!(self.sponsor, false, BarnError::NotADev);
        Ok(())
    }

    pub fn require_sponsor(&self) -> Result<()> {
        require_eq!(self.sponsor, true, BarnError::NotASponsor);
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct GrantProgram {
    pub profile: Pubkey,
    #[max_len(50)]
    pub uri: String,
    pub id: u32,
    pub count: u32,
    pub bump: u8,
}

impl GrantProgram {
    pub fn add_grant(&mut self) -> Result<()> {
        self.count = self
            .count
            .checked_add(1)
            .ok_or(BarnError::OverflowOccured)?;
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct Grant {
    pub project: Pubkey,
    pub program: Pubkey,
    pub id: u32,
    pub count: u32,
    #[max_len(50)]
    pub uri: String,
    pub payment_mint: Pubkey,
    pub approved_amount: u64,
    pub paid_out: u64,
    pub bump: u8,
}

impl Grant {
    pub fn add_milestone(&mut self) -> Result<()> {
        self.count = self
            .count
            .checked_add(1)
            .ok_or(BarnError::OverflowOccured)?;
        Ok(())
    }

    pub fn settle_milestone(&mut self, amount: u64) -> Result<()> {
        let paid_out = self
            .paid_out
            .checked_add(amount)
            .ok_or(BarnError::OverflowOccured)?;

        require_gte!(
            self.approved_amount,
            paid_out,
            BarnError::ApprovedAmountExceeded
        );

        self.paid_out = paid_out;
        Ok(())
    }
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

impl Project {
    pub fn receive_grant(&mut self, grant: &Pubkey) -> Result<()> {
        require!(self.grant.is_none(), BarnError::GrantAlreadyAwarded);
        self.grant = Some(grant.key());
        Ok(())
    }

    pub fn is_grant_by(&self, grant: Pubkey) -> bool {
        self.grant.is_some_and(|g| g == grant)
    }
}

#[account]
#[derive(InitSpace)]
pub struct GrantMilestone {
    pub grant: Pubkey,
    pub id: u32,
    pub amount: u64,
    #[max_len(50)] // todo: Adjust max lenght
    pub uri: String,
    pub state: MilestoneState, // todo: u8
    pub bump: u8,
}

impl GrantMilestone {
    pub fn edit(&mut self, config: MilestoneRevisionConfig) -> Result<()> {
        require!(
            !self.state.confirmed(),
            BarnError::MilestoneAlreadyConfirmed
        );
        if let Some(amount) = config.amount {
            self.amount = amount
        }
        if let Some(uri) = config.uri {
            self.uri = uri
        }
        Ok(())
    }

    pub fn revise(&mut self) -> Result<()> {
        require!(
            !self.state.confirmed(),
            BarnError::MilestoneAlreadyConfirmed
        );

        self.state = MilestoneState::InProgress;
        Ok(())
    }

    pub fn review(&mut self) -> Result<()> {
        require!(
            !self.state.confirmed(),
            BarnError::MilestoneAlreadyConfirmed
        );

        self.state = MilestoneState::InReview;
        Ok(())
    }

    pub fn reject(&mut self) -> Result<()> {
        require!(
            !self.state.confirmed(),
            BarnError::MilestoneAlreadyConfirmed
        );
        self.state = MilestoneState::Rejected;
        Ok(())
    }

    pub fn accept(&mut self) -> Result<()> {
        require!(
            !self.state.confirmed(),
            BarnError::MilestoneAlreadyConfirmed
        );
        self.state = MilestoneState::Accepted;
        Ok(())
    }

    pub fn settle(&mut self) -> Result<()> {
        // make sure it is not rejected already
        require!(self.is_accepted(), BarnError::MilestoneNotAccepted);
        // // make sure it is not paid already
        // require!(self.is_paid(), BarnError::MilestoneAlreadyPaid);
        // // make sure it is accepted
        // require!(self.state.confirmed(), BarnError::MilestoneNotConfirmed);

        self.state = MilestoneState::Paid;
        Ok(())
    }

    pub fn is_paid(&self) -> bool {
        self.state.paid()
    }

    pub fn is_rejected(&self) -> bool {
        self.state.rejected()
    }

    pub fn is_accepted(&self) -> bool {
        self.state.accepted()
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, InitSpace, Clone, PartialEq, Eq)]
pub enum MilestoneState {
    InProgress,
    InReview,
    Rejected,
    Accepted,
    Paid,
}

impl MilestoneState {
    pub fn confirmed(&self) -> bool {
        self == &MilestoneState::Rejected
            || self == &MilestoneState::Accepted
            || self == &MilestoneState::Paid
    }

    pub fn paid(&self) -> bool {
        self == &MilestoneState::Paid
    }

    pub fn rejected(&self) -> bool {
        self == &MilestoneState::Rejected
    }

    pub fn accepted(&self) -> bool {
        self == &MilestoneState::Accepted
    }
}

#[derive(AnchorDeserialize, AnchorSerialize, Clone)]
pub struct MilestoneRevisionConfig {
    pub amount: Option<u64>,
    pub uri: Option<String>,
}

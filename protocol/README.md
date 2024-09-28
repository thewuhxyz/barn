# OpenFunds Protocol

![program-architecture](/program-architecture.svg)

## Account Breakdown

- `Profile`: This is the “user account”. Hold the data for a particular user.

  - `sponsor: bool` which if true, indicates a user is a “sponsor” or else a “developer”
  - `count: u32` used for the PDAs and Ids of `GrantProgram` and `Project` for “sponsor” and “developer” respectively.

- `Authority`: Primarily associates a wallet `signer` with a `Profile`. This is useful because the `Profile` is not associated with the wallet `signer` via PDA.

- `Project`: Hold a Developer’s project data.

- `GrantProgram`: Holds a Sponsor’s grant program data.

  - `count: u32` used for the PDAs and Ids of `Grant`

- `Grant`: Hold the details of the grant awarded to a project by a sponsor.

  - Associates a `Project` with a `GrantProgram`.
  - `count: u32` used for the PDAs and Ids of `GrantMilestone`

- `GrantMilestone`: Holds the data of a milestone associated with a `Grant`
  - `state: MilestoneState` represents the state of the milestone. `InProgress`, `InReview`, `Rejected` , `Accepted` , `Paid`

## Instruction Breakdown

- `create_user`: Creates a User `Profile` , and `Authority`

  - all new `Profile` is a “developer” by default.

- `approve_sponsor`: DAO approves a `Profile` request to become a “sponsor”.

- `add_project` : Creates a new `Project` for the Developer.

- `add_grant_program` : Creates a new `GrantProgram` for the Sponsor.

- `award_grant`: Creates a new `Grant`

  - Associates a `GrantProgram` with a `Project`
  - Associated a Sponsor with a Developer.

- `add_milestone` : Creates a new `GrantMilestone` associated with a `Grant`

- `edit_milestone` : Updates a `GrantMilestone` data

- `revise_milestone` , `review_milestone` , `reject_milestone`, `accept_milestone` : Updates `GrantMilestone` state.

- `settle_grant_milestone` : Settles `GrantMilestone` payment after `GrantMilestone` has been accepted

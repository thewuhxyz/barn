# OpenGrants

OpenGrants is an open infrastructure for managing grants and funding on-chain.

### Roadmap

[OpenGrants Objectives](/TODO.md).

<br/>

# How it works

OpenGrants runs entirely on its on-chain program, which makes it truely open to everyone. [Protocol Breakdown](/protocol/README.md).

Program ID: Aoofv5iGzdDeyySpT9QsiFaK7Db7SKyycb7nTEU1oTYE

<br/>

# User Profile

There is two `Profile`s associated with OpenGrants.

- `Sponsor` - grants funding.
- `Developer` - receives funding.

### Creating a Profile

To create a `Profile`, you need to include a URI pointing to the metadata of the Profile following the Profile URI specification [here](#profile-specification). Every `Profile` created is a `Developer` by default. Becoming a `Sponsor` will require approval by the DAO.

<br/>

# Project

A `Developer` can register a `Project` that represents what they are working on. Every `Project` is eligible for funding.

### Creating a Project

To create a `Project`, you need to include a URI pointing to the metadata of the Project. See URI specification [here](#project-specification)

<br/>

# Grant

OpenGrants protocol can be used for managing grants. A Project can receive a grant through a Grant Program owned by a sponsor.

### Creating a Grant Program

A Grant Program is created by a Sponsor. This helps the Sponsor organise the type of grants awarded to Projects

To create a Grant Program, you need to include a URI pointing to the metadata of the Grant Program. See URI specification [here](#grantprogram-specification)

### Awarding a Grant

A Grant is awarded by a Sponsor to a Project under a Grant Program. A Grant needs to be provided:

- A URI that point to the metadata about the Grant. See Grant spec [here](#grant-specification)
- The amount of specified token to be awarded

### Setting a Grant Milestone

Either the Developer or Sponsor can settle a Milestone for an awarded grant. For every milestone achieved by the Developer, the approved amount associated with the success of that milestone will be release from Sponsor to the Developer.

To set a milestone, you need:

- The URI for the associated Milestone. See specification [here](#grantmilestone-specification).
- The approved amount of token to be released on completion of said milestone.

### Updating a Grant Milestone

A Milestone will be in one of the following 5 states at every point in time:

- `in-progress`: Developer is still working on the project. The details of the milestone can only be edit at this stage.
- `in-review`: Developer is done working on the project, and waiting for the verdict of the sponsor.
- `rejected`: Sponsor rejected the milestone.
- `accepted`: Sponsor accepted the milestone.
- `paid`: Sponsor paid out the approved amount to the Developer.

A few things to note:

- When the milestone is `in-review`, either the Developer or the Sponsor can reset the milestone status back to `in-progress` so when the Developer needs to do more work.
- `rejected` and `paid` are final states. They cannot be undone unlike `in-review` and `in-progress` .
- `accepted` state only ever moves to `paid` state once the milestone payment has been settled

<br/>

# URI JSON Specifications

The following is the JSON schema specification that each account type must adhere to:

<br/>

## `Profile` Specification

```json
{
	"type": "object",
	"properties": {
		"name": {
			"type": "string",
			"required": true
		},
		"bio": {
			"type": "string"
		},
		"image_url": {
			"type": "string"
		},
		"website": {
			"type": "string"
		},
		"github": {
			"type": "string"
		},
		"twitter": {
			"type": "string"
		},
		"discord": {
			"type": "string"
		},
		"telegram": {
			"type": "string"
		},
		"linkedin": {
			"type": "string"
		},
		"additional_info": {
			"type": "array",
			"items": {
				"type": "string"
			}
		}
	}
}
```

- `name`: This is the name of the user.
- `bio`: A short bio of the user.
- `image_url` : image url for the user profile.: https://some.image.png
- `website`: the user’s personal website. example: https://thewuh.xyz
- `github`: the github username of the user. NOT the full url. e.g: thewuhxyz
- `twitter`: the twitter username of the user. NOT the full url e.g \_thewuh
- `additional_info` : Any additional info

<br/>

## `Project` Specification

```json
{
  "type":"object",
  "properties":{
    "name":{
      "type":"string",
      "required":true
    },
    "description":{
      "type":"string",
      "required":true
    },
    "image_url":{
      "type": "string",
    },
    "discussion":{
      "type": "string",
    },
    "objectives": {
		  "type": "array",
		  "items": {
			  "type": "string"
		  }
	  }
    "website":{
      "type": "string",
    },
    "github": {
	    "type": "string",
	  },
	  "twitter": {
		  "type": "string",
	  },
	  "additional_info": {
		  "type": "array",
		  "items": {
			  "type": "string"
		  }
	  }

  }
}
```

- `name`: This is the name of the project.
- `description`: A description of the project.
- `image_url` : image url for the project.: https://some.image.png
- `discussion` : url to where discussion is happening. Recommended to use Github discussion associated with the project
- `objectives` : Item-able objectives to achieve with the project
- `website`: the project’s website. example: https://OpenGrants.thewuh.xyz
- `github`: the GitHub repo name of the project. NOT the full url. e.g: thewuhxyz/barn
- `twitter`: the twitter username of the user. NOT the full url e.g OpenGrantsonsol
- `additional_info` : Any additional info

<br/>

## `GrantProgram` Specification

```json
{
	"type": "object",
	"properties": {
		"name": {
			"type": "string",
			"required": true
		},
		"description": {
			"type": "string",
			"required": true
		},
		"image_url": {
			"type": "number"
		},
		"additional_info": {
			"type": "array",
			"items": {
				"type": "string"
			}
		}
	}
}
```

- `name`: This is the name of the project.
- `description`: A description of the project.
- `image_url` : image url for the project.: https://some.image.png
- `additional_info` : Any additional info

<br/>

## `Grant` Specification

```json
{
  "type":"object",
  "properties":{
    "name":{
      "type":"string",
      "required":true
    },
    "description":{
      "type":"string",
      "required":true
    },
    "discussion":{
      "type": "string",
    },
    "objectives": {
		  "type": "array",
		  "items": {
			  "type": "string"
		  }
	  }
	  "additional_info": {
		  "type": "array",
		  "items": {
			  "type": "string"
		  }
	  }

  }
}
```

- `name`: This is the name of the grant.
- `description`: A description of the grant.
- `discussion` : url to where discussion is happening. Recommended to use Github discussion associated with the project
- `objectives` : Itemable objectives to achieve with the grant.
- `additional_info` : Any additional info

<br/>

## `GrantMilestone` Specification

```json
{
  "type":"object",
  "properties":{
    "name":{
      "type":"string",
      "required":true
    },
    "description":{
      "type":"string",
      "required":true
    },
    "discussion":{
      "type": "string",
    },
    "objectives": {
		  "type": "array",
		  "items": {
			  "type": "string"
		  }
	  }
	  "additional_info": {
		  "type": "array",
		  "items": {
			  "type": "string"
		  }
	  }

  }
}
```

- `name`: This is the name of the project.
- `description`: A description of the project.
- `discussion` : url to where discussion is happening. Recommended to use Github discussion associated with the project
- `objectives` : Item-able objectives to achieve with the project.
- `additional_info` : Any additional info

<br/>

# Run locally

in your project directory, run:

```sh
solana-test-validator
```

```sh
pnpm program:deploy-all
```

```sh
pnpm program:test-all
```

```sh
pnpm build:protocol
```

```sh
pnpm dev:app
```

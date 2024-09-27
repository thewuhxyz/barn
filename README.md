# OpenFund

OpenFund is an open funding protocol for for Solana based development.

## Features

- [x]  Grants
- [ ]  Donations and Sponsorships
- [ ]  Help & Contributions
- [ ]  RPGF

These will be discussed further in the Roadmap section

# URI JSON Specifications

The following are specifications for your off-chain data

## `Profile` Specification

```json
{
  "type":"object",
  "properties":{
    "name":{
      "type":"string",
      "required":true
    },
    "bio":{
      "type":"string",
    },
    "image_url":{
      "type": "string",
    },
    "website":{
      "type": "string",
    },
    "github": {
	    "type": "string",
	  },
	  "twitter": {
		  "type": "string",
	  },
	  "discord": {
		  "type": "string",
	  },
	  "telegram": {
		  "type": "string",
	  },
	  "linkedin": {
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

## `GrantProgram` Specification

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
      "type": "number",
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

## `Grant`  Specification

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

## Run locally

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

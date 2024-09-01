/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/barn.json`.
 */
export type Barn = {
  "address": "9r5mFwaKhxmyp6iBQeo3fHXP2J1bGneySwyLmvSq1Ggd",
  "metadata": {
    "name": "barn",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "acceptGrantMilestone",
      "discriminator": [
        98,
        187,
        175,
        76,
        53,
        68,
        224,
        100
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          },
          "relations": [
            "profile"
          ]
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.seed",
                "account": "profile"
              }
            ]
          },
          "relations": [
            "authority"
          ]
        },
        {
          "name": "project",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "project.profile",
                "account": "project"
              },
              {
                "kind": "account",
                "path": "project.id",
                "account": "project"
              }
            ]
          },
          "relations": [
            "grant"
          ]
        },
        {
          "name": "grant",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "grantProgram"
              },
              {
                "kind": "account",
                "path": "grant.id",
                "account": "grant"
              }
            ]
          }
        },
        {
          "name": "grantProgram",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116,
                  45,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "grant_program.profile",
                "account": "grantProgram"
              },
              {
                "kind": "account",
                "path": "grant_program.id",
                "account": "grantProgram"
              }
            ]
          }
        },
        {
          "name": "grantMilestone",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116,
                  45,
                  109,
                  105,
                  108,
                  101,
                  115,
                  116,
                  111,
                  110,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "grant"
              },
              {
                "kind": "account",
                "path": "grant_milestone.id",
                "account": "grantMilestone"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "addGrantMilestone",
      "discriminator": [
        200,
        106,
        23,
        255,
        117,
        0,
        1,
        181
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          },
          "relations": [
            "profile"
          ]
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.seed",
                "account": "profile"
              }
            ]
          },
          "relations": [
            "authority"
          ]
        },
        {
          "name": "project",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "project.profile",
                "account": "project"
              },
              {
                "kind": "account",
                "path": "project.id",
                "account": "project"
              }
            ]
          },
          "relations": [
            "grant"
          ]
        },
        {
          "name": "grant",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "grant.program",
                "account": "grant"
              },
              {
                "kind": "account",
                "path": "grant.id",
                "account": "grant"
              }
            ]
          }
        },
        {
          "name": "grantMilestone",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116,
                  45,
                  109,
                  105,
                  108,
                  101,
                  115,
                  116,
                  111,
                  110,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "grant"
              },
              {
                "kind": "account",
                "path": "grant.count",
                "account": "grant"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "addGrantProgram",
      "discriminator": [
        200,
        240,
        17,
        145,
        64,
        206,
        161,
        19
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          },
          "relations": [
            "profile"
          ]
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.seed",
                "account": "profile"
              }
            ]
          },
          "relations": [
            "authority"
          ]
        },
        {
          "name": "grantProgram",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116,
                  45,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "profile"
              },
              {
                "kind": "account",
                "path": "profile.count",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "addProject",
      "discriminator": [
        97,
        192,
        178,
        11,
        126,
        16,
        196,
        5
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          },
          "relations": [
            "profile"
          ]
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.seed",
                "account": "profile"
              }
            ]
          },
          "relations": [
            "authority"
          ]
        },
        {
          "name": "project",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "profile"
              },
              {
                "kind": "account",
                "path": "profile.count",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "approveSponsor",
      "discriminator": [
        211,
        168,
        31,
        70,
        3,
        140,
        143,
        222
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true
        },
        {
          "name": "signer"
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.seed",
                "account": "profile"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "awardGrant",
      "discriminator": [
        11,
        57,
        141,
        185,
        134,
        142,
        133,
        115
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          },
          "relations": [
            "profile"
          ]
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.seed",
                "account": "profile"
              }
            ]
          },
          "relations": [
            "authority"
          ]
        },
        {
          "name": "project",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "project.profile",
                "account": "project"
              },
              {
                "kind": "account",
                "path": "project.id",
                "account": "project"
              }
            ]
          }
        },
        {
          "name": "grantProgram",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116,
                  45,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "profile"
              },
              {
                "kind": "account",
                "path": "grant_program.id",
                "account": "grantProgram"
              }
            ]
          }
        },
        {
          "name": "grant",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "grantProgram"
              },
              {
                "kind": "account",
                "path": "grant_program.count",
                "account": "grantProgram"
              }
            ]
          }
        },
        {
          "name": "paymentMint"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "approvedAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createUser",
      "discriminator": [
        108,
        227,
        130,
        130,
        252,
        109,
        75,
        218
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "seed"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "seed",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "rejectGrantMilestone",
      "discriminator": [
        168,
        33,
        95,
        110,
        219,
        99,
        152,
        14
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          },
          "relations": [
            "profile"
          ]
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.seed",
                "account": "profile"
              }
            ]
          },
          "relations": [
            "authority"
          ]
        },
        {
          "name": "project",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "project.profile",
                "account": "project"
              },
              {
                "kind": "account",
                "path": "project.id",
                "account": "project"
              }
            ]
          },
          "relations": [
            "grant"
          ]
        },
        {
          "name": "grant",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "grantProgram"
              },
              {
                "kind": "account",
                "path": "grant.id",
                "account": "grant"
              }
            ]
          }
        },
        {
          "name": "grantProgram",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116,
                  45,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "grant_program.profile",
                "account": "grantProgram"
              },
              {
                "kind": "account",
                "path": "grant_program.id",
                "account": "grantProgram"
              }
            ]
          }
        },
        {
          "name": "grantMilestone",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116,
                  45,
                  109,
                  105,
                  108,
                  101,
                  115,
                  116,
                  111,
                  110,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "grant"
              },
              {
                "kind": "account",
                "path": "grant_milestone.id",
                "account": "grantMilestone"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "reviewGrantMilestone",
      "discriminator": [
        230,
        67,
        5,
        135,
        250,
        132,
        3,
        33
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          },
          "relations": [
            "profile"
          ]
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.seed",
                "account": "profile"
              }
            ]
          },
          "relations": [
            "authority"
          ]
        },
        {
          "name": "project",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "project.profile",
                "account": "project"
              },
              {
                "kind": "account",
                "path": "project.id",
                "account": "project"
              }
            ]
          },
          "relations": [
            "grant"
          ]
        },
        {
          "name": "grant",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "grantProgram"
              },
              {
                "kind": "account",
                "path": "grant.id",
                "account": "grant"
              }
            ]
          }
        },
        {
          "name": "grantProgram",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116,
                  45,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "grant_program.profile",
                "account": "grantProgram"
              },
              {
                "kind": "account",
                "path": "grant_program.id",
                "account": "grantProgram"
              }
            ]
          }
        },
        {
          "name": "grantMilestone",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116,
                  45,
                  109,
                  105,
                  108,
                  101,
                  115,
                  116,
                  111,
                  110,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "grant"
              },
              {
                "kind": "account",
                "path": "grant_milestone.id",
                "account": "grantMilestone"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "reviseGrantMilestone",
      "discriminator": [
        185,
        43,
        233,
        194,
        61,
        79,
        208,
        65
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          },
          "relations": [
            "profile"
          ]
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.seed",
                "account": "profile"
              }
            ]
          },
          "relations": [
            "authority"
          ]
        },
        {
          "name": "project",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "project.profile",
                "account": "project"
              },
              {
                "kind": "account",
                "path": "project.id",
                "account": "project"
              }
            ]
          },
          "relations": [
            "grant"
          ]
        },
        {
          "name": "grant",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "grantProgram"
              },
              {
                "kind": "account",
                "path": "grant.id",
                "account": "grant"
              }
            ]
          }
        },
        {
          "name": "grantProgram",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116,
                  45,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "grant_program.profile",
                "account": "grantProgram"
              },
              {
                "kind": "account",
                "path": "grant_program.id",
                "account": "grantProgram"
              }
            ]
          }
        },
        {
          "name": "grantMilestone",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116,
                  45,
                  109,
                  105,
                  108,
                  101,
                  115,
                  116,
                  111,
                  110,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "grant"
              },
              {
                "kind": "account",
                "path": "grant_milestone.id",
                "account": "grantMilestone"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "config",
          "type": {
            "defined": {
              "name": "milestoneRevisionConfig"
            }
          }
        }
      ]
    },
    {
      "name": "settleGrantMilestone",
      "discriminator": [
        112,
        235,
        20,
        80,
        189,
        127,
        13,
        98
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "to",
          "writable": true
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          },
          "relations": [
            "profile"
          ]
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.seed",
                "account": "profile"
              }
            ]
          },
          "relations": [
            "authority"
          ]
        },
        {
          "name": "grant",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "grant.program",
                "account": "grant"
              },
              {
                "kind": "account",
                "path": "grant.id",
                "account": "grant"
              }
            ]
          }
        },
        {
          "name": "grantMilestone",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  97,
                  110,
                  116,
                  45,
                  109,
                  105,
                  108,
                  101,
                  115,
                  116,
                  111,
                  110,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "grant"
              },
              {
                "kind": "account",
                "path": "grant_milestone.id",
                "account": "grantMilestone"
              }
            ]
          }
        },
        {
          "name": "signerTokenAccount",
          "writable": true
        },
        {
          "name": "toTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "to"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "paymentMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "paymentMint",
          "relations": [
            "grant"
          ]
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "authority",
      "discriminator": [
        36,
        108,
        254,
        18,
        167,
        144,
        27,
        36
      ]
    },
    {
      "name": "grant",
      "discriminator": [
        161,
        166,
        11,
        205,
        204,
        135,
        205,
        54
      ]
    },
    {
      "name": "grantMilestone",
      "discriminator": [
        158,
        198,
        71,
        63,
        156,
        20,
        133,
        204
      ]
    },
    {
      "name": "grantProgram",
      "discriminator": [
        44,
        6,
        52,
        35,
        212,
        162,
        70,
        105
      ]
    },
    {
      "name": "profile",
      "discriminator": [
        184,
        101,
        165,
        188,
        95,
        63,
        127,
        188
      ]
    },
    {
      "name": "project",
      "discriminator": [
        205,
        168,
        189,
        202,
        181,
        247,
        142,
        19
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "authorityMismatch",
      "msg": "Authority does not match"
    },
    {
      "code": 6001,
      "name": "notASponsor",
      "msg": "Not A Sponsor"
    },
    {
      "code": 6002,
      "name": "notADev",
      "msg": "Not A Dev"
    },
    {
      "code": 6003,
      "name": "profileCannotBeSponsor",
      "msg": "Dev profile cannot be sponsor. Projects already exists for Dev profile"
    },
    {
      "code": 6004,
      "name": "profileMismatch",
      "msg": "Profile does not match profile provided"
    },
    {
      "code": 6005,
      "name": "grantMismatch",
      "msg": "Project grant does not match grant provided"
    },
    {
      "code": 6006,
      "name": "grantAlreadyAwarded",
      "msg": "Grant already awarded to project"
    },
    {
      "code": 6007,
      "name": "milestoneAlreadyConfirmed",
      "msg": "Milestone already confirmed"
    },
    {
      "code": 6008,
      "name": "milestoneNotConfirmed",
      "msg": "Milestone not confirmed"
    },
    {
      "code": 6009,
      "name": "milestoneNotAccepted",
      "msg": "Milestone not accepted"
    },
    {
      "code": 6010,
      "name": "milestoneAlreadyPaid",
      "msg": "Milestone already paid"
    },
    {
      "code": 6011,
      "name": "overflowOccured",
      "msg": "Overflow occured"
    },
    {
      "code": 6012,
      "name": "approvedAmountExceeded",
      "msg": "Approved amount exceeded"
    }
  ],
  "types": [
    {
      "name": "authority",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "profile",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "grant",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "project",
            "type": "pubkey"
          },
          {
            "name": "program",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "count",
            "type": "u32"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "paymentMint",
            "type": "pubkey"
          },
          {
            "name": "approvedAmount",
            "type": "u64"
          },
          {
            "name": "paidOut",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "grantMilestone",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "grant",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "state",
            "type": {
              "defined": {
                "name": "milestoneState"
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "grantProgram",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profile",
            "type": "pubkey"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "count",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "milestoneRevisionConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "uri",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "milestoneState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "inProgress"
          },
          {
            "name": "inReview"
          },
          {
            "name": "rejected"
          },
          {
            "name": "accepted"
          },
          {
            "name": "paid"
          }
        ]
      }
    },
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "seed",
            "type": "string"
          },
          {
            "name": "sponsor",
            "type": "bool"
          },
          {
            "name": "count",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "project",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profile",
            "type": "pubkey"
          },
          {
            "name": "grant",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

export const dexTopiaVoter = [
  {
    "inputs": [
      {
        "internalType": "contract IBaseV1Voter",
        "name": "_voter",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "address1",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "address2",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint40",
        "name": "lastUpdate",
        "type": "uint40"
      }
    ],
    "name": "PoolProtectionSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "pools",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "int256[]",
        "name": "weights",
        "type": "int256[]"
      }
    ],
    "name": "SubmittedVote",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "pools",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "int256[]",
        "name": "voteWeights",
        "type": "int256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "usedWeight",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalWeight",
        "type": "uint256"
      }
    ],
    "name": "VotedForPoolIncentives",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_SUBMITTED_VOTES",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "availableVotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "fixedVotePools",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentVotes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "pool",
            "type": "address"
          },
          {
            "internalType": "int256",
            "name": "weight",
            "type": "int256"
          }
        ],
        "internalType": "struct TopiaVoter.Vote[]",
        "name": "votes",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getPoolProtectionData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "lastUpdate",
        "type": "uint256"
      },
      {
        "internalType": "address[2]",
        "name": "pools",
        "type": "address[2]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getWeek",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "poolProtectionCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "poolVotes",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ITokenLocker",
        "name": "_tokenLocker",
        "type": "address"
      },
      {
        "internalType": "contract ITopiaPartners",
        "name": "_topiaPartners",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_veDepositor",
        "type": "address"
      },
      {
        "internalType": "address[2]",
        "name": "_fixedVotePools",
        "type": "address[2]"
      }
    ],
    "name": "setAddresses",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[2]",
        "name": "_pools",
        "type": "address[2]"
      }
    ],
    "name": "setPoolProtection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenID",
        "type": "uint256"
      }
    ],
    "name": "setTokenID",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "solidlyVoter",
    "outputs": [
      {
        "internalType": "contract IBaseV1Voter",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "submitVotes",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenID",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenLocker",
    "outputs": [
      {
        "internalType": "contract ITokenLocker",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "topiaPartners",
    "outputs": [
      {
        "internalType": "contract ITopiaPartners",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userVotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "veTopiaDepositor",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_pools",
        "type": "address[]"
      },
      {
        "internalType": "int256[]",
        "name": "_weights",
        "type": "int256[]"
      }
    ],
    "name": "voteForPools",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
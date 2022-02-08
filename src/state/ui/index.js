
import Web3 from 'web3'
import { contractAbi, contractAddress } from "../../config";
import { contractAbi2, contractAddress2 } from "../../config2";




const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "Price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const tokenAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



var tokenContract
var contract
var address
var web3
//var lockreward;
export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async(a,thunkApi)=>{


        try {
            if(Web3.givenProvider){ 
                web3 = new Web3(Web3.givenProvider);
			
             //   await Web3.givenProvider.enable()
                //const networkId = await web3.eth.net.getId()
				//const SeekGoldAddress = "0x44540Ac7Eeb28f99156990191AbdF92DCCb8d4c5"
				//const tokenAddres = "0x51dE1BF130514c175bb10E9a019283eb9B501C8D"
				contract = new web3.eth.Contract(contractAbi, contractAddress);
				tokenContract = new web3.eth.Contract(contractAbi2,contractAddress2)
				//RonContract = contract;
                const addresses = await web3.eth.getAccounts()
                address = addresses[0];
				var ethBalance = await web3.eth.getBalance(address)
				
                thunkApi.dispatch(balance({
                    contract,
                    address,
					tokenContract

                }))
				return {
                    web3,
                    contract,
                    address,
					contractAddress,
					ethBalance,
					tokenContract
                                                       }
            }else {console.log("error in loading web3")
					return {web3:null,contract:null,address:null,SeekGoldAddress:null}}
        } catch (error) {
            console.log("Error", error)
        }

    }
)



export const balance = createAsyncThunk("balance",
    async ({contract,address,tokenContract})=>{

		
        try {
            const balance1 = await contract.methods.StakMapping(address,1).call()
			const unClaimedReward1 = balance1 == 0? null: await contract.methods.calculateReward(1).call({from:address})
			const totalStaked = await contract.methods.totalAmountStaked().call()
			const claimedReward = await contract.methods.ClaimedReward(address).call()
			const totalClaimed = await contract.methods.totalAmountClaimed().call()
			const lockedRewardFetched = await contract.methods.getLockReward().call()
			const FlexPS = await contract.methods.FlexPS().call()
			const TMPS = await contract.methods.TMPS().call()
			const SMPS = await contract.methods.SMPS().call()
			const totalReward = await contract.methods.totalReward().call()
			var APY = totalReward / (FlexPS+(1.5*TMPS)+(2*SMPS))
			const approved = await tokenContract.methods.allowance(address,contractAddress).call()
			const lockreward = await contract.methods.getLockReward().call()
			const price = await contract.methods.getPrice(web3.utils.toWei("1","ether")).call()
			const balance2 = await contract.methods.StakMapping(address,2).call()
			const balance3 = await contract.methods.StakMapping(address,3).call()

			const unClaimedReward2 = balance2 == 0? null: await contract.methods.calculateReward(1).call({from:address})
			const unClaimedReward3 = balance3 == 0? null:  await contract.methods.calculateReward(1).call({from:address})
			
			const UserDetails = await contract.methods.getUserDetails().call({from:address})
			console.log("user details ", UserDetails)

             return {price,lockreward,balance1,unClaimedReward1,totalStaked,totalClaimed,claimedReward,lockedRewardFetched,APY,approved, balance2,balance3,unClaimedReward2,unClaimedReward3,UserDetails}

        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )


	export const Approve = createAsyncThunk("Approve",
    async ({quantity})=>{

		
        try {
			var aQ = web3.utils.toWei(quantity.toString(),"ether")
			const result = await tokenContract.methods.approve(contract._address,aQ).send({from:address})
			.on("transactionHash", async function (response) {console.log("response",response)})

        } catch (error) {
            console.log("Error in Approve Function",error)
        }
    }
    )


	export const Staking = createAsyncThunk("Staking",
    async ({quantity,stakeId})=>{

		
        try {
			console.log("id in redux",stakeId)
			var aQ = web3.utils.toWei(quantity.toString(),"ether")
			const result = await contract.methods.staking(aQ,stakeId).send({from:address})

        } catch (error) {
            console.log("Error in Staking Function",error)
        }
    }
    )


	export const claimF = createAsyncThunk("Staking",
    async ({stakeId})=>{

		
        try {
			
			const result = await contract.methods.claimReward(stakeId).send({from:address})

        } catch (error) {
            console.log("Error in Staking Function",error)
        }
    }
    )



	export const unStaking = createAsyncThunk("Staking",
    async ({stakeId})=>{

		
        try {
			
			const result = await contract.methods.unStaking(stakeId).send({from:address})

        } catch (error) {
            console.log("Error in Staking Function",error)
        }
    }
    )







const adoptSlice = createSlice({
    name: "AdopSlice",
    initialState: {
        web3: null,
		totalStaked: null,
        address : null,
        balance1: null,
		balance2: null,
		balance3: null,
		Price: null,
		Active: null,
        toggle: false,
		unClaimedReward1: null,
		unClaimedReward2: null,
		unClaimedReward3 : null,
		totalClaimed: null,
		claimedReward: null,
		lockedRewardFetched: null,
		APY : null,
		tokenContract: null,
		approved: null,
		pending: false,
		UserDetails: null,
		lockreward: null,
		price:null,




    },
    reducers: {
        toggle : (state,actions)=>{
            state.toggle = !state.toggle;
        },
		setAccount: (state,actions)=>{
			state.address = actions.payload
		}
    },
    extraReducers: {
        [initWeb3.fulfilled] : (state,action)=>{
            state.web3 = action.payload.web3;
            state.address = action.payload.address;
			state.ethBalance = action.payload.ethBalance;
			state.tokenContract = action.payload.tokenContract


         },

         [balance.fulfilled] : (state,action)=>{
            state.balance1 = action.payload.balance1
			state.balance2 = action.payload.balance2
			state.balance3 = action.payload.balance3

			state.unClaimedReward1 = action.payload.unClaimedReward1
			//state.unClaimedReward2 = action.payload.unClaimedReward2
			//state.unClaimedReward3 = action.payload.unClaimedReward3
			state.totalStaked = action.payload.totalStaked;
			state.totalClaimed = action.payload.totalClaimed
			state.claimedReward = action.payload.claimedReward
			state.lockedRewardFetched = action.payload.lockedRewardFetched
			state.APY = action.payload.APY
			state.approved = action.payload.approved
			state.UserDetails = action.payload.UserDetails
			state.lockreward = action.payload.lockreward
			state.price = action.payload.price
		},


		

       
        [Approve.pending] : (state,action)=>{
			
			
            state.toggle = !state.toggle;
			state.error = null;
			state.pending = true;
			
        },
        [Approve.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;
			state.pending = false

        },

		[Staking.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
			state.pending = true;
        },

        [Staking.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;
			state.pending = false

        },


		[claimF.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
			state.pending = true;
        },

        [claimF.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;
			state.pending = false

        },


		[unStaking.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
			state.pending = true;
        },

        [unStaking.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;
			state.pending = false

        },





       
//
    }
})

export const adopreducer = adoptSlice.reducer;
export const { toggle } = adoptSlice.actions

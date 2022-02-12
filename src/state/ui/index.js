
import Web3 from 'web3'
import { contractAbi, contractAddress } from "../../config";
import { contractAbi2, contractAddress2 } from "../../config2";
import { contractAbi3, contractAddress3 } from "../../config3";
import { contractAbi4, contractAddress4 } from "../../config4";
import { chainID } from "../../chainID";








const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



var tokenContract
var contract
var address
var web3
var LPEthContract
var LPtoken
//var lockreward;
export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async(a,thunkApi)=>{


        try {
            if(Web3.givenProvider){ 
                web3 = new Web3(Web3.givenProvider);
				const networkId = await web3.eth.net.getId()
				await Web3.givenProvider.enable()
				if(networkId == chainID){
					contract = new web3.eth.Contract(contractAbi, contractAddress);
					LPEthContract = new web3.eth.Contract(contractAbi3, contractAddress3);
					tokenContract = new web3.eth.Contract(contractAbi2,contractAddress2)
					LPtoken = new web3.eth.Contract(contractAbi4,contractAddress4)
					//RonContract = contract;
					const addresses = await web3.eth.getAccounts()
					address = addresses[0];
					var ethBalance = await web3.eth.getBalance(address)
					
					thunkApi.dispatch(balance({
						contract,
						address,
						tokenContract
	
					}))
	
					thunkApi.dispatch(balance2({
						contract: LPEthContract,
						address,
						tokenContract
	
					}))
				}
			

        
				//const SeekGoldAddress = "0x44540Ac7Eeb28f99156990191AbdF92DCCb8d4c5"
				//const tokenAddres = "0x51dE1BF130514c175bb10E9a019283eb9B501C8D"

				return {
                    web3,
                    contract,
                    address,
					contractAddress,
					ethBalance,
					tokenContract,
					networkId
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
			var APY = totalReward / (Number(FlexPS)+(1.5*Number(TMPS))+(2*Number(SMPS)))
			const approved = await tokenContract.methods.allowance(address,contractAddress).call()
			const lockreward = await contract.methods.getLockReward().call()
			const price = await contract.methods.getPrice(web3.utils.toWei("1","ether")).call()
			const balance2 = await contract.methods.StakMapping(address,2).call()
			const balance3 = await contract.methods.StakMapping(address,3).call()
			const tokenBalance = await tokenContract.methods.balanceOf(address).call()

			const unClaimedReward2 = balance2 == 0? null: await contract.methods.calculateReward(1).call({from:address})
			const unClaimedReward3 = balance3 == 0? null:  await contract.methods.calculateReward(1).call({from:address})
			
			const UserDetails = await contract.methods.getUserDetails().call({from:address})


             return {price,lockreward,balance1,unClaimedReward1,totalStaked,totalClaimed,claimedReward,lockedRewardFetched,APY,approved, balance2,balance3,unClaimedReward2,unClaimedReward3,UserDetails,tokenBalance}

        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )



	export const balance2 = createAsyncThunk("balance2",
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
			var APY = totalReward / (Number(FlexPS)+(1.5*Number(TMPS))+(2*Number(SMPS)))
			const approved = await LPtoken.methods.allowance(address,contractAddress3).call()
			const lockreward = await contract.methods.getLockReward().call()

			const tokenBalance2 = await LPtoken.methods.balanceOf(address).call()

			const balance2 = await contract.methods.StakMapping(address,2).call()
			const balance3 = await contract.methods.StakMapping(address,3).call()

			const unClaimedReward2 = balance2 == 0? null: await contract.methods.calculateReward(1).call({from:address})
			const unClaimedReward3 = balance3 == 0? null:  await contract.methods.calculateReward(1).call({from:address})
			
			const UserDetails = await contract.methods.getUserDetails().call({from:address})
			console.log("token balance main",tokenBalance2)				

             return {lockreward,balance1,unClaimedReward1,totalStaked,totalClaimed,claimedReward,lockedRewardFetched,APY,approved, balance2,balance3,unClaimedReward2,unClaimedReward3,UserDetails,tokenBalance2}

        } catch (error) {
            console.log("Error in balance2",error)
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


	export const Approve2 = createAsyncThunk("Approve",
    async ({quantity})=>{

		
        try {
			var aQ = web3.utils.toWei(quantity.toString(),"ether")
			const result = await LPtoken.methods.approve(LPEthContract._address,aQ).send({from:address})
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

	export const Staking2 = createAsyncThunk("Staking",
    async ({quantity,stakeId})=>{

		
        try {
			console.log("id in redux",stakeId)
			var aQ = web3.utils.toWei(quantity.toString(),"ether")
			const result = await LPEthContract.methods.staking(aQ,stakeId).send({from:address})

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

	export const claimF2 = createAsyncThunk("Staking",
    async ({stakeId})=>{

		
        try {
			
			const result = await LPEthContract.methods.claimReward(stakeId).send({from:address})

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

	export const unStaking2 = createAsyncThunk("Staking",
    async ({stakeId})=>{

		
        try {
			
			const result = await LPEthContract.methods.unStaking(stakeId).send({from:address})

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
		totalStaked2:null,
        address : null,
        balance1: null,
		balance12: null,
		balance2: null,
		balance22: null,
		balance3: null,
		balance32: null,
		Price: null,
		Active: null,
        toggle: false,
		unClaimedReward1: null,
		unClaimedReward12: null,
		unClaimedReward2: null,
		unClaimedReward22: null,
		unClaimedReward3 : null,
		unClaimedReward32: null,
		totalClaimed: null,
		totalClaimed2:null,
		claimedReward: null,
		claimedReward2:null,
		lockedRewardFetched: null,
		lockedRewardFetched2:null,
		APY : null,
		APY2: null,
		tokenContract: null,
		approved: null,
		approved2 :null,
		pending: false,
		UserDetails: null,
		UserDetails2 : null,
		lockreward: null,
		lockreward2: null,
		price:null,
		networkId: null,
		tokenBalance2 : null,
		tokenBalance: null




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
			state.networkId = action.payload.networkId


         },

         [balance.fulfilled] : (state,action)=>{
            state.balance1 = action.payload.balance1
			state.balance2 = action.payload.balance2
			state.balance3 = action.payload.balance3

			state.unClaimedReward1 = action.payload.unClaimedReward1
			state.unClaimedReward2 = action.payload.unClaimedReward2
			state.unClaimedReward3 = action.payload.unClaimedReward3
			state.totalStaked = action.payload.totalStaked;
			state.totalClaimed = action.payload.totalClaimed
			state.claimedReward = action.payload.claimedReward
			state.lockedRewardFetched = action.payload.lockedRewardFetched
			state.APY = action.payload.APY
			state.approved = action.payload.approved
			state.UserDetails = action.payload.UserDetails
			state.lockreward = action.payload.lockreward
			state.price = action.payload.price
			state.tokenBalance = action.payload.tokenBalance
		},



		[balance2.fulfilled] : (state,action)=>{
            state.balance12 = action.payload.balance1
			state.balance22 = action.payload.balance2
			state.balance32 = action.payload.balance3

			state.unClaimedReward12 = action.payload.unClaimedReward1
			state.unClaimedReward2 = action.payload.unClaimedReward2
			state.unClaimedReward3 = action.payload.unClaimedReward3
			state.totalStaked2 = action.payload.totalStaked;
			state.totalClaimed2 = action.payload.totalClaimed
			state.claimedReward2 = action.payload.claimedReward
			state.lockedRewardFetched2 = action.payload.lockedRewardFetched
			state.APY2 = action.payload.APY
			state.approved2 = action.payload.approved
			state.UserDetails2 = action.payload.UserDetails
			state.lockreward2 = action.payload.lockreward
			state.tokenBalance2 = action.payload.tokenBalance2
			//state.price = action.payload.price
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

		[Approve2.pending] : (state,action)=>{
			
			
            state.toggle = !state.toggle;
			state.error = null;
			state.pending = true;
			
        },
        [Approve2.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;
			state.pending = false

        },

		[Staking2.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
			state.pending = true;
        },

        [Staking2.fulfilled] : (state,action)=>{
			
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


		[claimF2.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
			state.pending = true;
        },

        [claimF2.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;
			state.pending = false

        },


		[unStaking2.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
			state.pending = true;
        },

        [unStaking2.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;
			state.pending = false

        },





       
//
    }
})

export const adopreducer = adoptSlice.reducer;
export const { toggle } = adoptSlice.actions

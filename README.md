# Decentralized Lottery DApp

 A decentralized application for lottery game
 
 ## Rules of the game
 There are multiple participants that can participate in the lottery competition by paying the lottery price of 0.1 ether.
 One winner is chosen randomly out of all the participants and all the contest price is given to the winner.
 The minimum number of participants should be 3 in the contest.
 
 ## About the implementation
 We have used the Chainlink VRF(Verifiable random function) to get secure random number.   
 For it to work, you need to install chainlink VRF i.e run the following command in your terminal  
 ```
 npm install @chainlink/contracts --save
 ```
 
 And we imported the following in our contract  
 `import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";`
 
 ## UI
 
 The UI looks like this - 
 
 ![image](https://user-images.githubusercontent.com/56895638/161517457-6fbc00d6-9a37-495b-806b-92e84025dbd8.png)

 
 ## Contract deployed
 The contract was deployed on the address `0xfDDfD3a736F85E2C9D88599a8874E186dc8b87AD`

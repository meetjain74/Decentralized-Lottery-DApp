There are multiple participants in our application 
that pay certain price to purchase a lottery.

One winner is chosen randomly among the group of participants and
all the contest price is given to the winner.

The lottery price is 0.1 ether.

The minimum no of participants should be 3 

Note -

To get secure random number, we use Chainlink VRF(Verifiable random function)

For that first run this command in terminal -
npm install @chainlink/contracts --save

And then import the following in your contract-
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";


// Contract deployed
Address - 0xfDDfD3a736F85E2C9D88599a8874E186dc8b87AD



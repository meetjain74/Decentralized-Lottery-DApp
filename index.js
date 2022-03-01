var participate = document.getElementById("participate");
var getWinner = document.getElementById("getWinner");
var tableData = document.getElementById("data-table");

participate.addEventListener("click",participateFun);
getWinner.addEventListener("click",getWinnerFun);

var isWeb3ProviderAvailable;
var userAccountAddress = null;

var abi =
[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "winnerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "winAmount",
				"type": "uint256"
			}
		],
		"name": "GotWinner",
		"type": "event"
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
		"inputs": [],
		"name": "fee",
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
		"name": "getBalance",
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
		"name": "getParticipants",
		"outputs": [
			{
				"internalType": "address payable[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "keyHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manager",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "participants",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "randomValue",
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
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "randomness",
				"type": "uint256"
			}
		],
		"name": "rawFulfillRandomness",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"stateMutability": "payable",
		"type": "receive"
	}
];

var contractAddress = "0xfDDfD3a736F85E2C9D88599a8874E186dc8b87AD";

// Check every 100 ms is user account is still equal to web3.currentProvider.selectedAddress
// If not, it reassigns user account to currently active account
var accountInterval = setInterval(
    function() {
        if (userAccountAddress!=web3.currentProvider.selectedAddress) {
            userAccountAddress = web3.currentProvider.selectedAddress;
        }
    },100
);

var participantsMap = new Map();
var LotteryContract;

window.addEventListener('load',onLoad);

function onLoad() {
    connectWeb3Provider();
}

function connectWeb3Provider() {
    // Checks whether metamask exists or not
    if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        window.ethereum.enable();
        isWeb3ProviderAvailable = true;

        LotteryContract = new web3.eth.Contract(abi,contractAddress);
        console.log(LotteryContract);

        // Get participants list
        getParticipants();
    } 
    else {
        // User don't have any web3 provider
        isWeb3ProviderAvailable = false;
    }
}


function participateFun() {
    if (isWeb3ProviderAvailable) {
        // Get current address from metamask
        userAccountAddress = web3.currentProvider.selectedAddress; 
        
        // Send 0.1 ether to participate 
        web3.eth.sendTransaction(
            {
                from: userAccountAddress,
                to: contractAddress,
                value: 100000000000000000
            },
            function(err,transactionHash) {
                if (err) { 
                    console.log(err); 
                } else {
                    console.log(transactionHash);
                    var ethVal = 0;
                    if (participantsMap.has(userAccountAddress)) {
                        ethVal = participantsMap.get(userAccountAddress);
                    }
                    participantsMap.set(userAccountAddress,ethVal+0.1);
                    fillTable();
                }
            }
        );
        
    } else {
        alert("Install metamask");
    }
}

function getWinnerFun() {
    if (isWeb3ProviderAvailable) {
        // Get current address from metamask
        userAccountAddress = web3.currentProvider.selectedAddress;
        winner();
    } else {
        alert("Install metamask");
    }
}

var winner = async() => {
    var owner = await LotteryContract.methods.owner().call();
    if (owner.toUpperCase()!==userAccountAddress.toUpperCase()) {
        alert("You can't use this functionality. You are not the owner");
    }
    else {
        var res = await LotteryContract.methods.getWinner().send(
            {
                from: userAccountAddress
            }
        );
        console.log(res);

        var event = LotteryContract.events.GotWinner(
            function(err,result) {
                if (err) {
                    return;
                }
                var winAmount = result.returnValues.winAmount;
                var winnerAddress = result.returnValues.winnerAddress;
                alert(`${winnerAddress} won ${winAmount/1000000000000000000} ether`)
            }
        );

        participantsMap.clear();
        fillTable();
    }
}

var getParticipants = async() => {
    var res = await LotteryContract.methods.getParticipants().call();
    for (var key in res) {
        var address = res[key];
        var ethVal = 0;
        if (participantsMap.has(address)) {
            ethVal = participantsMap.get(address);
        }
        participantsMap.set(address,ethVal+0.1);
    }

    console.log(participantsMap);

    // Call fill table
    fillTable();
}

function fillTable() {

    if (participantsMap.size==0) {
        tableData.innerHTML = `<h3>No participants yet</h3>`;
        return;
    }

    var temp = `<thead>
                    <tr>
                        <th>S.no</th>
                        <th>Address</th>
                        <th>Ether spent</th>
                    </tr>
                </thead>`;
    
    tableData.innerHTML = temp;          

    var index = 1;
    var tbody = document.createElement("tbody");
    for (var [key, value] of  participantsMap.entries()) {
        var newRow = document.createElement("tr");
        
        var cell = document.createElement("td");
        cell.innerText = index;
        newRow.appendChild(cell);

        cell = document.createElement("td");
        cell.innerText = key;
        newRow.appendChild(cell);

        cell = document.createElement("td");
        cell.innerText = value;
        newRow.appendChild(cell);

        index++;

        tbody.appendChild(newRow);
    }
    tableData.appendChild(tbody);
}

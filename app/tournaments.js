const Web3 = require('web3')
const path = require('path')
const cjson = require('cjson')
const TX = require('ethereumjs-tx');
require('dotenv').config();

const { API_URL, PRIVATE_KEY } = process.env;

// contract details
const provider = API_URL;
const contractAddress = '0xe1e2686265B84899DE9836cC645DbE919aDE5A27';
const privateKey = new Buffer(`${PRIVATE_KEY}`, 'hex');
const defaultAccount = '0x4eE438478E88fb5DFfac360d68Fa01c986ECb068'
const etherscanLink = 'https://mumbai.polygonscan.com/tx/'
// initiate the web3
const web3 = new Web3(provider)
// initiate the contract with null value
var contract = null;
// convert Wei to Eth
function convertWeiToEth(stringValue) {
    if (typeof stringValue != 'string') {
        stringValue = String(stringValue);
    }
    return web3.utils.fromWei(stringValue, 'ether');
}

// Initiate the Contract
function getContract() {
    if (contract === null) {
        var abi = cjson.load(path.resolve(__dirname, '../app/ABI/abi.json'));
        var c = new web3.eth.Contract(abi,contractAddress);
        contract = c;
    }
    console.log('Contract Initiated successfully!')
    return contract;
}

async function getContractApi(req, res) {
    const result = await getContract();
    res.send(result);
}

async function getSingleTournament(req, res) {
    try {
        const tournamentId = req.query.tournamentId;
        if (tournamentId) {
            const result = await getContract().methods.getSingleTournament(tournamentId).call();
            res.send({
                id: result[0],
                lobbySize: result[1],
                startTime: result[2],
                endTime: result[3]
            });
        }
    } catch (error) {
        res.status(400).send({error});
    }
}

async function getActiveTournaments(req, res) {
    try {
            const result = await getContract().methods.getActiveTournaments().call();
            res.send({
                result: result
            });
    } catch (error) {
        res.status(400).send({error});
    }
}

async function getOngoingTournaments(req, res) {
    try {
            const result = await getContract().methods.getOngoingTournaments().call();
            res.send({
                result: result
            });
    } catch (error) {
        res.status(400).send({error});
    }
}

async function getTourParticipants(req, res) {
    try {
        const tournamentId = req.query.tournamentId;
        if (tournamentId) {
            const result = await getContract().methods.getTourParticipants(tournamentId).call();
            res.send({
                result
            });
        }
    } catch (error) {
        res.status(400).send({error});
    }
}

async function getLeaderboard(req, res) {
    try {
        const tournamentId = req.query.tournamentId;
        if (tournamentId) {
            const result = await getContract().methods.getLeaderboard(tournamentId).call();
            res.send({
                result
            });
        }
    } catch (error) {
        console.log("error:",error);
        res.status(400).send({error});
    }
}

module.exports = {
    getContractApi,
    getSingleTournament,
    getActiveTournaments,
    getOngoingTournaments,
    getTourParticipants,
    getLeaderboard
}

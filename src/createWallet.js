const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//defining the network
// testnet is used for testing purposes
const network = bitcoin.networks.testnet;

//derivation of HD wallet
const path = `m/49'/1'/0'/0/0`;

//generating a mnemonic for the wallet
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// creatting a HD wallet root from seed
let root = bip32.fromSeed(seed, network);

//deriving the wallet from the root
let account = root.derivePath(path);

//creating a node from the account
let node = account.derive(0);

let btcAddress = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;

console.log("Wallet Information");
console.log("Wallet Address:", btcAddress);
console.log("Private Key:", node.toWIF() )
console.log("Mnemonic: ", mnemonic);
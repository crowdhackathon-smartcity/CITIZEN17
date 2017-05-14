var bitcoin = require('bitcoinjs-lib');

var keyPair = bitcoin.ECPair.makeRandom()

// Print your private key (in WIF format)
console.log(keyPair.toWIF())
// e.g. => Kxr9tQED9H44gCmp6HAdmemAzU3n84H3dGkuWTKvE23JgHMW8gct

// Print your public key address
console.log(keyPair.getAddress())
// e.g. => 14bZ7YWde4KdRb5YN7GYkToz3EHVCvRxkF

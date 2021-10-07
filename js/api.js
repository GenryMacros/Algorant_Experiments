const algosdk = require('algosdk');
const { Console } = require('console');
const fs = require('fs');


//app - 2SYXFSCZAQCZ7YIFUCUZYOVR7G6Y3UBGSJIWT4EZ4CO3T6WVYTMHVSANOY
//creator - JWPI5PA2F4LX4WOOREKUWAMHLAO7E33OO5ZBVHKD2ACO7N7BIDLYO3COWE
//dummy - AZGC3LNNXXTY32KYUHS7G5KU6EUQ324VNHW5BAT6L46GIEOIV7GW7JOMTQ

let algod_address = "http://127.0.0.1"
let algod_token = "83ff217177a9607efae4643f022b694f31991f45fb8d9365b6c381deabfdf202"
let algodPort = "35975"
let algodClient = new algosdk.Algodv2(algod_token, algod_address, algodPort);
let user_private = algosdk.mnemonicToSecretKey("sugar need priority rich dune torch siege engine mushroom acquire hurt reunion series strike ensure wisdom picnic path various cost cup puppy hazard able year");
let user_public = "SAUHHJSPDR4URIGHMHZGRMKZIS7CN6NUPFF52ZEIGINYJWV2WRBITMB5MY";

(async() => {
    let accountInfo = await algodClient.accountInformation(user_public).do();
    let opt_params = await algodClient.getTransactionParams().do();
    opt_params.fee = 1000;
    opt_params.flatFee = true; 

    let pay_params = await algodClient.getTransactionParams().do();
    pay_params.fee = 1000;
    pay_params.flatFee = true;
    const receiver = "2SYXFSCZAQCZ7YIFUCUZYOVR7G6Y3UBGSJIWT4EZ4CO3T6WVYTMHVSANOY";
    let amount = 10000;


    let opt_txn = algosdk.makeApplicationOptInTxn(user_public, opt_params, 5);
    let pay_txn = algosdk.makePaymentTxnWithSuggestedParams(user_public, receiver, amount, undefined, undefined, pay_params);
    let signed_optTxn = opt_txn.signTxn(user_private.sk);
    let signed_payTxn = pay_txn.signTxn(user_private.sk);
    let signed = [signed_optTxn, signed_payTxn]

    let tx = (await algodClient.sendRawTransaction(signed).do());
    let txId = txn.txID().toString();

    let confirmedTxn = await waitForConfirmation(algodClient, txId, 4);
    console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
    console.log(confirmedTxn);
})().catch(e => {
    console.log(e);
});


const waitForConfirmation = async function (algodClient, txId, timeout) {
    if (algodClient == null || txId == null || timeout < 0) {
        throw new Error("Bad arguments");
    }

    const status = (await algodClient.status().do());
    if (status === undefined) {
        throw new Error("Unable to get node status");
    }

    const startround = status["last-round"] + 1;
    let currentround = startround;

    while (currentround < (startround + timeout)) {
        const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
        if (pendingInfo !== undefined) {
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                //Got the completed Transaction
                return pendingInfo;
            } else {
                if (pendingInfo["pool-error"] != null && pendingInfo["pool-error"].length > 0) {
                    // If there was a pool error, then the transaction has been rejected!
                    throw new Error("Transaction " + txId + " rejected - pool error: " + pendingInfo["pool-error"]);
                }
            }
        }
        await algodClient.statusAfterBlock(currentround).do();
        currentround++;
    }
    throw new Error("Transaction " + txId + " not confirmed after " + timeout + " rounds!");
};
//TZZTJNFJZI7ZHTPH26UCHXWYPXHB7VZHKCYRNVWS53B7DPNKKAMT4N7W3U
//C3MKH24QL3GHSD5CDQ47ZNQZMNZRX4MUTV6LVPAXMWAXMIISYSOWPGH674 
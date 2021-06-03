import { Injectable } from '@angular/core';
import { Blockchain } from 'SavjeeCoin/src/blockchain';
import EC from "elliptic";
@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public blockchainInstance = new Blockchain();
  public walletKeys = [];

  constructor() {  
    this.blockchainInstance.difficulty = 1;
    // Pay attention to the following 2 lines
    this.generateWalletKeys();
    this.blockchainInstance.minePendingTransactions(this.walletKeys[0].publicKey);
    // We are explicitly calling minePend... even though there are no pending transactions
    // yet since we need to provide, some wallet, some amount of money in order for us to 
    // test our blockchain.
    
      // The code is such that, the money will always be deducted from the account which is
      // described by the 0th index of walletKeys.
      
    // --------------------------------------------------
    console.log(this.blockchainInstance.miningReward);
  }

  addTransaction(tx) {
    this.blockchainInstance.addTransaction(tx);
  }

  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions;
  }

  minePendingTransactions() {
    
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
      // The code is such that, the money will always be deducted from the account which is
      // described by the 0th index of walletKeys.
    )
  }

  getBlocks() {
    return this.blockchainInstance.chain;
  }

  generateWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    });
    
    console.log(JSON.stringify(this.walletKeys[0], null, 2));
  }
}

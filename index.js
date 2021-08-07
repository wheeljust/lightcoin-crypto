class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance () {
    let balance = 0;
    for (const t of this.transactions){
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction){
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;

    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction {
  get value () {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value () {
    return -this.amount;
  }

  isAllowed() {
    if (this.account.balance + this.value >= 0) return true;
    console.log(`Withdrawl of $${this.amount} failed. Insufficient Funds.`)
    return false;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

console.log('Starting Balance', myAccount.balance);

t1 = new Deposit(120.00, myAccount);
t1.commit();

t2 = new Withdrawal(50, myAccount);
t2.commit();

t3 = new Withdrawal(10, myAccount);
t3.commit();

console.log('Ending Balance:', myAccount.balance);

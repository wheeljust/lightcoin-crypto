class Account {

  constructor(username) {
    this.username = username;
    this.balance = 0;
    this.transactions = [];
  }

  get balance () {
    return this.transactions.reduce((total, current) => total + current, 0);
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
    this.account.balance += this.value;
  }

}

class Deposit extends Transaction {
  get value () {
    return this.amount;
  }
}

class Withdrawal extends Transaction {
  get value () {
    return -this.amount;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

console.log('Starting Balance', myAccount.balance);

t1 = new Deposit(120.00, myAccount);
t1.commit();
// console.log('Transaction 1:', t1);

t2 = new Withdrawal(50, myAccount);
t2.commit();
// console.log('Transaction 2:', t2);

t3 = new Withdrawal(10, myAccount);
t3.commit();
// console.log('Transaction 3:', t3);


console.log('Ending Balance:', myAccount.balance);

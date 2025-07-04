let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;

    this.transactions = []
  }

  get balance(){
    return this.transactions.reduce((sum, transaction) => sum + transaction.value, 0)
  }

  addTransaction(transaction){
    this.transactions.push(transaction)
  }

}
const myAccount = new Account("snow-patrol");

class Transaction {
   constructor(account, amount) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if(!this.isAllowed()){
      console.log(`❌ Transaction Declined: insufficient funds or invalid`)
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
}
}
class Withdrawal extends Transaction {

  get value(){
    return -this.amount;
  }

  isAllowed(){
    return this.account.balance >= this.amount;
  }
}

class Deposit extends Transaction {

    get value(){
    return this.amount;
  }

    isAllowed(){
      return true;
    }
  }




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

t1 = new Withdrawal(myAccount, 50.25);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(myAccount, 9.99);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(myAccount, 120.00);
t3.commit();
console.log('Transaction 3:', t3);

t4 = new Withdrawal(myAccount, 30);
t4.commit();
console.log('Transaction 4:', t4);

t5 = new Withdrawal(myAccount, 90);
t5.commit();
console.log('Transaction 5:', t5);

t6 = new Withdrawal(myAccount, 30);
t6.commit();
console.log('Transaction 4:', t6);

console.log('Balance:', myAccount.balance);

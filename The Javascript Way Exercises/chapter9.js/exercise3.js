class Account {
  constructor(owner) {
    this.owner = owner;
    this.balance = 0;
  }

  credit(amount) {
    this.balance += amount;
  }

  describe() {
    return `owner: ${this.owner}, balance: ${this.balance}`;
  }
}

const accounts = [new Account("Sean"), new Account("Brad"), new Account("Georges")];

accounts.forEach(account => {
  account.credit(1000);
  console.log(account.describe());
});
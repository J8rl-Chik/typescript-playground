// class Balance {
//   private kind = "balance";
//   value: number;

//   constructor(value: number) {
//     this.value = value;
//   }
// }

// class AccountNumber {
//   private kind = "account";
//   value: number;

//   constructor(value: number) {
//     this.value = value;
//   }
// }

// class Balance {
//   private nominal: void = undefined;

//   value: number;

//   constructor(value: number) {
//     this.value = value;
//   }
// }

// class AccountNumber {
//   private nominal: void = undefined;

//   value: number;

//   constructor(value: number) {
//     this.value = value;
//   }
// }

// const account = new AccountNumber(12345678);
// const balance = new Balance(10000);

// function acceptBalance(balance: Balance) {}

// acceptBalance(balance);
// acceptBalance(account);

type Credits = number & { kind: "credits" };

type AccountNumber = number & { kind: "accountNumber" };

const account = 12345678 as AccountNumber;
let balance = 10000 as Credits;
const amount = 3000 as Credits;

function increase(balance: Credits, amount: Credits): Credits {
  return (balance + amount) as Credits;
}

balance = increase(balance, amount);
balance = increase(balance, account); // 에러

const result = balance + amount; // number
const credits = (balance + amount) as Credits; // Credits

type Balance = unique number;

function processBankAccount(data) {
  const result = {
    accountNumber: data.accountNumber,
    accountHolder: data.accountHolder,
    currency: data.currency,
    initialBalance: null,
    finalBalance: null,
    appliedTransactions: [],
    rejectedTransactions: [],
    auditLog: ""
  };

  let balance = 0;

  try {
    const openingBalance = Number(data.initialBalance);
    if (isNaN(openingBalance) || openingBalance < 0) {
      throw new Error("Invalid opening balance");
    }

    balance = openingBalance;
    result.initialBalance = openingBalance;

    data.transactions.forEach(txn => {
      try {
        const amount = Number(txn.amount);
        const type = txn.type;

        if (!type) throw new Error("Missing transaction type");
        if (isNaN(amount)) throw new Error("Invalid amount");
        if (amount <= 0) throw new Error("Amount must be positive");

        switch (type.toLowerCase()) {
          case "deposit":
            balance += amount;
            result.appliedTransactions.push(txn);
            break;

          case "withdraw":
            if (amount > balance) {
              throw new Error("Insufficient balance");
            }
            balance -= amount;
            result.appliedTransactions.push(txn);
            break;

          default:
            throw new Error("Unknown transaction type");
        }

      } catch (err) {
        result.rejectedTransactions.push({
          transaction: txn,
          reason: err.message
        });
      }
    });

    result.finalBalance = balance;

  } catch (err) {
    result.rejectedTransactions.push({
      transaction: null,
      reason: "System Error: " + err.message
    });
  } finally {
    result.auditLog = `Processed on ${new Date().toLocaleString()}`;
    console.log("Processing completed");
  }

  console.log(result);
  return result;
}
processBankAccount({
  accountNumber: "ACC101",
  accountHolder: "Jayesh Sharma",
  initialBalance: "5000",
  currency: "INR",
  transactions: [
    { type: "deposit", amount: "1000" },
    { type: "withdraw", amount: "2000" },
    { type: "withdraw", amount: "6000" },
    { type: "deposit", amount: "-50" }
  ]
});

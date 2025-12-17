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
        if (amount <= 0)

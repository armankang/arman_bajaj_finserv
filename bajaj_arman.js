const fetch = require('node-fetch');

const createInvestmentAccount = async () => {
  const accountData = {
    name: "Armandeep Singh",
    email: "armankang6@gmail.com",
    rollNumber: 2110990259,
    phone: 6283167360
  };

  try {
    const response = await fetch('https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/createAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(accountData)
    });

    if (!response.ok) {
      throw new Error('Failed to create investment account');
    }

    const responseData = await response.json();
    console.log('Investment account created successfully:', responseData);
    return responseData.accountNumber;
  } catch (error) {
    console.error('Error creating investment account:', error);
  }
};

// API 2: Buy Stocks
const buyStocks = async (accountNumber) => {
  const stocksData = {
    company: "Bajaj Finserv",
    currentPrice: 5000, 
    accountNumber: accountNumber,
    githubRepoLink: "https://github.com/armankang" 
  };

  try {
    const response = await fetch('https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/buyStocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'bfhl-auth': accountNumber
      },
      body: JSON.stringify(stocksData)
    });

    if (!response.ok) {
      throw new Error('Failed to buy stocks');
    }

    const responseData = await response.json();
    console.log('Stocks bought successfully:', responseData);
  } catch (error) {
    console.error('Error buying stocks:', error);
  }
};


const main = async () => {
  const accountNumber = await createInvestmentAccount();
  if (accountNumber) {
    await buyStocks(accountNumber);
  }
};


main();

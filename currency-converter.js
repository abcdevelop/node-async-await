// USD EUR 23
//23 USD is worth 28 CAD. You cand spend these in the following countries

const axios = require('axios');

// const getExchangeRate = (from, to) => {
//     return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
//         return response.data.rates[to];
//     });
// };

const getExchangeRate = async (from, to) => {
    try{
         const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
         const rate = response.data.rates[to];
         if(rate){
             return rate;
         }else{
             throw new Error();
         }
    } catch (e){
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }
};


// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//         return response.data.map((country) => country.name);
//     });
// };

const getCountries = async (currencyCode) => {
    try{
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (e){
        throw new Error(`Unable to get contries that use ${currencyCode}`)
    }
};


// const convertCurrency = (from, to, amount) => {
//     let resCountries;
//     return getCountries(to).then((countries) => {
//         resCountries = countries;
//         return getExchangeRate(from, to);
//     }).then((rate) => {
//         const exchangedAmount = amount * rate;
//
//         return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be use in the following countries: ${resCountries.join(', ')}`;
//     });
// };

const convertCurrency = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);
    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be use in the following countries: ${countries.join(', ')}`;
};


// getExchangeRate('USD','EUR').then((rate)=>console.log(rate));
// getExchangeRate('EUR','USD').then((rate)=>console.log(rate));
//
// getCountries('EUR').then((country)=>console.log(country));
// getCountries('USD').then((country)=>console.log(country));
//
// convertCurrency('EUR','USD',100).then((status)=>{
//     console.log(status);
// });
convertCurrency('USD','EUR',100).then((status)=>{
    console.log(status);
}).catch((e)=>{
    console.log(e.message);
});

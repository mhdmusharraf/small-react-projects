import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("LKR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        //console.log(response);
        setExchangeRate(response.data.rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching exchange rate", error);
      }
    };
    getExchangeRate();
  },[fromCurrency,toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  },[exchangeRate,amount]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleTocurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount:</label>
            <input
              type="text"
              id="amt"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency:</label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              <option value="USD">USD - United States Dollar</option>
              <option value="LKR">LKR - Sri Lankan Rupee</option>
              <option value="EUR">EUR - Euro</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="GBR">GBR - British Pound Sterling</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="SGD">SGD - Singapore Dollar</option>
              <option value="CHF">CHF - Swiss Franc</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="toCurrency">To Currency:</label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={handleTocurrencyChange}
            >
              <option value="USD">USD - United States Dollar</option>
              <option value="LKR">LKR - Sri Lankan Rupee</option>
              <option value="EUR">EUR - Euro</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="GBR">GBR - British Pound Sterling</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="SGD">SGD - Singapore Dollar</option>
              <option value="CHF">CHF - Swiss Franc</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p>
              {amount} {fromCurrency} is Equal to {convertedAmount} {toCurrency}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

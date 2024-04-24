// import express from "express";
// const app = express();
import axios from "axios";
import {Router} from "express";


const router = Router();



// Route
router.route("/convert").get(async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;

  const currencyURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=${process.env.APP_ID}`;
  const namesURl = `https://openexchangerates.org/api/currencies.json?app_id=${process.env.APP_ID}`;
  try {
    const response = await axios.get(currencyURL);
    const data = response.data;

    // Check the data is valid
    if (!data || response.status !== 200) {
      throw new Error("Unable to fetch exchange rates");
    }

    const rates = data.rates;

    // Check if the entered sourceCurrency and targetCurrency are available
    if (
      !rates.hasOwnProperty(sourceCurrency) ||
      !rates.hasOwnProperty(targetCurrency)
    ) {
      throw new Error(
        "The entered sourceCurrency and targetCurrency are not available"
      );
    }

    //get the names of the currencies
    const namesResponse = await axios.get(namesURl);
    const namesData = namesResponse.data;

    //sourceCurrency name
    const sourceCurrencyName = namesData[sourceCurrency];
    //targetCurrency name
    const targetCurrencyName = namesData[targetCurrency];

    // Perform the conversion
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    const targetValue = (targetRate / sourceRate) * amountInSourceCurrency;

    return res.json({
      amountInTargetCurrency: targetValue,
      sourceCurrencyName,
      targetCurrencyName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});



//all currences
router.route("/getAllCurrencies").get(async (req, res) => {
  const namesURl = `https://openexchangerates.org/api/currencies.json?app_id=${process.env.APP_ID}`;
  try {
    const namesResponse = await axios.get(namesURl);
    const namesData = namesResponse.data;

    return res.json(namesData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

export default router;

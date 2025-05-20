# flask-ml-api/trend_predictor.py
import requests
import numpy as np
from sklearn.linear_model import LinearRegression

def predict_price():
    try:
        # Step 1: Fetch historical price data from CoinGecko (last 30 days)
        url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart"
        params = {"vs_currency": "usd", "days": "30"}
        response = requests.get(url, params=params)
        data = response.json()

        # Step 2: Extract closing prices
        prices = [price[1] for price in data["prices"]]  # [timestamp, price]

        # Step 3: Prepare input for linear regression
        X = np.arange(len(prices)).reshape(-1, 1)  # Day indices: 0 to 29
        y = np.array(prices).reshape(-1, 1)

        # Step 4: Train Linear Regression model
        model = LinearRegression()
        model.fit(X, y)

        # Step 5: Predict next day's price (i.e., day 30)
        next_day_index = [[len(prices)]]
        predicted_price = model.predict(next_day_index)[0][0]

        return {
            "current_price": prices[-1],
            "predicted_next_day_price": round(predicted_price, 2)
        }
    except Exception as e:
        return {"error": str(e)}

# ✅ Call the function when script is run directly
if __name__ == "__main__":
    result = predict_price()
    print(result)

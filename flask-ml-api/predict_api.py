import requests
import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Step 1: Fetch historical price data from CoinGecko API
url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart"
params = {"vs_currency": "usd", "days": "30"}

res = requests.get(url, params=params)
data = res.json()

# Step 2: Extract prices
prices = [p[1] for p in data['prices']]
days = np.arange(len(prices)).reshape(-1, 1)

# Step 3: Train Linear Regression model
model = LinearRegression()
model.fit(days, prices)

# Step 4: Predict price for the next day
next_day = np.array([[len(prices)]])
predicted_price = model.predict(next_day)

print(f"📈 Next Day Predicted Price: ${predicted_price[0]:.2f}")

# Step 5: Visualize the trend
plt.figure(figsize=(10,5))
plt.plot(days, prices, label="Actual Prices", marker='o')
plt.plot(days, model.predict(days), label="Trend Line", linestyle='--')
plt.scatter(len(prices), predicted_price, color='red', label="Predicted Next Day")
plt.title("Bitcoin 30-Day Price Trend Prediction")
plt.xlabel("Days")
plt.ylabel("Price (USD)")
plt.legend()
plt.grid(True)
plt.show()

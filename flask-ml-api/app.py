from flask import Flask, jsonify
from trend_predictor import predict_price

app = Flask(__name__)

@app.route('/predict', methods=['GET'])
def predict():
    result = predict_price()
    return jsonify(result)

@app.route('/')
def home():
    return 'Welcome to the Bitcoin Price Predictor API! Use /predict to get predictions.'

if __name__ == '__main__':
    app.run(debug=True)

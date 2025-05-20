import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [assets, setAssets] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [loadingPrediction, setLoadingPrediction] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { userEmail } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:5000/api/user/email/${userEmail}`);
        setUserData(userRes.data);

        const assetsRes = await axios.get(`http://localhost:5000/api/assets/user/${userEmail}`);
        setAssets(assetsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    if (userEmail) fetchData();
  }, [userEmail]);

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  const handleAddAssets = () => navigate("/add-assets", { state: { userEmail } });

  // 🔮 AI Agent Trend Prediction
 const handleTrendPrediction = async (asset, index) => {
  setLoadingPrediction(index);
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.3-8b-instruct:free", // ✅ Free model
        messages: [
          {
            role: "system",
            content:
              "You are a financial market expert analyzing past asset trends for risk, performance, and classification.",
          },
          {
            role: "user",
            content: `Please analyze this asset:
- Type: ${asset.type}
- Token Name: ${asset.tokenName}
- Value: $${asset.value}
- Risk: ${asset.risk}

Tell me if it followed a trend like stocks, housing, or commodities in the past, and give reasoning.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
          "X-Title": "Trend Predictor",
        },
      }
    );

    const result = response.data.choices?.[0]?.message?.content;
    setPredictions((prev) => ({ ...prev, [index]: result }));
  } catch (error) {
    console.error("Status:", error.response?.status);
    console.error("Headers:", error.response?.headers);
    console.error("Data:", error.response?.data);
    setPredictions((prev) => ({
      ...prev,
      [index]: "⚠️ Failed to get trend prediction.",
    }));
  }

  setLoadingPrediction(null);
};


  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        {userData ? (
          <div className="user-info">
            <p><strong>Username:</strong> {userData.name}</p>
            <p><strong>Wallet:</strong> {userData.wallet || "N/A"}</p>
            <p><strong>Total Assets:</strong> {assets.length}</p>
            <p><strong>Total Value:</strong> ${totalValue}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </aside>

      <main className="main-content">
        <nav className="top-navbar">
          <button onClick={handleAddAssets}>➕ Add Asset</button>
          <button>⚙️ Settings</button>
        </nav>

        <section className="asset-list">
          <h2>Your Assets</h2>
          {assets.length > 0 ? (
            assets.map((asset, idx) => (
              <div key={idx} className="asset-card">
                <p><strong>Type:</strong> {asset.type}</p>
                <p><strong>Token:</strong> {asset.tokenName}</p>
                <p><strong>Value:</strong> ${asset.value}</p>
                <p><strong>Risk:</strong> {asset.risk}</p>

                <button
                  onClick={() => handleTrendPrediction(asset, idx)}
                  disabled={loadingPrediction === idx}
                >
                  📈 Trend Predict in the Past
                </button>

                {loadingPrediction === idx && <p>Loading prediction...</p>}
                {predictions[idx] && (
                  <div className="prediction-box">
                    <h4>📊 Agent Insight:</h4>
                    <p>{predictions[idx]}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No assets added yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;


//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
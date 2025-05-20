import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddAssets.css";

const AddAssets = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userEmail } = location.state || {};

  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAsset, setNewAsset] = useState({
    type: "",
    tokenName: "",
    value: "",
    risk: "",
  });

  const handleAddAsset = (e) => {
    e.preventDefault(); // Prevent form submit if inside form
    if (
      !newAsset.type ||
      !newAsset.tokenName ||
      !newAsset.value ||
      !newAsset.risk
    ) {
      alert("Please fill all fields before adding an asset.");
      return;
    }

    setAssets([
      ...assets,
      {
        ...newAsset,
        value: Number(newAsset.value), // Convert value to number
      },
    ]);
    setNewAsset({ type: "", tokenName: "", value: "", risk: "" });
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (assets.length === 0) {
      alert("Please add at least one asset before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/assets", {
        userEmail,
        assets,
      });
      alert("Assets saved successfully!");
      navigate("/dashboard", { state: { userEmail } });
    } catch (error) {
      console.error(error);
      alert("Failed to save assets");
    }
  };

  return (
    <div className="add-assets-container">
      <h2>Manage Your Assets</h2>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="add-task-button"
      >
        + Add Asset
      </button>

      <form onSubmit={handleSubmit} className="assets-form">
        {assets.map((asset, index) => (
          <div key={index} className="asset-entry">
            <p>
              <strong>Type:</strong> {asset.type}
            </p>
            <p>
              <strong>Token:</strong> {asset.tokenName}
            </p>
            <p>
              <strong>Value:</strong> ${asset.value}
            </p>
            <p>
              <strong>Risk:</strong> {asset.risk}
            </p>
          </div>
        ))}
        <button
          type="submit"
          className="submit-button"
          disabled={assets.length === 0}
        >
          Submit Assets
        </button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Asset</h3>
            <input
              type="text"
              placeholder="Asset Type"
              value={newAsset.type}
              onChange={(e) =>
                setNewAsset({ ...newAsset, type: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Token Name"
              value={newAsset.tokenName}
              onChange={(e) =>
                setNewAsset({ ...newAsset, tokenName: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Value"
              value={newAsset.value}
              onChange={(e) =>
                setNewAsset({ ...newAsset, value: e.target.value })
              }
            />
            <select
              value={newAsset.risk}
              onChange={(e) => setNewAsset({ ...newAsset, risk: e.target.value })}
            >
              <option value="">Select Risk Level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <button type="button" onClick={handleAddAsset}>
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAssets;

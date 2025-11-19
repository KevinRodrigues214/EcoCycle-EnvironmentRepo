import React, { useState } from "react";

function UserPhotoAI({ fullPage = false }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError("");
  };

  const analyze = () => {
    if (!file) {
      setError("Please upload a photo first.");
      return;
    }

    setError("");
    setLoading(true);

    // Fake "AI" – just uses file name keywords
    setTimeout(() => {
      const name = file.name.toLowerCase();

      let category = "Other / Unsure";
      let advice =
        "Check local guidelines or ask staff at the recycling depot.";

      if (name.includes("bottle") || name.includes("plastic")) {
        category = "Plastic (likely recyclable)";
        advice = "Rinse the bottle and place it in the plastics/containers bin.";
      } else if (name.includes("can") || name.includes("metal")) {
        category = "Metal (recyclable)";
        advice = "Empty and rinse the can before recycling.";
      } else if (name.includes("paper") || name.includes("cardboard")) {
        category = "Paper / Cardboard (recyclable)";
        advice =
          "Remove tape or stickers and flatten boxes where possible.";
      } else if (
        name.includes("food") ||
        name.includes("banana") ||
        name.includes("apple")
      ) {
        category = "Food waste (compost)";
        advice = "Place this item in the green/organic waste bin.";
      }

      setResult({
        category,
        confidence: "Mock AI confidence: 82%",
        advice,
      });

      setLoading(false);
    }, 700);
  };

  return (
    <section className="photo-section">
      {/* Show mini title only on dashboard, not full page */}
      {!fullPage && (
        <div className="photo-header-row">
          <div>
            <h2 className="photo-title">Photo / AI Recognition</h2>
            <p className="photo-subtitle">
              Upload a picture of an item to get a suggestion on how to dispose
              of it.
            </p>
          </div>
        </div>
      )}

      <div className="photo-layout">
        <div className="photo-upload">
          <div className="photo-upload-box">
            {preview ? (
              <img src={preview} alt="Preview" />
            ) : (
              <span className="photo-upload-placeholder">
                Drop an image here or click to browse
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button
            className="photo-analyze-btn"
            onClick={analyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze item"}
          </button>

          {error && (
            <p className="error-text" style={{ marginTop: "0.5rem" }}>
              {error}
            </p>
          )}
        </div>

        <div className="photo-result">
          {result ? (
            <div className="photo-result-card">
              <h3>{result.category}</h3>
              <p className="photo-confidence">{result.confidence}</p>
              <p>{result.advice}</p>
              <p className="photo-note">
                *This is a demo AI suggestion only. Always follow your city’s
                official recycling rules.
              </p>
            </div>
          ) : (
            <div className="photo-result-card photo-result-empty">
              <p>
                Upload a photo and click <strong>“Analyze item”</strong> to see
                a suggestion.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UserPhotoAI;

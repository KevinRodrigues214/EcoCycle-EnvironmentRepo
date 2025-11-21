import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPhotoAI({ fullPage = false }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setResult("");
      setConfidence("");
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    if (!imagePreview) return;
    setLoading(true);

    // Fake AI result
    setTimeout(() => {
      const fakeResult =
        "This looks like a plastic container. Place it in your recycling bin if your city accepts #1–#7 plastics.";
      const fakeConfidence = "Confidence: ~82% (demo only)";
      setResult(fakeResult);
      setConfidence(fakeConfidence);
      setLoading(false);
    }, 900);
  };

  return (
    <section className="photo-section">
      <div className="photo-header-row">
        <div>
          <h2 className="photo-title">Photo / AI Recognition</h2>
          <p className="photo-subtitle">
            Upload a picture of an item to get a suggestion on how to dispose of
            it.
          </p>
        </div>
        {!fullPage && (
          <button
            type="button"
            className="section-link"
            onClick={() => navigate("/photo-ai")}
          >
            Open page
          </button>
        )}
      </div>

      <div className="photo-layout">
        <div className="photo-upload">
          <div className="photo-upload-box">
            {imagePreview ? (
              <img src={imagePreview} alt="Uploaded preview" />
            ) : (
              <div className="photo-upload-placeholder">
                Drop an image here or click to browse
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <button
            type="button"
            className="photo-analyze-btn"
            onClick={handleAnalyze}
            disabled={!imagePreview || loading}
          >
            {loading ? "Analyzing..." : "Analyze item"}
          </button>
        </div>

        <div className="photo-result">
          <div className="photo-result-card">
            <h3>Result</h3>
            {result ? (
              <>
                <p>{result}</p>
                <p className="photo-confidence">{confidence}</p>
                <p className="photo-note">
                  This is a demo suggestion only. Always follow your city&apos;s
                  official recycling guidelines.
                </p>
              </>
            ) : (
              <p className="photo-note photo-result-empty">
                Upload a photo and click <strong>“Analyze item”</strong> to see
                a suggestion.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

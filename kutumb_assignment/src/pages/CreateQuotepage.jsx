import React, { useState } from "react";
import "./styles.css";

const CreateQuotePage = ({ token }) => {
  const [quoteText, setQuoteText] = useState("");
  const [image, setImage] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setMediaUrl(data.mediaUrl);
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mediaUrl) {
      await handleImageUpload();
    }

    try {
      const response = await fetch(
        "https://assignment.stage.crafto.app/postQuote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ text: quoteText, mediaUrl }),
        }
      );

      if (response.ok) {
        alert("Quote created successfully!");
        window.location.href = "/quotes";
      } else {
        alert("Failed to create quote.");
        throw new Error(response);
      }
    } catch (error) {
      alert("Error creating quote:", error);
    }
  };

  return (
    <div className="create-quote-container">
      <div className="create-quote-card">
        <h3>Create a New Quote</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter quote text"
            value={quoteText}
            onChange={(e) => setQuoteText(e.target.value)}
            className="create-quote-input"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="create-quote-file"
          />
          <button type="submit" className="create-quote-button">
            Submit Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuotePage;

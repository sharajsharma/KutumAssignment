import React, { useState, useEffect } from "react";
import "./styles.css";

const QuoteListPage = ({ token }) => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(
        `https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${offset}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      if (Array.isArray(data.data)) {
        if (data.data.length === 0) {
          setHasMore(false); 
        } else {
          console.log(data.data, "data");
          setQuotes((prev) => [...prev, ...data.data]);
        }
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchQuotes();
    }
  }, [offset]);
  return (
    <div>
      <h2>Quotes</h2>
      <div className="quote-list-container">
        {quotes.map((quote) => (
          <div key={quote.id} className="quote-card">
            <img
              src={quote.mediaUrl}
              alt={quote.text}
              className="quote-image"
            />
            <div className="quote-details">
              <p>Posted by: {quote.username}</p>
              <p>
                Created at: {new Date(quote.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
        <button
          className="fab"
          onClick={() => (window.location.href = "/create-quote")}
        >
          +
        </button>
      </div>

      {hasMore && (
        <button onClick={() => setOffset(offset + 20)}>Load More</button>
      )}
    </div>
  );
};

export default QuoteListPage;

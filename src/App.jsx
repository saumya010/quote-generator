import { useCallback, useEffect, useRef, useState } from "react";
import getQuotes from "./getQuotes";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef(null);

  const fetchQuote = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    getQuotes(controller.signal)
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Couldn't load a quote. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchQuote();
    return () => abortRef.current?.abort();
  }, [fetchQuote]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote}" — ${author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable, ignore */
    }
  };

  return (
    <div className="page">
      <main className="card">
        <p className="eyebrow">Quote Generator</p>

        {error ? (
          <p className="error" role="alert">
            {error}
          </p>
        ) : (
          <blockquote className={`quote ${loading ? "quote--loading" : ""}`}>
            <p className="quote-text">{loading ? "Loading…" : quote}</p>
            {!loading && <footer className="quote-author">— {author}</footer>}
          </blockquote>
        )}

        <div className="actions">
          <button className="btn btn-primary" onClick={fetchQuote} disabled={loading}>
            New quote
          </button>
          <button className="btn btn-secondary" onClick={handleCopy} disabled={loading || !!error}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;

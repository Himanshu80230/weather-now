import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) onSearch(q.trim());
  };

  return (
    <form onSubmit={submit} className="search-form">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Enter city name..."
        className="search-input"
      />
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
}

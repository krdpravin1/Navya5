import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-xl mx-auto shadow-md rounded-full bg-white px-6 py-3 hover:shadow-lg transition"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search jobs..."
        className="flex-grow outline-none text-gray-700 text-lg"
      />
      <button
        type="submit"
        className="ml-3 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
      >
        Search
      </button>
    </form>
  );
}

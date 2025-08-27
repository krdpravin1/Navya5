import { useState } from "react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  const handleSearch = async (query) => {
    const res = await fetch(`/api/jobSearch?query=${query}`);
    const data = await res.json();
    setJobs(data.results || []);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-50 px-4">
      {/* Logo */}
      <div className="mt-20 mb-10 text-5xl font-semibold text-green-600">
        Navya
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Results */}
      <div className="mt-10 w-full max-w-3xl space-y-4">
        {jobs.length > 0 ? (
          jobs.map((job, idx) => <JobCard key={idx} job={job} />)
        ) : (
          <p className="text-center text-gray-500">Search jobs to get started.</p>
        )}
      </div>
    </main>
  );
}

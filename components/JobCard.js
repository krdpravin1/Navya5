export default function JobCard({ job }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
      <p className="text-gray-600">{job.company?.display_name}</p>
      <p className="text-gray-500 text-sm">{job.location?.display_name}</p>
      <a
        href={job.redirect_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-green-600 font-medium hover:underline"
      >
        View Job →
      </a>
    </div>
  );
}

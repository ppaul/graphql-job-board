import { Link } from 'react-router-dom';

function JobItem({ job, onDelete }) {
  const title = job.company ? `${job.title} at ${job.company.name}` : job.title;
  return (
    <li className="media">
      <div className="media-content">
        <Link to={`/jobs/${job.id}`}>
          {title}
        </Link>
        <button className="button" onClick={() => onDelete(job.id)}>Delete</button>
      </div>
    </li>
  );
}

function JobList({ jobs, onDelete }) {
  return (
    <ul className="box">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default JobList;

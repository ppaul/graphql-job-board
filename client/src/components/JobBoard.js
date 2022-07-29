import JobList from './JobList'
import { getJobs, deleteJob } from '../graphql/queries'
import { useEffect, useState } from 'react'

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const onDelete = (id) => {
    deleteJob(id)
      .then(() => setJobs(jobs.filter(j => j.id !== id)))
  }

  useEffect(() => {
    getJobs().then(setJobs)
  }, []);

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} onDelete={onDelete} />
    </div>
  );
}

export default JobBoard;

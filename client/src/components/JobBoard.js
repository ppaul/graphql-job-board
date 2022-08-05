import JobList from './JobList'
import { JOBS_QUERY, deleteJob } from '../graphql/queries'
import { useQuery } from '@apollo/client';

function JobBoard() {

  const onDelete = id => deleteJob(id); //todo update
  const {
    data,
    loading,
    error
  } = useQuery(JOBS_QUERY, { fetchPolicy: 'network-only' })

  if (error) {
    return <div>Something went wrong</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }


  const { jobs } = data;

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

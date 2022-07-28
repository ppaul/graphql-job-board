import { useParams } from 'react-router';
import { getCompany } from '../graphql/queries';
import { useState, useEffect } from 'react';
import JobList from './JobList'

function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const { companyId } = useParams();

  useEffect(() => {
    getCompany(companyId).then(setCompany);
  }, [companyId]);

  if (!company) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h5 className="title is-5">Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>);
}

export default CompanyDetail;

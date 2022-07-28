import { gql, request } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:9000/graphql'
export async function getJobs() {
  const query = gql`
  query {
    jobs {
      id
      title
      company {
        name
      }
    }
  }
  `;

  const { jobs } = await request(GRAPHQL_URL, query);
  return jobs;
}

export async function getJob(id) {
  const query = gql`
    query getJob($id: ID!) {
      job(id: $id) {
        id
        company {
          id
          name
        }
        description
      }
    }
  `;

  const variables = { id }
  const { job } = await request(GRAPHQL_URL, query, variables);
  return job;
}

export async function getCompany(id) {
  const query = gql`
    query getCompany($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          title
          description
          id
        }
      }
    }
  `;

  const variables = { id }
  const { company } = await request(GRAPHQL_URL, query, variables);
  return company;
}

export async function createJob(input) {
  const query = gql`
    mutation createJob($input: CreateJobInput) {
      job: createJob(input: $input) {
        id
        title
        company {
          id
          name
        }
      }
    }
  `

  const variables = { input }
  return request(GRAPHQL_URL, query, variables);

}




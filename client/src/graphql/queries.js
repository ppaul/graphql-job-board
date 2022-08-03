import { InMemoryCache, ApolloClient, gql } from '@apollo/client';
import { getAccessToken } from '../auth';
const GRAPHQL_URL = 'http://localhost:9000/graphql'

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache()
})

export const JOBS_QUERY = gql`
  query JobsQuery {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }
  `;

export async function getJobs() {
  const { data: { jobs } } = await client.query({ query: JOBS_QUERY, fetchPolicy: 'network-only' });
  return jobs;
}

const JOB_DETAIL_FRAGMENT = gql`
  fragment JobDetail on Job {
    id
    description
    title
    company {
      id
      name
    }
  }
`

const JOB_QUERY = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

export function getJob(id) {
  return client.query({
    query: JOB_QUERY,
    variables: { id }
  });
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
  const result = await client.query({ query, variables });
  return result.job;
}

export function createJob(input) {
  const mutation = gql`
    mutation createJob($input: CreateJobInput) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
    ${JOB_DETAIL_FRAGMENT}
  `

  const variables = { input }
  const context = {
    headers: { Authorization: `Bearer ${getAccessToken()}` }
  }
  return client.mutate({
    mutation, variables, context, update: (cache, { data: { job } }) => {
      cache.writeQuery({
        query: JOB_QUERY,
        variables: { id: job.id },
        data: { job }
      })
    }
  });
}

export async function deleteJob(id) {
  const mutation = gql`
    mutation deleteJob($id: ID!) {
      deleteJob(id: $id) {
        id
      }
    }
  `

  const variables = { id };
  const context = {
    headers: { Authorization: `Bearer ${getAccessToken()}` }
  }
  return client.mutate({ mutation, variables, context })
}




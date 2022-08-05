import { getAccessToken } from '../auth';
import { useMutation } from '@apollo/client';
import { CREATE_JOB_MUTATION, JOB_QUERY } from '../graphql/queries';

export function useCreateJob() {
  const [mutate, { loading, error }] = useMutation(CREATE_JOB_MUTATION, {
    context: {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    },
    update: (cache, { data: { job } }) => {
      cache.writeQuery({
        query: JOB_QUERY,
        variables: { id: job.id },
        data: { job }
      })
    }
  });
  return {
    createJob: async (title, description) => {
      const { data: { job } } = await mutate({
        variables: {
          input: {
            title,
            description
          }
        }
      });
      return job;
    },
    loading,
    error: Boolean(error)
  }
}
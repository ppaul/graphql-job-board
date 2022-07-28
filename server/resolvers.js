import { Job, Company } from './db.js';

export const resolvers = {
  Query: {
    company: (_root, { id }) => Company.findById(id),
    job: (_root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },

  Mutation: {
    createJob: (_root, { input }) => Job.create(input)
  },

  Company: {
    jobs: ({ id }) => Job.findAll(j => j.companyId === id)
  },

  Job: {
    company: ({ companyId }) => Company.findById(companyId)
  }
};

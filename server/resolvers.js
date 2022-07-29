import { Job, Company } from './db.js';

export const resolvers = {
  Query: {
    company: (_root, { id }) => Company.findById(id),
    job: (_root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },

  Mutation: {
    createJob: async (_root, { input }, { user }) => {
      if (!user) {
        throw new Error("Not authorized!");
      }
      return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: (_root, { id }, { user }) => {
      if (!user) {
        throw new Error("Not authorized!");
      }
      const jobToDelete = await Job.findById(id);
      if (jobToDelete.companyId !== user.companyId) {
        throw new Error("Not authorized!");
      }

      return Job.delete(id)
    },
    updateJob: (_root, { input }, { user }) => {
      if (!user) {
        throw new Error("Not authorized!");
      }
      return Job.update(input)
    },
  },

  Company: {
    jobs: ({ id }) => Job.findAll(j => j.companyId === id)
  },

  Job: {
    company: ({ companyId }) => Company.findById(companyId)
  }
};

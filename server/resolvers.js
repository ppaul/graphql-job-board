import { Job, Company } from './db.js';


function checkCondition(condition, errMessage) {
  if (!condition) {
    throw new Error(errMessage);
  }
}

export const resolvers = {
  Query: {
    company: (_root, { id }) => Company.findById(id),
    job: (_root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },

  Mutation: {
    createJob: async (_root, { input }, { user }) => {
      checkCondition(!!user, "Not authorized");
      return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: async (_root, { id }, { user }) => {
      checkCondition(!!user, "Not authorized");
      const jobToDelete = await Job.findById(id);
      checkCondition(jobToDelete.companyId === user.companyId, "You cannot delete a job from other company");

      return Job.delete(id)
    },
    updateJob: async (_root, { input }, { user }) => {
      checkCondition(!!user, "Not authorized");
      const jobToUpdate = await Job.findById(input.id);
      checkCondition(jobToUpdate.companyId === user.companyId, "You cannot update a job from other company");

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

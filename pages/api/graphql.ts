import { ApolloServer, gql } from 'apollo-server-micro';
import { PrismaClient, Employee, Department } from '@prisma/client';
import { internet } from 'faker';

const typeDefs = gql`
  type Query {
    employees(search: String, take: Int = 25, skip: Int = 0): EmployeeListResult
    departments(
      search: String
      take: Int = 10
      skip: Int = 0
    ): DepartmentListResult
    department(id: String): Department
    employee(id: String): Employee
  }

  type EmployeeListResult {
    totalCount: Int
    nodes: [Employee!]!
  }

  type DepartmentListResult {
    totalCount: Int
    nodes: [Department!]!
  }

  type Employee {
    id: ID!
    name: String!
    profileImageUrl: String!
    department: Department!
    title: String!
    location: String
  }

  type Department {
    id: ID!
    name: String!
    employees(take: Int = 25, skip: Int = 0): EmployeeListResult
  }

  type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
  }

  input CreateEmployeeInput {
    name: String!
    title: String!
    location: String!
    departmentId: String!
  }
`;

const client = new PrismaClient();

const resolvers = {
  Query: {
    async employees(
      _parent,
      args: {
        search?: string;
        take?: number;
        skip?: number;
      },
    ) {
      const filters = {
        where: args.search
          ? {
              OR: [
                {
                  name: {
                    contains: args.search,
                  },
                },
                {
                  title: {
                    contains: args.search,
                  },
                },
              ],
            }
          : undefined,
      };

      const nodes = await client.employee.findMany({
        ...filters,
        // normally for a case like this I'd prefer cursor-based pagination, but I'm going
        // to go with the simpler offset-based just to keep things straightforward.
        take: args.take ?? 25,
        skip: args.skip ?? 0,
        orderBy: {
          name: 'asc',
        },
      });
      const totalCount = await client.employee.count({
        ...filters,
      });

      return {
        totalCount,
        nodes,
      };
    },
    async departments(
      _parent,
      args: { search?: string; take?: number; skip?: number },
    ) {
      const filters = {
        where: {
          ...(args.search ? { name: { contains: args.search } } : {}),
        },
      };

      const nodes = await client.department.findMany({
        ...filters,
        take: args.take ?? 10,
        skip: args.skip ?? 0,
        orderBy: {
          name: 'asc',
        },
      });
      const totalCount = await client.department.count({
        ...filters,
      });

      return {
        totalCount,
        nodes,
      };
    },
    department(_parent, args: { id: string }) {
      return client.department.findOne({
        where: {
          id: args.id,
        },
      });
    },
    employee(_parent, args: { id: string }) {
      return client.employee.findOne({
        where: {
          id: args.id,
        },
      });
    },
  },

  Mutation: {
    createEmployee(
      _parent,
      {
        input,
      }: {
        input: {
          name: string;
          title: string;
          location: string;
          departmentId: string;
        };
      },
    ) {
      return client.employee.create({
        data: {
          name: input.name,
          title: input.title,
          location: input.location,
          profileImageUrl: internet.avatar(),
          department: {
            connect: {
              id: input.departmentId,
            },
          },
        },
      });
    },
  },

  Employee: {
    department(employee: Employee) {
      return client.employee
        .findOne({
          where: {
            id: employee.id,
          },
        })
        .department();
    },
  },

  Department: {
    async employees(
      department: Department,
      args: { take?: number; skip?: number },
    ) {
      // HACK ALERT - Prisma doesn't yet support counting the total number of related
      // models. So instead, I'm just fetching all the models outright and then
      // slicing them down. It's a *little* silly. Cursor-based pagination (like Relay)
      // would be a better overall pattern for the kind of usage I have in the UI
      // in a real production app. If this was a production app, I'd make that
      // suggestion right about now - but for this exercise I don't think refactoring
      // the whole pagination approach is really warranted.
      const allEmployees = await client.department
        .findOne({
          where: {
            id: department.id,
          },
        })
        .employees({
          orderBy: {
            name: 'asc',
          },
        });
      const totalCount = allEmployees.length;
      const skip = args.skip ?? 0;
      const nodes = allEmployees.slice(skip, skip + (args.take ?? 25));
      return {
        totalCount,
        nodes,
      };
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export default apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

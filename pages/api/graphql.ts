import { ApolloServer, gql } from 'apollo-server-micro';
import { PrismaClient, Employee, Department } from '@prisma/client';

const typeDefs = gql`
  type Query {
    employees(
      nameFilter: String
      titleFilter: String
      take: Int = 25
      skip: Int = 0
    ): [Employee!]!
    departments(
      nameFilter: String
      take: Int = 10
      skip: Int = 0
    ): [Department!]!
    department(id: String): Department
    employee(id: String): Employee
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
    employees(take: Int = 25, skip: Int = 0): [Employee!]!
  }
`;

const client = new PrismaClient();

const resolvers = {
  Query: {
    employees(
      _parent,
      args: {
        nameFilter?: string;
        titleFilter?: string;
        take?: number;
        skip?: number;
      },
    ) {
      return client.employee.findMany({
        where: {
          ...(args.nameFilter ? { name: { contains: args.nameFilter } } : {}),
          ...(args.titleFilter
            ? { title: { contains: args.titleFilter } }
            : {}),
        },
        // normally for a case like this I'd prefer cursor-based pagination, but I'm going
        // to go with the simpler offset-based just to keep things straightforward.
        take: args.take ?? 25,
        skip: args.skip ?? 0,
        orderBy: {
          name: 'asc',
        },
      });
    },
    departments(
      _parent,
      args: { nameFilter?: string; take?: number; skip?: number },
    ) {
      return client.department.findMany({
        where: {
          ...(args.nameFilter ? { name: { contains: args.nameFilter } } : {}),
        },
        take: args.take ?? 10,
        skip: args.skip ?? 0,
        orderBy: {
          name: 'asc',
        },
      });
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
    employees(department: Department, args: { take?: number; skip?: number }) {
      return client.department
        .findOne({
          where: {
            id: department.id,
          },
        })
        .employees({
          take: args.take ?? 25,
          skip: args.skip ?? 0,
          orderBy: {
            name: 'asc',
          },
        });
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

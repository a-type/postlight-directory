import Head from 'next/head';
import { Container, Box, Button, Typography } from '@material-ui/core';
import { Navigation } from '../../components/Navigation';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { EmployeeGrid } from '../../components/EmployeeGrid';
import { useCallback } from 'react';

const DepartmentEmployeesQuery = gql`
  query DepartmentEmployees($id: String, $take: Int, $skip: Int) {
    department(id: $id) {
      id
      name
      employees(take: $take, skip: $skip) {
        totalCount
        nodes {
          id
          name
          title
          profileImageUrl
        }
      }
    }
  }
`;

export default function DepartmentEmployees() {
  const router = useRouter();
  const { deptId: departmentId } = router.query;

  const { data, fetchMore } = useQuery<{
    department: {
      id: string;
      name: string;
      employees: {
        totalCount: number;
        nodes: {
          id: string;
          name: string;
          title: string;
          profileImageUrl: string;
        }[];
      };
    };
  }>(DepartmentEmployeesQuery, {
    variables: {
      id: departmentId,
      take: 25,
      skip: 0,
    },
  });
  const employees = data?.department.employees.nodes ?? [];
  const totalCount = data?.department.employees.totalCount ?? 0;

  const currentCount = employees.length ?? 0;

  const getNextPage = useCallback(() => {
    fetchMore({
      variables: {
        take: 25,
        skip: currentCount,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        // concat the new items onto the list
        return {
          ...prev,
          department: {
            ...prev.department,
            employees: {
              totalCount: fetchMoreResult.department.employees.totalCount,
              nodes: [
                ...prev.department.employees.nodes,
                ...fetchMoreResult.department.employees.nodes,
              ],
            },
          },
        };
      },
    });
  }, [fetchMore, currentCount]);

  return (
    <>
      <Head>
        <title>Departments</title>
      </Head>
      <Navigation />
      <Container maxWidth="lg">
        <Box pt={3}>
          <Typography variant="h2" gutterBottom>
            {data?.department.name ?? 'Loading'}
          </Typography>
          <Typography variant="h3" gutterBottom>
            {totalCount} members
          </Typography>
          <EmployeeGrid employees={employees} />
          {totalCount > currentCount && (
            <Button onClick={getNextPage} style={{ marginTop: 16 }}>
              Show more
            </Button>
          )}
        </Box>
      </Container>
    </>
  );
}

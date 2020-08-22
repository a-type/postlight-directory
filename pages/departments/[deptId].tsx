import Head from 'next/head';
import { Container, Box, Button } from '@material-ui/core';
import { Navigation } from '../../components/Navigation';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { EmployeeGrid } from '../../components/EmployeeGrid';
import { useCallback } from 'react';

const DepartmentEmployeesQuery = gql`
  query DepartmentEmployees($id: String, $take: Int, $skip: Int) {
    department(id: $id) {
      id
      employees(take: $take, skip: $skip) {
        id
        name
        title
        profileImageUrl
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
      employees: {
        id: string;
        name: string;
        title: string;
        profileImageUrl: string;
      }[];
    };
  }>(DepartmentEmployeesQuery, {
    variables: {
      id: departmentId,
      take: 25,
      skip: 0,
    },
  });

  const currentCount = data?.department.employees.length ?? 0;

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
            employees: [
              ...prev.department.employees,
              ...fetchMoreResult.department.employees,
            ],
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
          {data && (
            <>
              <EmployeeGrid employees={data.department?.employees ?? []} />
              <Button onClick={getNextPage}>Show more</Button>
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

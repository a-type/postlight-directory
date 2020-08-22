import Head from 'next/head';
import { Container, Box, Button } from '@material-ui/core';
import { Navigation } from '../components/Navigation';
import { gql, useQuery } from '@apollo/client';
import { EmployeeGrid } from '../components/EmployeeGrid';
import { useCallback } from 'react';

const EmployeesQuery = gql`
  query Employees($take: Int, $skip: Int) {
    employees(take: $take, skip: $skip) {
      id
      name
      profileImageUrl
      title
    }
  }
`;
export default function Home() {
  const { data, fetchMore } = useQuery<{
    employees: {
      id: string;
      name: string;
      profileImageUrl: string;
      title: string;
    }[];
  }>(EmployeesQuery, {
    variables: {
      take: 25,
      skip: 0,
    },
  });

  const currentCount = data?.employees.length ?? 0;

  const getNextPage = useCallback(() => {
    fetchMore({
      variables: {
        take: 25,
        skip: currentCount,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...prev,
          employees: [...prev.employees, ...fetchMoreResult.employees],
        };
      },
    });
  }, [fetchMore, currentCount]);

  return (
    <>
      <Head>
        <title>Directory Home</title>
      </Head>
      <Navigation />
      <Container maxWidth="lg">
        <Box pt={3}>
          {data && (
            <>
              <EmployeeGrid employees={data.employees ?? []} />
              <Button onClick={getNextPage}>Show more</Button>
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

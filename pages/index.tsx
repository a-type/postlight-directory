import Head from 'next/head';
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import { Navigation } from '../components/Navigation';
import { gql, useQuery } from '@apollo/client';
import { EmployeeGrid } from '../components/EmployeeGrid';
import { useCallback, useState, useMemo, ChangeEvent } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const EmployeesQuery = gql`
  query Employees($take: Int, $skip: Int, $search: String) {
    employees(take: $take, skip: $skip, search: $search) {
      totalCount
      nodes {
        id
        name
        profileImageUrl
        title
      }
    }
  }
`;
export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  // debounce the changes to the value before using it as a search filter,
  // also dropping anything with less than 2 chars
  const debouncedSearchTerm = useDebounce(
    searchTerm.length > 2 ? searchTerm : '',
    500,
  );

  const { data, fetchMore } = useQuery<{
    employees: {
      totalCount: number;
      nodes: {
        id: string;
        name: string;
        profileImageUrl: string;
        title: string;
      }[];
    };
  }>(EmployeesQuery, {
    variables: {
      take: 25,
      skip: 0,
      search: debouncedSearchTerm.length ? debouncedSearchTerm : undefined,
    },
  });
  const employees = data?.employees.nodes ?? [];
  const totalCount = data?.employees.totalCount ?? 0;

  const currentCount = employees.length ?? 0;

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
          employees: {
            totalCount: fetchMoreResult.employees.totalCount,
            nodes: [
              ...prev.employees.nodes,
              ...fetchMoreResult.employees.nodes,
            ],
          },
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
        <Box my={3} pt={3}>
          <TextField
            label="Search employees"
            placeholder="Name or title"
            onChange={(ev) => setSearchTerm(ev.target.value)}
            value={searchTerm}
          />
        </Box>
        <Box>
          <Typography variant="h3" gutterBottom>
            {totalCount} results
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

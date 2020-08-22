import Head from 'next/head';
import { Container, Box, TextField, Typography } from '@material-ui/core';
import { Navigation } from '../../components/Navigation';
import { useQuery, gql } from '@apollo/client';
import { DepartmentGrid } from '../../components/DepartmentGrid';
import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

const DepartmentsQuery = gql`
  query Departments($search: String) {
    departments(search: $search) {
      totalCount
      nodes {
        id
        name
        # just showing a few employees in each dept for this view
        employees(take: 10) {
          totalCount
          nodes {
            id
            name
          }
        }
      }
    }
  }
`;

export default function Departments() {
  const [searchTerm, setSearchTerm] = useState('');
  // debounce the changes to the value before using it as a search filter,
  // also dropping anything with less than 2 chars
  const debouncedSearchTerm = useDebounce(
    searchTerm.length > 2 ? searchTerm : '',
    500,
  );

  const { data } = useQuery<{
    departments: {
      totalCount: number;
      nodes: {
        id: string;
        name: string;
        employees: {
          totalCount: number;
          nodes: {
            id: string;
            name: string;
          }[];
        };
      }[];
    };
  }>(DepartmentsQuery, {
    variables: {
      search: debouncedSearchTerm.length ? debouncedSearchTerm : undefined,
    },
  });

  const departments = data?.departments.nodes ?? [];
  const totalCount = data?.departments.totalCount;

  return (
    <>
      <Head>
        <title>Departments</title>
      </Head>
      <Navigation />
      <Container maxWidth="lg">
        <Box my={3} pt={3}>
          <TextField
            label="Search departments"
            placeholder="Name"
            onChange={(ev) => setSearchTerm(ev.target.value)}
            value={searchTerm}
          />
        </Box>
        <Box>
          <Typography variant="h3" gutterBottom>
            {totalCount} results
          </Typography>
          <DepartmentGrid departments={departments} />
        </Box>
      </Container>
    </>
  );
}

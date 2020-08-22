import Head from 'next/head';
import { Container, Box, TextField } from '@material-ui/core';
import { Navigation } from '../../components/Navigation';
import { useQuery, gql } from '@apollo/client';
import { DepartmentGrid } from '../../components/DepartmentGrid';
import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

const DepartmentsQuery = gql`
  query Departments($search: String) {
    departments(search: $search) {
      id
      name
      # just showing a few employees in each dept for this view
      employees(take: 10) {
        id
        name
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
      id: string;
      name: string;
      employees: {
        id: string;
        name: string;
      }[];
    }[];
  }>(DepartmentsQuery, {
    variables: {
      search: debouncedSearchTerm.length ? debouncedSearchTerm : undefined,
    },
  });

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
          {data && <DepartmentGrid departments={data.departments ?? []} />}
        </Box>
      </Container>
    </>
  );
}

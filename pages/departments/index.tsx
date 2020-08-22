import Head from 'next/head';
import { Container, Box } from '@material-ui/core';
import { Navigation } from '../../components/Navigation';
import { useQuery, gql } from '@apollo/client';
import { DepartmentGrid } from '../../components/DepartmentGrid';

const DepartmentsQuery = gql`
  query {
    departments {
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
  const { data, loading } = useQuery<{
    departments: {
      id: string;
      name: string;
      employees: {
        id: string;
        name: string;
      }[];
    }[];
  }>(DepartmentsQuery);

  return (
    <>
      <Head>
        <title>Departments</title>
      </Head>
      <Navigation />
      <Container maxWidth="lg">
        <Box pt={3}>
          {data && <DepartmentGrid departments={data.departments ?? []} />}
        </Box>
      </Container>
    </>
  );
}

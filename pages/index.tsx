import Head from 'next/head';
import { Container, Box } from '@material-ui/core';
import { Navigation } from '../components/Navigation';
import { gql, useQuery } from '@apollo/client';
import { EmployeeGrid } from '../components/EmployeeGrid';

const EmployeesQuery = gql`
  query {
    employees {
      id
      name
      profileImageUrl
      title
    }
  }
`;
export default function Home() {
  const { data } = useQuery<{
    employees: {
      id: string;
      name: string;
      profileImageUrl: string;
      title: string;
    }[];
  }>(EmployeesQuery);

  return (
    <>
      <Head>
        <title>Directory Home</title>
      </Head>
      <Navigation />
      <Container maxWidth="lg">
        <Box pt={3}>
          {data && <EmployeeGrid employees={data.employees ?? []} />}
        </Box>
      </Container>
    </>
  );
}

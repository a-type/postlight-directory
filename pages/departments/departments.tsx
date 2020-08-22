import Head from 'next/head';
import { Container, Box } from '@material-ui/core';
import { Navigation } from '../../components/Navigation';
import { DepartmentDirectory } from '../../components/DepartmentDirectory';

export default function Departments() {
  return (
    <>
      <Head>
        <title>Departments</title>
      </Head>
      <Navigation />
      <Container maxWidth="lg">
        <Box pt={3}>
          <DepartmentDirectory />
        </Box>
      </Container>
    </>
  );
}

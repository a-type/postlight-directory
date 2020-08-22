import Head from 'next/head';
import { Container, Box } from '@material-ui/core';
import { Navigation } from '../components/Navigation';
import { EmployeeDirectory } from '../components/EmployeeDirectory';

export default function Home() {
  return (
    <>
      <Navigation />
      <Container maxWidth="lg">
        <Box pt={3}>
          <EmployeeDirectory />
        </Box>
      </Container>
    </>
  );
}

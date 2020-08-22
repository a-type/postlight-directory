import * as React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Head from 'next/head';
import { Container, Box, Typography } from '@material-ui/core';
import { EmployeeCreateForm } from '../../components/EmployeeCreateForm';
import { Navigation } from '../../components/Navigation';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

export type CreateEmployeeProps = {};

const CreateEmployeeMutation = gql`
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      id
    }
  }
`;

const DepartmentsQuery = gql`
  query {
    departments {
      nodes {
        id
        name
      }
    }
  }
`;

export default function CreateEmployee() {
  const router = useRouter();

  const [mutate] = useMutation(CreateEmployeeMutation);
  const { data } = useQuery<{
    departments: { nodes: { id: string; name: string }[] };
  }>(DepartmentsQuery);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = React.useCallback(
    async (data: {
      name: string;
      title: string;
      location: string;
      departmentId: string;
    }) => {
      try {
        const result = await mutate({
          variables: {
            input: data,
          },
        });
        // redirect to employee page
        const employeeId = result.data?.createEmployee.id;
        await router.push('/employees/[empId]', `/employees/${employeeId}`);
      } catch (err) {
        console.error(err);
        enqueueSnackbar('Failed to create employee - try again?', {
          variant: 'error',
        });
      }
    },
    [mutate, enqueueSnackbar],
  );

  return (
    <>
      <Head>
        <title>Create employee</title>
      </Head>
      <Navigation />
      <Container maxWidth="lg">
        <Box pt={3}>
          <Typography variant="h2" gutterBottom>
            Create employee
          </Typography>
          <EmployeeCreateForm
            departments={data?.departments?.nodes ?? []}
            onSubmit={handleSubmit}
          />
        </Box>
      </Container>
    </>
  );
}

import Head from 'next/head';
import {
  Container,
  Box,
  Avatar,
  Typography,
  Link as MuiLink,
} from '@material-ui/core';
import { Navigation } from '../../components/Navigation';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ErrorMessage } from '../../components/ErrorMessage';
import Link from 'next/link';

const EmployeeQuery = gql`
  query Employee($id: String) {
    employee(id: $id) {
      id
      name
      title
      profileImageUrl
      location

      department {
        id
        name
      }
    }
  }
`;

export default function DepartmentEmployees() {
  const router = useRouter();
  const { empId: employeeId } = router.query;

  // fetches data for an individual employee, including their department
  const { data, error } = useQuery<{
    employee: {
      id: string;
      name: string;
      title: string;
      profileImageUrl: string;
      location: string;
      department: {
        id: string;
        name: string;
      };
    };
  }>(EmployeeQuery, {
    variables: {
      id: employeeId,
    },
  });

  return (
    <>
      <Head>
        <title>{data?.employee?.name ?? 'Loading'}</title>
      </Head>
      <Navigation />
      <Container maxWidth="lg">
        <Box pt={3}>
          {data && (
            <>
              <Avatar
                style={{ width: '20vmin', height: '20vmin' }}
                src={data.employee.profileImageUrl}
              />
              <Typography variant="h2" gutterBottom>
                {data.employee.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {data.employee.title}
              </Typography>
              <Typography variant="caption">
                {data.employee.location}
              </Typography>
              <Typography paragraph>
                <span>Department: </span>
                <MuiLink
                  component={Link}
                  color="primary"
                  href="/departments/[deptId]"
                  as={`/departments/${data.employee.department.id}`}
                >
                  {data.employee.department.name}
                </MuiLink>
              </Typography>
            </>
          )}
          {error && (
            <Typography color="error">
              <ErrorMessage error={error.message} />
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
}

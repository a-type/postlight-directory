import * as React from 'react';
import { useQuery } from 'urql';
import { Grid } from '@material-ui/core';
import { EmployeeCard } from './EmployeeCard';

const EmployeesQuery = `
  query {
    employees {
      id
      name
      profileImageUrl
      title
    }
  }
`;

export function EmployeeDirectory() {
  const [result] = useQuery<{
    employees: {
      id: string;
      name: string;
      profileImageUrl: string;
      title: string;
    }[];
  }>({
    query: EmployeesQuery,
  });

  return (
    <Grid container spacing={3}>
      {result.data?.employees.map((employee) => (
        <Grid key={employee.id} item xs={12} sm={6} md={4} lg={3}>
          <EmployeeCard employee={employee} />
        </Grid>
      ))}
    </Grid>
  );
}

import * as React from 'react';
import { Grid } from '@material-ui/core';
import { EmployeeCard } from './EmployeeCard';

export type EmployeeGridProps = {
  employees: {
    id: string;
    name: string;
    profileImageUrl: string;
    title: string;
  }[];
};

export function EmployeeGrid({ employees }: EmployeeGridProps) {
  return (
    <Grid container spacing={3}>
      {employees.map((employee) => (
        <Grid key={employee.id} item xs={12} sm={6} md={4} lg={3}>
          <EmployeeCard employee={employee} />
        </Grid>
      ))}
    </Grid>
  );
}

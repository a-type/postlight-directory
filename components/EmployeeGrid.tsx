import * as React from 'react';
import { Grid } from '@material-ui/core';
import { EmployeeCard } from './EmployeeCard';
import { EmployeeCardSkeleton } from './EmployeeCardSkeleton';

export type EmployeeGridProps = {
  employees: {
    id: string;
    name: string;
    profileImageUrl: string;
    title: string;
  }[];
  initializing: boolean;
};

export function EmployeeGrid({ employees, initializing }: EmployeeGridProps) {
  if (initializing) {
    return (
      <Grid container spacing={3}>
        {new Array(25).fill(null).map((_, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
            <EmployeeCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

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

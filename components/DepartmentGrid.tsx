import * as React from 'react';
import { Grid } from '@material-ui/core';
import { DepartmentCard } from './DepartmentCard';

export type DepartmentGridProps = {
  departments: {
    id: string;
    name: string;
    employees: {
      id: string;
      name: string;
    }[];
  }[];
};

export function DepartmentGrid({ departments }: DepartmentGridProps) {
  return (
    <Grid container spacing={3}>
      {departments.map((department) => (
        <Grid key={department.id} item xs={12} md={6} lg={4}>
          <DepartmentCard department={department} />
        </Grid>
      ))}
    </Grid>
  );
}

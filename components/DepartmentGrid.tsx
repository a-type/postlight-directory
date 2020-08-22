import * as React from 'react';
import { Grid } from '@material-ui/core';
import { DepartmentCard } from './DepartmentCard';
import { DepartmentCardSkeleton } from './DepartmentCardSkeleton';

export type DepartmentGridProps = {
  departments: {
    id: string;
    name: string;
    employees: {
      totalCount: number;
      nodes: {
        id: string;
        name: string;
      }[];
    };
  }[];
  initializing: boolean;
};

export function DepartmentGrid({
  departments,
  initializing,
}: DepartmentGridProps) {
  if (initializing) {
    return (
      <Grid container spacing={3}>
        {new Array(10).fill(null).map((_, idx) => (
          <Grid key={idx} item xs={12} md={6} lg={4}>
            <DepartmentCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

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

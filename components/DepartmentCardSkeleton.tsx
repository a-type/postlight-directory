import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

/**
 * A loading state item for the department grid
 */
export function DepartmentCardSkeleton() {
  return (
    <Card>
      <CardHeader title={<Skeleton />} />
      <CardContent>
        <Skeleton height={160} />
      </CardContent>
    </Card>
  );
}

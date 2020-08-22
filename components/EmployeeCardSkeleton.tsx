import * as React from 'react';
import { Card, CardHeader, Avatar } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export function EmployeeCardSkeleton() {
  return (
    <Card>
      <CardHeader
        title={<Skeleton />}
        subheader={<Skeleton height="40px" />}
        avatar={
          <Skeleton variant="circle">
            <Avatar />
          </Skeleton>
        }
      />
    </Card>
  );
}

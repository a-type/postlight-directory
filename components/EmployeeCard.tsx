import * as React from 'react';
import { Card, CardHeader, Avatar, makeStyles } from '@material-ui/core';

export type EmployeeCardProps = {
  employee: {
    id: string;
    name: string;
    profileImageUrl: string;
    title: string;
  };
};

const useStyles = makeStyles((theme) => ({
  avatar: {},
}));

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={employee.name}
        subheader={employee.title}
        avatar={
          <Avatar src={employee.profileImageUrl} className={classes.avatar} />
        }
      />
    </Card>
  );
}

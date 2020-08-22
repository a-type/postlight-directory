import * as React from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  makeStyles,
  CardActionArea,
} from '@material-ui/core';
import Link from 'next/link';

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
      <Link href="/employees/[empId]" as={`/employees/${employee.id}`}>
        <CardActionArea>
          <CardHeader
            title={employee.name}
            subheader={employee.title}
            avatar={
              <Avatar
                src={employee.profileImageUrl}
                className={classes.avatar}
              />
            }
          />
        </CardActionArea>
      </Link>
    </Card>
  );
}

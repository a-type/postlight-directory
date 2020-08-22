import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Chip,
  makeStyles,
  CardActionArea,
} from '@material-ui/core';
import Link from 'next/link';

export type DepartmentCardProps = {
  department: {
    id: string;
    name: string;
    employees: {
      id: string;
      name: string;
    }[];
  };
};

const useStyles = makeStyles((theme) => ({
  chip: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export function DepartmentCard({ department }: DepartmentCardProps) {
  const classes = useStyles();

  return (
    <Card>
      <Link href="/departments/[deptId]" as={`/departments/${department.id}`}>
        <CardActionArea>
          <CardHeader title={department.name} />
          <CardContent>
            {department.employees.map((employee) => (
              <Chip
                key={employee.id}
                label={employee.name}
                className={classes.chip}
              />
            ))}
            <span>... and more</span>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

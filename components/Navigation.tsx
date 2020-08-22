import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 'bold',
    fontStyle: 'italic',
    cursor: 'pointer',
  },
}));

export function Navigation() {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/*
          Brand randomly generated using Brandmark, which is always fun.
        */}
        <Link href="/">
          <Typography variant="h1" className={classes.title}>
            Socient
          </Typography>
        </Link>
        <Link href="/departments">
          <Button color="inherit" href="/departments">
            Departments
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

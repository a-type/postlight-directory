import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { PersonAdd, Business } from '@material-ui/icons';
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

/**
 * Global navigation bar for the whole app
 */
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
        <Link href="/employees/create">
          <Tooltip title="Add employee">
            <IconButton color="inherit">
              <PersonAdd />
            </IconButton>
          </Tooltip>
        </Link>
        <Link href="/departments">
          <Tooltip title="Departments">
            <IconButton color="inherit">
              <Business />
            </IconButton>
          </Tooltip>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

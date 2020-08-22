import * as React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 'bold',
    fontStyle: 'italic',
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
        <Typography variant="h1" className={classes.title}>
          Socient
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

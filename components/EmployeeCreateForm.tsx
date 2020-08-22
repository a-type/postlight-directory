import * as React from 'react';
import { Formik, FastField, Field } from 'formik';
import { TextField, MenuItem, Button } from '@material-ui/core';

export type EmployeeCreateFormProps = {
  onSubmit: (data: {
    title: string;
    name: string;
    location: string;
    departmentId: string;
  }) => Promise<void>;
  departments: { id: string; name: string }[];
};

const initialValues = {
  name: '',
  title: '',
  location: '',
  departmentId: '',
};

export function EmployeeCreateForm({
  onSubmit,
  departments,
}: EmployeeCreateFormProps) {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <FastField name="name">
              {({ field }) => (
                <TextField label="Name" margin="normal" fullWidth {...field} />
              )}
            </FastField>
            <FastField name="title">
              {({ field }) => (
                <TextField label="Title" margin="normal" fullWidth {...field} />
              )}
            </FastField>
            <FastField name="location">
              {({ field }) => (
                <TextField
                  label="Location"
                  margin="normal"
                  fullWidth
                  {...field}
                />
              )}
            </FastField>
            <Field name="departmentId">
              {({ field }) => (
                <TextField
                  select
                  label="Department"
                  margin="normal"
                  fullWidth
                  {...field}
                >
                  {departments.map((dept) => (
                    <MenuItem value={dept.id} key={dept.id}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Field>
          </div>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Create
          </Button>
        </form>
      )}
    </Formik>
  );
}

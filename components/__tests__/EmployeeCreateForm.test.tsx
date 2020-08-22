import {
  render,
  fireEvent,
  waitFor,
  getByRole,
  within,
} from '@testing-library/react';
import { EmployeeCreateForm } from '../EmployeeCreateForm';

test('EmployeeCreateForm can submit employee data', async () => {
  const departments = [
    {
      id: '1',
      name: 'First',
    },
    {
      id: '2',
      name: 'Second',
    },
  ];
  const onSubmit = jest.fn();

  const result = render(
    <EmployeeCreateForm departments={departments} onSubmit={onSubmit} />,
  );

  fireEvent.change(result.getByLabelText('Name', { exact: false }), {
    target: { value: 'Test Name' },
  });
  fireEvent.change(result.getByLabelText('Title', { exact: false }), {
    target: { value: 'Test Title' },
  });
  fireEvent.change(result.getByLabelText('Location', { exact: false }), {
    target: { value: 'Raleigh, NC' },
  });

  const departmentSelectButton = result.getByLabelText('Department', {
    exact: false,
  });
  fireEvent.mouseDown(departmentSelectButton);
  const menu = within(getByRole(document.body, 'listbox'));
  const item = menu.getByText('Second');
  fireEvent.click(item);

  fireEvent.click(result.getByText('Create'));

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith(
      {
        name: 'Test Name',
        title: 'Test Title',
        location: 'Raleigh, NC',
        departmentId: '2',
      },
      expect.anything(),
    );
  });
});

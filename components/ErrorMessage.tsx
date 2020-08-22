import * as React from 'react';

export type ErrorMessageProps = {
  error: string;
};

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (process.env.NODE_ENV === 'production') {
    return <>Something went wrong</>;
  }
  return <>{error}</>;
}

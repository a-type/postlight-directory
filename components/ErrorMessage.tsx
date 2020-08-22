import * as React from 'react';

export type ErrorMessageProps = {
  error: string;
};

/**
 * Displays a network error in development, and a generic error
 * in production.
 */
export function ErrorMessage({ error }: ErrorMessageProps) {
  if (process.env.NODE_ENV === 'production') {
    return <>Something went wrong</>;
  }
  return <>{error}</>;
}

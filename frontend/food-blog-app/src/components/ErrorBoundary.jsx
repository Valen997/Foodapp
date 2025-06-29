import React from 'react';

export default function ErrorBoundary({ error }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
      <h2>Something went wrong!</h2>
      <p>{error?.message || 'An unexpected error occurred.'}</p>
      <p>Please try refreshing the page or come back later.</p>
    </div>
  );
}

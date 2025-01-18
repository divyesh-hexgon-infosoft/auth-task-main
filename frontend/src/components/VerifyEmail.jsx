import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL } from '../graphql/mutations';
import { useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verifyEmail, { data, error }] = useMutation(VERIFY_EMAIL);

  useEffect(() => {
    if (token) verifyEmail({ variables: { token } });
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {data && <p>{data.verifyEmail}</p>}
    </div>
  );
};

export default VerifyEmail;

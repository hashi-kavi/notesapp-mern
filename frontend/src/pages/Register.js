import React from 'react';
import AuthForm from '../components/AuthForm';

function Register() {
  return (
    <AuthForm
      title="Create Account"
      subtitle="Join us today"
      buttonText="Create Account"
      loadingText="Creating Account..."
      linkText="Already have an account?"
      linkHref="/login"
      linkAnchorText="Sign in"
      apiEndpoint="/auth/register"
      usernamePlaceholder="Enter your username"
      passwordPlaceholder="Create a password"
      usernameId="username"
      passwordId="password"
      errorMessage="Registration failed"
    />
  );
}

export default Register;

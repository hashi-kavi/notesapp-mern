import React from 'react';
import AuthForm from '../components/AuthForm';

function Login() {
  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Sign in to your account"
      buttonText="Sign In"
      loadingText="Signing In..."
      linkText="Don't have an account?"
      linkHref="/register"
      linkAnchorText="Sign up"
      apiEndpoint="/auth/login"
      usernamePlaceholder="Enter your username"
      passwordPlaceholder="Enter your password"
      usernameId="login-username"
      passwordId="login-password"
      errorMessage="Login failed"
    />
  );
}

export default Login;

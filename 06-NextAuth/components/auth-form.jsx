"use client";

import { auth } from "@/actions/auth.actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function AuthForm({ mode }) {
  const [{ errors }, formAction] = useFormState(auth.bind(null, mode), {});

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {errors && (
        <ul id="form-errors">
          {Object.keys(errors).map((error) => (
            <li key={error}>{errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">
          {mode === "login" && "Login"}
          {mode === "sign-up" && "Sign up"}
        </button>
      </p>
      <p>
        {mode === "login" && (
          <Link href="/?mode=sign-up">Create an account.</Link>
        )}
        {mode === "sign-up" && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}

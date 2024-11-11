"use client";

import { useFormStatus } from "react-dom";

export default function FormSubmit() {
  const status = useFormStatus();

  return (
    <>
      <button type="reset">Reset</button>
      <button type="submit" disabled={status.pending}>
        {status.pending ? "Creating..." : "Create Post"}
      </button>
    </>
  );
}

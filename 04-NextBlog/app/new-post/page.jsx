"use client";

import { createPost } from "@/actions/posts";
import Form from "@/components/form";

export default function NewPostPage() {
  return (
    <>
      <h1>Create a new post</h1>
      <Form action={createPost} />
    </>
  );
}

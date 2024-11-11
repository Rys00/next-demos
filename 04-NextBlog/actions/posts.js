"use server";

import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { uploadImage } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title field is required.");
  }
  if (!image || image.size === 0) {
    errors.push("Image field is required.");
  }
  if (!content || content.trim().length === 0) {
    errors.push("Content field is required.");
  }

  if (errors.length > 0) {
    return { errors: errors };
  }

  const slug = slugify(title, { lower: true });
  const extension = image.name.split(".").pop();
  const fileName = `${slug}.${extension}`;

  try {
    const imagePath = await uploadImage(fileName, image);
    await storePost({
      userId: 1,
      title: title,
      content: content,
      imageUrl: imagePath,
    });
  } catch (error) {
    return { errors: [error.message] };
  }

  revalidatePath("/feed");
  redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/feed");
}

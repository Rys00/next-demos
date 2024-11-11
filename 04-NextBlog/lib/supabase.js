import "server-only";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

function randomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export async function uploadImage(fileName, fileBody, transformable = true) {
  if (transformable) {
    if (fileBody.size >= 25000000)
      throw new Error("Image size can not exceed 25MB.");

    // npm install buffer-image-size
    let sizeOf = require("buffer-image-size");
    let dimensions = sizeOf(Buffer.from(await fileBody.arrayBuffer()));

    if (dimensions.width >= 2500 || dimensions.height >= 2500)
      throw new Error("Image dimensions can not exceed 2500px.");
  }

  const parts = fileName.split(".");
  const extension = parts.pop();
  const name = parts.join(".");
  const randomizedFileName = `${name}-${randomString(10)}.${extension}`;

  const { data, error } = await supabase.storage
    .from("test-images")
    .upload(randomizedFileName, fileBody);

  if (error) {
    throw new Error(
      `An error occurred while trying to upload file '${randomizedFileName}': ${error.message}`
    );
  }

  return data.fullPath;
}

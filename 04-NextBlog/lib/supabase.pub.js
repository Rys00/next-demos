export function getPublicUrl(imageFullPath) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${imageFullPath}`;
}

export function supabaseImageLoader(config) {
  const { src, width, height, quality } = config;
  if (!src) throw new Error("src field is required");
  let params = [];
  if (width) params.push(`width=${width}`);
  if (height && !width) params.push(`height=${height}`);
  if (quality) params.push(`quality=${quality}`);
  return `${
    process.env.NEXT_PUBLIC_SUPABASE_URL
  }/storage/v1/render/image/public/${config.src}${
    params.length > 0 ? `?${params.join("&")}` : ""
  }`;
}

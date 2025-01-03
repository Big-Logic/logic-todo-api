// db
import supabase from "../../../config/supabase.config.mjs";

// utils
import asyncWrapper from "../../../utils/asyncWrapper.mjs";
import SupabaseError from "../../../utils/supabaseError.mjs";

export default asyncWrapper(async (req, res) => {
  //
  const { user_id } = req.query;

  //
  const { name: imageName, data: imageData } = req.files.profileImage;

  // get file extension from the image name
  let imageExtension = imageName.split(".");
  imageExtension = imageExtension[imageExtension.length - 1];

  const { data: userImage, error: userImageError } = await supabase.storage
    .from("todo-app")
    .upload(`userImage/${user_id}.${imageExtension}`, imageData, {
      contentType: "File",
      upsert: true,
    });

  if (userImageError) {
    throw new SupabaseError(userImageError);
  }

  // 
  const {
    data: { publicUrl },
  } = supabase.storage.from("todo-app").getPublicUrl(userImage.path);

  // populate db
  const { data: imageUrl, error: imageUrlError } = await supabase
    .from("users")
    .update([{ image_url: publicUrl }])
    .eq("id", user_id)
    .select("image_url");

  if (imageUrlError) {
    throw new SupabaseError(imageUrlError);
  }

  res.json({
    status: "ok",
    message: "image uploaded successfully",
    image_url: imageUrl[0]["image_url"],
  });
});

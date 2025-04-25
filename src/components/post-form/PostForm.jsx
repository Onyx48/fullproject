import React, { useCallback ,useState} from "react";
import { useForm } from "react-hook-form";

import { Button, RTE, Input, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// 2. Define the PostForm component
// It accepts an optional 'post' object as a prop.
// If 'post' is provided, the form operates in 'Edit' mode.
// If 'post' is not provided, it operates in 'Create' mode.
export function PostForm({ post }) {
  // Changed to named export if preferred

  // 3. Initialize React Hook Form
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      // 4. Set default values for the form fields
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "", // Use Appwrite $id as the slug source if editing
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  // 5. Initialize hooks for navigation and accessing Redux state
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [formError, setFormError] = useState(""); // State for form-level errors

  // 6. Define the submit handler function
  const submit = async (data) => {
    setFormError(""); // Clear previous errors
    console.log("PostForm submitted with data:", data);

    // --- A. HANDLE UPDATE (EDIT MODE) ---
    if (post) {
      try {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;
        let featuredImageId = post.featuredImage; // Start with the existing image ID

        if (file) {
          // If a new file was uploaded, delete the OLD one first
          console.log("Deleting old image:", featuredImageId);
          try {
            await appwriteService.deleteFile(featuredImageId);
            console.log("Old image deleted successfully");
          } catch (deleteError) {
            console.error(
              "Could not delete old image, continuing update:",
              deleteError
            );
            // Decide if this is critical - maybe warn user?
          }
          featuredImageId = file.$id; // Update the ID to the new file's ID
        }

        console.log("Updating post with ID:", post.$id);
        const dbPost = await appwriteService.updatePost(
          post.$id, // Use the original post's Appwrite ID ($id)
          {
            ...data, // title, slug, content, status from RHF data
            featuredImage: featuredImageId, // Use the potentially updated image ID
          }
        );

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`); // Navigate to the updated post
        }
      } catch (error) {
        console.error("Error updating post:", error);
        setFormError("Failed to update post. " + (error.message || ""));
      }

      // --- B. HANDLE CREATE (NEW POST MODE) ---
    } else {
      try {
        console.log("Creating new post, checking for image...");
        // Require an image for new posts (or adjust logic if optional)
        if (!data.image || data.image.length === 0) {
          throw new Error("Featured image is required.");
        }
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          console.log("Image uploaded successfully, fileId:", fileId);
          data.featuredImage = fileId; // Add fileId to the data payload

          if (!userData?.$id) throw new Error("User data not available.");
          console.log("Creating post document with userId:", userData.$id);

          // Use data.slug provided by RHF (auto-generated or user-edited) as the document ID
          const dbPost = await appwriteService.createPost({
            ...data, // title, slug, content, status, featuredImage
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`); // Navigate to the new post
          }
        } else {
          throw new Error("Image upload failed."); // Ensure file upload result is checked
        }
      } catch (error) {
        console.error("Error creating post:", error);
        setFormError("Failed to create post. " + (error.message || ""));
      }
    }
  };

  // 7. Define slug transformation function
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  // 8. useEffect for auto-generating slug from title
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title || ""), {
          shouldValidate: true,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // 9. Render the form JSX
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Form-level error display */}
      {formError && (
        <p className="text-red-600 w-full text-center mb-4">{formError}</p>
      )}

      {/* Left Column */}
      <div className="w-full md:w-2/3 px-2 space-y-4">
        {" "}
        {/* Added space-y for spacing */}
        <Input
          label="Title :"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          {...register("slug", { required: "Slug is required" })}
          onInput={(e) => {
            // Allow manual slug editing to re-transform
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      {/* Right Column */}
      <div className="w-full md:w-1/3 px-2 space-y-4">
        {" "}
        {/* Added space-y for spacing */}
        <Input
          label="Featured Image :"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          // Image is required only when creating (!post)
          {...register("image", {
            required: !post ? "Featured image is required" : false,
          })}
        />
        {/* Image Preview (Edit mode) */}
        {post && post.featuredImage && (
          <div className="w-full">
            <p className="text-sm mb-1">Current Image:</p>
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full object-contain max-h-40" // Limit preview height
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
          // TODO: Add disabled state while submitting
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

// export default PostForm; // Use default or named export as needed

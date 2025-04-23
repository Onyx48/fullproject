import React, { useEffect, useState } from "react";
// Import hooks for navigation and getting URL parameters
import { useNavigate, useParams } from "react-router-dom";
// Import Appwrite service to fetch the post
import appwriteService from "../appwrite/config"; // Adjust path
// Import Container and PostForm
import { Container } from "../components"; // Adjust path
import { PostForm } from "../components/post-form/PostForm"; // Adjust path

function EditPost() {
  // State to hold the post data fetched from Appwrite
  const [post, setPost] = useState(null);

  // Get the 'slug' parameter from the URL (e.g., /edit-post/my-first-post)
  // Ensure the route in main.jsx is defined as "/edit-post/:slug"
  const { slug } = useParams();

  // Hook for navigation (to redirect if slug is invalid or post not found)
  const navigate = useNavigate();

  console.log("Rendering EditPost page for slug:", slug);

  // Use useEffect to fetch the post data when the component mounts or slug/navigate changes
  useEffect(() => {
    // Only fetch if a slug is present in the URL
    if (slug) {
      console.log("EditPost useEffect: Fetching post with slug:", slug);
      // Call the Appwrite service to get the specific post document
      appwriteService
        .getPost(slug)
        .then((fetchedPost) => {
          if (fetchedPost) {
            // If the post is found, update the local state
            console.log("EditPost useEffect: Post found:", fetchedPost);
            setPost(fetchedPost);
          } else {
            // If getPost returns null (or false), the post wasn't found
            console.log("EditPost useEffect: Post not found, navigating to /");
            // Redirect the user to the home page
            navigate("/");
          }
        })
        .catch((error) => {
          // Handle potential errors during fetch
          console.error("EditPost useEffect: Error fetching post:", error);
          navigate("/"); // Navigate home on error too
        });
    } else {
      // If no slug is present in the URL (shouldn't happen with correct routing), navigate home
      console.log("EditPost useEffect: No slug found, navigating to /");
      navigate("/");
    }
    // Dependencies: Re-run the effect if the slug from the URL changes, or if navigate function changes
  }, [slug, navigate]);

  // Conditional Rendering:
  // Only render the form *after* the post data has been successfully fetched and set in the state.
  // While fetching or if fetching fails, 'post' will be null.
  return post ? (
    <div className="py-8">
      <Container>
        {/* Render the PostForm, passing the fetched 'post' object as a prop */}
        {/* PostForm will use this data to set defaultValues and determine it's in 'Edit' mode */}
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    // Render null or a loading indicator while the post is being fetched
    <div className="text-center py-8">Loading post data...</div> // Or null
  );
}

export default EditPost;

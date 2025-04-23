import React, { useEffect, useState } from "react";
// Import hooks for navigation, URL params, and Redux state
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// Import Appwrite service
import appwriteService from "../appwrite/config"; // Adjust path
// Import reusable components
import { Button, Container } from "../components"; // Adjust path
// Import the HTML parser
import parse from "html-react-parser";

export default function Post() {
  // State to hold the fetched post data
  const [post, setPost] = useState(null);
  // Get slug from URL parameter
  const { slug } = useParams();
  // Hook for navigation
  const navigate = useNavigate();

  // Get all user data from Redux store (to check if current user is the author)
  const userData = useSelector((state) => state.auth.userData);

  // Determine if the currently logged-in user is the author of this post
  // Check if post data exists AND userData exists, then compare post's userId with userData's $id
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  console.log("Rendering Post page for slug:", slug);

  // useEffect to fetch the post data based on the slug
  useEffect(() => {
    if (slug) {
      console.log("Post useEffect: Fetching post with slug:", slug);
      appwriteService
        .getPost(slug)
        .then((fetchedPost) => {
          if (fetchedPost) {
            console.log("Post useEffect: Post found:", fetchedPost);
            setPost(fetchedPost);
          } else {
            // Post not found, navigate to home
            console.log("Post useEffect: Post not found, navigating to /");
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Post useEffect: Error fetching post:", error);
          navigate("/"); // Navigate home on error too
        });
    } else {
      // No slug in URL, navigate home
      navigate("/");
    }
  }, [slug, navigate]); // Dependencies for the effect

  // Function to handle post deletion
  const deletePostHandler = () => {
    console.log("Attempting to delete post:", post.$id);
    // Call Appwrite service to delete the post document
    appwriteService
      .deletePost(post.$id)
      .then((status) => {
        // 'status' will be true if deletion was successful (based on our service method)
        if (status) {
          console.log(
            "Post document deleted. Attempting to delete image:",
            post.featuredImage
          );
          // If document deletion succeeds, also delete the associated featured image file
          appwriteService
            .deleteFile(post.featuredImage)
            .then(() => {
              console.log("Featured image deleted successfully.");
            })
            .catch((imgError) => {
              console.error("Error deleting featured image:", imgError);
              // Continue navigation even if image deletion fails
            })
            .finally(() => {
              // Navigate home after attempting deletion
              navigate("/");
            });
        } else {
          console.error("Failed to delete post document.");
          // TODO: Show an error message to the user
        }
      })
      .catch((error) => {
        console.error("Error in deletePost service call:", error);
        // TODO: Show an error message
      });
  };

  // Render the post details only if 'post' state is not null
  return post ? (
    <div className="py-8">
      <Container>
        {/* Featured Image Section */}
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl max-h-[400px] object-contain" // Constrained height
          />

          {/* Edit/Delete Buttons - Show only if the current user is the author */}
          {isAuthor && (
            <div className="absolute right-6 top-6">
              {/* Link to the Edit Post page */}
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              {/* Button to trigger the delete handler */}
              <Button bgColor="bg-red-500" onClick={deletePostHandler}>
                Delete
              </Button>
            </div>
          )}
        </div>
        {/* Post Title */}
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        {/* Post Content - Parse and render the HTML */}
        <div className="browser-css">
          {/* Use 'parse' from html-react-parser to safely render HTML */}
          {post.content ? parse(post.content) : null}
        </div>
      </Container>
    </div>
  ) : (
    <div className="text-center py-8">Loading post...</div> // Or null
  );
}

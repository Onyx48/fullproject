import React, { useState, useEffect } from "react";
// Import Appwrite service and components
import appwriteService from "../appwrite/config"; // Adjust path
import { Container, PostCard } from "../components"; // Adjust path

function AllPosts() {
  // State to hold the array of posts fetched from Appwrite
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  console.log("Rendering AllPosts page");

  // useEffect to fetch posts when the component mounts
  useEffect(() => {
    console.log("AllPosts useEffect: Fetching posts...");
    setLoading(true);
    // Call service to get posts (default query is status='active')
    appwriteService
      .getPosts([]) // Pass empty array to get all posts (or default active)
      // If you ONLY want active posts: appwriteService.getPosts([Query.equal("status", "active")])
      // Make sure to import Query from appwrite if using filters.
      .then((postsResponse) => {
        if (postsResponse) {
          console.log(
            "AllPosts useEffect: Posts received:",
            postsResponse.documents
          );
          // Set the 'documents' array into the local state
          setPosts(postsResponse.documents);
        } else {
          console.log("AllPosts useEffect: No posts found or error occurred.");
          setPosts([]); // Set to empty array
        }
      })
      .catch((error) => {
        console.error("AllPosts useEffect: Error fetching posts:", error);
        setPosts([]); // Set to empty array on error
      })
      .finally(() => {
        setLoading(false); // Finish loading
      });
    // Empty dependency array means run only once on mount
  }, []);

  // Render loading state
  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  // Render message if no posts found
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No posts found.
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Render the list of posts if posts exist
  return (
    <div className="w-full py-8">
      <Container>
        {/* Use flex-wrap to arrange cards in a grid-like manner */}
        <div className="flex flex-wrap -m-2">
          {" "}
          {/* Negative margin for spacing trick */}
          {/* Map over the 'posts' array */}
          {posts.map((post) => (
            // Each post card container. Adjust width (w-1/4 for 4 columns, etc.)
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              {/* Render the PostCard component */}
              {/* Use spread operator {...post} to pass all post properties as props */}
              <PostCard {...post} />
              {/* Equivalent to: <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} /> */}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

import React, { useEffect, useState } from "react";

import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

// 5. (Optional) Import Query if you explicitly filter posts (e.g., status='active')
// import { Query } from 'appwrite';
import appwriteService from './../appwrite/config';

// 6. Define the Home functional component.
function Home() {
  console.log("Rendering Home page");

  // 7. Initialize state to hold the list of posts
  const [posts, setPosts] = useState([]);

  // 8. Initialize state to manage the loading status
  const [loading, setLoading] = useState(true);

  // 9. Get the user's actual login status from the Redux store
  //    This boolean tells us if the user is logged in according to our frontend state.
  const authStatus = useSelector((state) => state.auth.status); // Use authStatus for consistency with Protected component

  // 10. Use useEffect to fetch posts when the component mounts.
  useEffect(() => {
    console.log("Home useEffect: Fetching posts...");
    setLoading(true); // Set loading to true when fetch starts.

    // Call the getPosts method from our appwriteService.
    // The original code likely fetches posts that are publicly viewable (e.g., status='active').
    // This means logged-out users CAN see these posts if they exist and permissions are set in Appwrite.
    // We perform the fetch regardless of login status here.
    appwriteService
      .getPosts([]) // Or [Query.equal("status", "active")] if you only want active
        .then((postsResponse) => {
          if (postsResponse && postsResponse.documents) {
            console.log(
              "Home useEffect: Posts received:",
              postsResponse.documents
            );
            setPosts(postsResponse.documents);
          } else {
            console.log("Home useEffect: No posts found or error occurred.");
            setPosts([]); // Explicitly set posts to an empty array.
          }
        })
      .catch((error) => {
        console.error("Home useEffect: Error fetching posts:", error);
        setPosts([]); // Set posts to empty array on error.
      })
      .finally(() => {
        setLoading(false); // Set loading to false.
        console.log("Home useEffect: Loading finished.");
      });

    // 11. Dependency Array: Empty array means run only once on mount.
    //    The fetch itself doesn't depend on login status in this common public viewing pattern.
  }, []);

  // 12. Conditional Rendering based on loading and posts state.

  // Scenario A: While data is loading, show a loading message.
  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  // Scenario B: If loading is false, check if any posts were found. If the posts array is empty.
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              {/* 13. Display different messages based on login status */}
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {/* If user is logged in AND no posts -> show "No posts found" message */}
                {/* If user is logged out AND no posts -> show "Login to read posts" message */}
                {authStatus ? "No posts found." : "Login to read posts"}
              </h1>
              {/* Optional: Add links/buttons here, e.g., "Create first post" if logged in */}
              {/* {authStatus && <Link to="/add-post">Create Post</Link>} */}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Scenario C: If loading is false AND there are posts.
  //    Render the list of posts using PostCard components.
  //    This part renders for *both* logged-in and logged-out users if posts exist,
  //    assuming the Appwrite query (step 10) fetches publicly viewable posts.
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap -m-2">
          {/* Map over the 'posts' array to render a PostCard for each post. */}
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.status); // Check login status

  useEffect(() => {
    setLoading(true);
    // Fetch only active posts, maybe limit the number
    appwriteService
      .getPosts([
        /* Query.limit(8) */
      ]) // Pass empty or specific queries
      .then((postsResponse) => {
        if (postsResponse) {
          setPosts(postsResponse.documents);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Decide content based on posts or login status
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          {/* Show different message based on login? */}
          <h1 className="text-2xl font-bold">
            {isLoggedIn ? "No Posts Found." : "Login to Read Posts"}
          </h1>
          {/* Maybe add a button to Add Post if logged in? */}
          {/* {isLoggedIn && <Button onClick={() => navigate('/add-post')}>Add Post</Button>} */}
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap -m-2">
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

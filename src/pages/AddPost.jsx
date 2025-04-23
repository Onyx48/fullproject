import React from "react";
// Import the Container for consistent layout/padding
import { Container } from "../components"; // Adjust path if needed
// Import the PostForm component
import { PostForm } from "../components/post-form/PostForm"; // Adjust path if needed

function AddPost() {
  console.log("Rendering AddPost page");
  return (
    // Standard page padding
    <div className="py-8">
      {/* Use Container to constrain the form width */}
      <Container>
        {/* Render the PostForm component */}
        {/* Since we DON'T pass a 'post' prop, PostForm knows to operate in 'Create' mode */}
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;

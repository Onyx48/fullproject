import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    // Wrap the entire card in a Link that navigates to the single post view
    // The URL uses the post's $id (which might be the slug)
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-200">
        {/* Image container */}
        <div className="w-full justify-center mb-4">
          {/* Use appwriteService.getFilePreview() to get the image URL */}
          {/* Check if featuredImage exists before trying to get preview */}
          {featuredImage && (
            <img
              // Pass the File ID to get the preview URL
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title} // Use post title as alt text
              className="rounded-xl w-full object-cover aspect-video" // Basic image styling
            />
          )}
          {/* Optional: Placeholder if no image */}
          {!featuredImage && (
            <div className="rounded-xl w-full aspect-video bg-gray-300 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        {/* Post Title */}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

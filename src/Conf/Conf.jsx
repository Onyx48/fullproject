import React from "react";

const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DTATBASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  tinymceApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
};
if (!conf.appwriteUrl || !conf.appwriteProjectId) {
  console.error(
    "ERROR: Appwrite environment variables (VITE_APPWRITE_URL, VITE_APPWRITE_PROJECT_ID) are missing or invalid. Make sure .env is set up and the dev server was restarted."
  );
}

export default conf;

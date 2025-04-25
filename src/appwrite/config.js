import conf from "../Conf/Conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    console.log("Appwrite DB/Storage Service Initialized");
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      console.log("Appwrite service:Attempting to create post with slug", slug);
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
          userId: userId,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: createPost::error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      console.log("Appwrite service:Attempting to update post with slug", slug);
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: updatePost::error", error);
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      console.log("Appwrite service:Attempting to delete post with slug", slug);
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      return true;
    } catch (error) {
      console.error("Appwrite service :: deletepost::error", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      console.log("Appwrite service:Attempting to get post with slug", slug);
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error(
        "Appwrite service :: getPost::error(Document not found",
        error
      );
      return null;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      console.log(
        "Appwrite service:Attempting to list post with queries",
        queries
      );
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite service :: getPosts::error", error);
      return null;
    }
  }
  async uploadFile(file) {
    try {
      console.log("Appwrite service:Attempting to upload file", file.name);
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite service :: uploadFile::error", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      console.log("Appwrite service:Attempting to delete file with Id", fileId);
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        ID.unique(),
        fileId
      );
    } catch (error) {
      console.error("Appwrite service :: deleteFile::error", error);
      throw error;
    }
  }
  getFilePreview(fileId) {
    console.log("Appwrite service:Getting file preview URL for ID", fileId);
    return this.bucket.getFilePreview(
      conf.appwriteBucketId,

      fileId
    );
  }
}

const service = new Service();

export default service;

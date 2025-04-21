import conf from "../Conf/Conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        

    this.account = new Account(this.client);
    console.log("Appwrite Auth Service Initialized");
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        console.log("Account created,attempting login",email);
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Appwrite service:: createAccount::error", error);

      throw error;
    }
  }

  async login({ email, password }) {
    try {
      console.log("Attempting login with Appwrite :", email);

      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log("Appwrite login successful:", session);
      return session;
    } catch (error) {
      console.error("Appwrite service :: login::error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log("Appwrite getCurrentUser successful:", user);
      return user;
    } catch (error) {
      console.log(
        "Appwrite service :: getCurrentUser :: error (No session?)",
        error
      );
    }
    return null;
  }

  async logout() {
    try {
      console.log("Attempting logout with Appwrite");
      await this.account.deleteSessions();
      console.log("Appwrite logout successful");
      return true;
    } catch (error) {
      console.error("Appwrite service::logout::error", error);
      return false;
    }
  }
}

const authservice = new AuthService();

export default authservice;

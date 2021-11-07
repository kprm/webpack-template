import { AxiosRequestConfig } from "axios";
import { IPost } from "../models/posts";
import { requests } from "./config";

const Posts = {
  allPosts: (options?: AxiosRequestConfig): Promise<IPost[]> => requests.get('/posts', options),
  postById: (n: number, options?: AxiosRequestConfig): Promise<IPost> => requests.get(`/posts/${n}`, options)
};

export default Posts;

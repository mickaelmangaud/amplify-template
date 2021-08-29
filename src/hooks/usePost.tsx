import { useState, useEffect } from 'react';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { compareDesc } from 'date-fns';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

import {
  Post,
  GetPostQuery,
  ListPostsQuery,
  CreatePostMutation,
  CreatePostInput,
  UpdatePostMutation,
  UpdatePostInput,
  DeletePostMutation,
  DeletePostInput,
} from '../API';

export function usePost() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getPosts() {
      const { data } = await (API.graphql({ query: queries.listPosts }) as Promise<
        GraphQLResult<ListPostsQuery>
      >);

      data.listPosts.items.sort((a, b) =>
        compareDesc(new Date(a.createdAt), new Date(b.createdAt))
      );
      setPosts(data.listPosts.items);
    }

    getPosts();
  }, []);

  async function createNewPost(Post: CreatePostInput) {
    try {
      const { data } = await (API.graphql({
        query: mutations.createPost,
        variables: { input: Post },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<GraphQLResult<CreatePostMutation>>);

      setPosts([data.createPost, ...posts]);
    } catch (e) {
      console.log(e);
    }
  }

  async function getPostById(id: string) {
    const { data } = await (API.graphql({
      query: queries.getPost,
      variables: { id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetPostQuery>>);

    console.log(data.getPost);
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async function updatePostById(input: UpdatePostInput) {
    try {
      const { data } = await (API.graphql({
        query: mutations.updatePost,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<GraphQLResult<UpdatePostMutation>>);

      setPosts(Posts => posts.map(t => (t.id === data.updatePost.id ? data.updatePost : t)));
    } catch (e) {
      console.log(e);
    }
  }

  async function deletePostById(input: DeletePostInput) {
    try {
      await (API.graphql({
        query: mutations.deletePost,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<GraphQLResult<DeletePostMutation>>);
      setPosts(posts => posts.filter(t => t.id !== input.id));
    } catch (e) {
      console.log(e);
    }
  }

  return { posts, deletePostById, updatePostById, createNewPost, getPostById };
}

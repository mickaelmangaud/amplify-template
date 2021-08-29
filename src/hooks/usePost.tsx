import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { listTodos, getTodo } from '../graphql/queries';
import { deleteTodo, updateTodo, createTodo } from '../graphql/mutations';
import { compareDesc } from 'date-fns';

import {
  Todo,
  GetTodoQuery,
  ListTodosQuery,
  CreateTodoMutation,
  CreateTodoInput,
  UpdateTodoMutation,
  UpdateTodoInput,
  DeleteTodoMutation,
  DeleteTodoInput,
} from '../API';

export function usePost() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function getTodos() {
      const { data } = await (API.graphql(graphqlOperation(listTodos)) as Promise<GraphQLResult<ListTodosQuery>>);
      data.listTodos.items.sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));
      setTodos(data.listTodos.items);
    }

    getTodos();
  }, []);

  async function createNewTodo(todo: CreateTodoInput) {
    try {
      const { data } = await (API.graphql(graphqlOperation(createTodo, { input: todo })) as Promise<
        GraphQLResult<CreateTodoMutation>
      >);
      setTodos([data.createTodo, ...todos]);
    } catch (e) {
      console.log(e);
    }
  }

  async function getTodoById(id: string) {
    const { data } = await (API.graphql({ query: getTodo, variables: { id } }) as Promise<
      GraphQLResult<GetTodoQuery>
    >);
    console.log(data.getTodo);
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async function updateTodoById(input: UpdateTodoInput) {
    try {
      const { data } = await (API.graphql(graphqlOperation(updateTodo, { input })) as Promise<
        GraphQLResult<UpdateTodoMutation>
      >);
      setTodos(todos => todos.map(t => (t.id === data.updateTodo.id ? data.updateTodo : t)));
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteTodoById(input: DeleteTodoInput) {
    try {
      await (API.graphql(graphqlOperation(deleteTodo, { input })) as Promise<GraphQLResult<DeleteTodoMutation>>);
      setTodos(todos => todos.filter(t => t.id !== input.id));
    } catch (e) {
      console.log(e);
    }
  }

  return { todos, deleteTodoById, updateTodoById, createNewTodo, getTodoById };
}

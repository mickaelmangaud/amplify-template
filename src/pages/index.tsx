import { usePost, useAuth } from '../hooks/';

export default function Home() {
  const { user, signout } = useAuth();
  const { todos, deleteTodoById } = usePost();

  const logout = async e => {
    e.preventDefault();
    await signout();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <button onClick={logout}>SIGNOUT</button>
      <h1 style={{ marginBottom: '60px' }}>
        Bonjour {user?.email} - {user?.username}
      </h1>
      <div id="posts">
        {todos.map(todo => (
          <div key={todo.id} style={{ marginBottom: '24px' }} onClick={() => deleteTodoById({ id: todo.id })}>
            <h4>{todo.name}</h4>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

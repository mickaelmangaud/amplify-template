import { usePost, useAuth } from '../hooks/';

export default function Home() {
  const { user, signout } = useAuth();
  const { posts, deletePostById, createNewPost } = usePost();

  const logout = async e => {
    e.preventDefault();
    await signout();
  };
  console.log(posts);
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
        {posts.map(todo => (
          <div key={todo.id} style={{ marginBottom: '24px' }} onClick={() => deletePostById({ id: todo.id })}>
            <h4>{todo.title}</h4>
            <p>{todo.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

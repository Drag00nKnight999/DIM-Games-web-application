import { useAuth } from "@/hooks/useAuth";
import type { User } from "@shared/schema";

export default function Home() {
  const { user } = useAuth() as { user: User | undefined };

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header style={{
        background: '#007BFF',
        color: 'white',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>Welcome to DIM-Games</h1>
        <a
          href="/api/logout"
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Log Out
        </a>
      </header>

      <main style={{ padding: '20px', flexGrow: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          {user?.profileImageUrl && (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '10px'
              }}
            />
          )}
          <h2>Hello, {user?.firstName || user?.email || 'Player'}!</h2>
          {user?.id && <p style={{ color: '#666' }}>Your user ID is {user.id}</p>}
        </div>

        <section style={{
          margin: '20px 0',
          textAlign: 'center',
          borderRadius: '8px'
        }}>
          <h2>Featured Game</h2>
          <iframe
            src="/game.html"
            width="480"
            height="360"
            style={{ border: 'none', borderRadius: '8px' }}
          />
        </section>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '10px 0',
        background: '#333',
        color: 'white'
      }}>
        <p style={{ margin: 0 }}>© 2025 DIM-Games. All rights reserved.</p>
      </footer>
    </div>
  );
}

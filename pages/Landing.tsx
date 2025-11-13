xport default function Landing() {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header>
        <h1>Welcome to DIM-Games</h1>
      </header>

      <main>
        <div style={{ marginBottom: '30px' }}>
          <h2>Please log in to access all features</h2>
          <p style={{ marginBottom: '20px' }}>
            Sign in to save your progress and access exclusive games!
          </p>
          <a
            href="/api/login"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#007BFF',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background 0.3s, transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
          >
            Log In
          </a>
        </div>
      </main>
    </div>
  );
}

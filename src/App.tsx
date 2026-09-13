export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          Skillhub
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          The Hiring Marketplace
        </p>
        <div style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '400px'
        }}>
          <p style={{ fontSize: '1.2rem' }}>
            ✅ Website is working!
          </p>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.8 }}>
            If you can see this page, the website has loaded successfully.
          </p>
        </div>
      </div>
    </div>
  );
}

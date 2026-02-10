/* App Root Component – Routing and state management */
function App() {
  const [user, setUser] = React.useState(null);
  const [page, setPage] = React.useState('dashboard');

  const handleLogin = (u) => { setUser(u); setPage('dashboard'); };
  const handleLogout = () => { setUser(null); setPage('dashboard'); };

  if (!user) return <LoginPage onLogin={handleLogin} />;

  return (
    <div>
      <TopNav user={user} currentPage={page} onNavigate={setPage} onLogout={handleLogout} />
      {page === 'dashboard' && <Dashboard onNavigate={setPage} />}
      {page === 'auto' && <AutoInsurancePage onNavigate={setPage} />}
      {page === 'home-ins' && <HomeInsurancePage onNavigate={setPage} />}
      {page === 'auto-claims' && <AutoClaimsPage onNavigate={setPage} />}
    </div>
  );
}

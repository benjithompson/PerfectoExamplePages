/* App Root Component – Routing and state management */
function App() {
  // Read authenticated user from sessionStorage (set by login.html)
  const stored = sessionStorage.getItem('ss_user');
  if (!stored) {
    window.location.href = 'login.html';
    return null;
  }
  const user = JSON.parse(stored);
  const [page, setPage] = React.useState('dashboard');

  const handleLogout = () => { sessionStorage.removeItem('ss_user'); window.location.href = 'login.html'; };

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

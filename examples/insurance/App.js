/* App Root Component – Routing and state management */
function App() {
  // Read authenticated user from sessionStorage (set by login.html)
  const stored = sessionStorage.getItem('ss_user');
  if (!stored) {
    window.location.href = 'login.html';
    return null;
  }
  const user = JSON.parse(stored);

  // Support hash-based deep links (e.g. index.html#auto)
  const initialPage = window.location.hash ? window.location.hash.slice(1) : 'dashboard';
  const [page, setPage] = React.useState(initialPage);

  const handleNavigate = (target) => {
    if (target === 'auto-claims') {
      window.location.href = 'auto-claims.html';
      return;
    }
    setPage(target);
  };

  const handleLogout = () => { sessionStorage.removeItem('ss_user'); window.location.href = 'login.html'; };

  return (
    <div>
      <TopNav user={user} currentPage={page} onNavigate={handleNavigate} onLogout={handleLogout} />
      {page === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {page === 'auto' && <AutoInsurancePage onNavigate={handleNavigate} />}
      {page === 'home-ins' && <HomeInsurancePage onNavigate={handleNavigate} />}
    </div>
  );
}

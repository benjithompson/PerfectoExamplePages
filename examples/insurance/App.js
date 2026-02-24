/* App Root Component – Routing and state management */
function App() {
  // Validate auth session (JWT-like token with expiry + idle check)
  const user = AuthManager.requireAuth();
  if (!user) return null; // redirect already initiated

  // Start idle timeout monitoring
  React.useEffect(() => {
    AuthManager.startIdleWatch();
    return () => AuthManager.stopIdleWatch();
  }, []);

  // Listen for session-about-to-expire warnings
  const [sessionWarning, setSessionWarning] = React.useState(false);
  React.useEffect(() => {
    const onWarning = () => setSessionWarning(true);
    window.addEventListener('ss-session-warning', onWarning);
    return () => window.removeEventListener('ss-session-warning', onWarning);
  }, []);

  // Support hash-based deep links (e.g. index.html#auto)
  const initialPage = window.location.hash ? window.location.hash.slice(1) : 'dashboard';
  const [page, setPage] = React.useState(initialPage);

  // Listen for back/forward navigation (mouse buttons, keyboard, etc.)
  React.useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash.slice(1);
      setPage(hash || 'dashboard');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Global modals state
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [paymentOpen, setPaymentOpen] = React.useState(false);
  const [paymentContext, setPaymentContext] = React.useState({});
  const [transferOpen, setTransferOpen] = React.useState(false);
  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const [idCardOpen, setIdCardOpen] = React.useState(false);
  const [billsOpen, setBillsOpen] = React.useState(false);

  // Keyboard shortcut for search
  React.useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleNavigate = (target) => {
    if (target === 'auto-claims') {
      window.location.href = 'auto-claims.html';
      return;
    }
    if (target === 'payment') {
      setPaymentOpen(true);
      return;
    }
    if (target === 'quote') {
      setQuoteOpen(true);
      return;
    }
    const newHash = target === 'dashboard' ? '' : target;
    // Push a new history entry so back/forward buttons work
    if (window.location.hash.slice(1) !== newHash) {
      window.history.pushState(null, '', newHash ? '#' + newHash : window.location.pathname);
    }
    setPage(target);
  };

  const openPayment = (policyName, amount) => {
    setPaymentContext({ policyName, amount });
    setPaymentOpen(true);
  };

  const handleLogout = () => AuthManager.logout();

  return (
    <div>
      <TopNav
        user={user}
        currentPage={page}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        onSearch={() => setSearchOpen(true)}
        onChat={() => setChatOpen(prev => !prev)}
      />
      {page === 'dashboard' && <Dashboard onNavigate={handleNavigate} onPayment={openPayment} onTransfer={() => setTransferOpen(true)} onQuote={() => setQuoteOpen(true)} onIdCard={() => setIdCardOpen(true)} onPayBills={() => setBillsOpen(true)} />}
      {page === 'auto' && <AutoInsurancePage onNavigate={handleNavigate} onPayment={openPayment} onIdCard={() => setIdCardOpen(true)} />}
      {page === 'home-ins' && <HomeInsurancePage onNavigate={handleNavigate} onPayment={openPayment} />}
      {page === 'banking' && <BankingPage onNavigate={handleNavigate} onTransfer={() => setTransferOpen(true)} onPayBills={() => setBillsOpen(true)} />}
      {page === 'documents' && <DocumentsInbox onNavigate={handleNavigate} />}
      {page === 'profile' && <ProfileSettings onNavigate={handleNavigate} />}
      {page === 'rewards' && <RewardsCenter onNavigate={handleNavigate} />}
      {page === 'perks' && <PerksPage onNavigate={handleNavigate} />}
      {page === 'property-claim' && <PropertyClaimPage onNavigate={handleNavigate} />}

      {/* Global Modals */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleNavigate} />
      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <PaymentModal isOpen={paymentOpen} onClose={() => setPaymentOpen(false)} policyName={paymentContext.policyName} amount={paymentContext.amount} />
      <TransferModal isOpen={transferOpen} onClose={() => setTransferOpen(false)} />
      <PayBillsModal isOpen={billsOpen} onClose={() => setBillsOpen(false)} />
      <GetQuote isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <IDCardViewer isOpen={idCardOpen} onClose={() => setIdCardOpen(false)} />

      {/* Session expiry warning banner */}
      {sessionWarning && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999, background: '#fef3c7', borderTop: '2px solid #f59e0b', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '.88rem', color: '#92400e', fontWeight: 500 }}>⏱️ Your session will expire soon due to inactivity.</span>
          <button onClick={() => { AuthManager.refreshSession(); setSessionWarning(false); }} style={{ padding: '.4rem 1rem', background: '#2a7fff', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: '.82rem' }}>Keep me signed in</button>
          <button onClick={handleLogout} style={{ padding: '.4rem 1rem', background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: '.82rem' }}>Log out</button>
        </div>
      )}
    </div>
  );
}

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

  // Global modals state
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [paymentOpen, setPaymentOpen] = React.useState(false);
  const [paymentContext, setPaymentContext] = React.useState({});
  const [transferOpen, setTransferOpen] = React.useState(false);
  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const [idCardOpen, setIdCardOpen] = React.useState(false);

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
    setPage(target);
    window.location.hash = target === 'dashboard' ? '' : target;
  };

  const openPayment = (policyName, amount) => {
    setPaymentContext({ policyName, amount });
    setPaymentOpen(true);
  };

  const handleLogout = () => { sessionStorage.removeItem('ss_user'); window.location.href = 'login.html'; };

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
      {page === 'dashboard' && <Dashboard onNavigate={handleNavigate} onPayment={openPayment} onTransfer={() => setTransferOpen(true)} onQuote={() => setQuoteOpen(true)} onIdCard={() => setIdCardOpen(true)} />}
      {page === 'auto' && <AutoInsurancePage onNavigate={handleNavigate} onPayment={openPayment} onIdCard={() => setIdCardOpen(true)} />}
      {page === 'home-ins' && <HomeInsurancePage onNavigate={handleNavigate} onPayment={openPayment} />}
      {page === 'banking' && <BankingPage onNavigate={handleNavigate} onTransfer={() => setTransferOpen(true)} />}
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
      <GetQuote isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <IDCardViewer isOpen={idCardOpen} onClose={() => setIdCardOpen(false)} />
    </div>
  );
}

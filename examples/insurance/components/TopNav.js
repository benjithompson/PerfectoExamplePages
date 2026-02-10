/* TopNav Component – Navigation bar with mega menu */
function TopNav({ user, currentPage, onNavigate, onLogout }) {
  const [megaOpen, setMegaOpen] = React.useState(false);
  const megaRef = React.useRef(null);

  React.useEffect(() => {
    if (!megaOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') setMegaOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [megaOpen]);

  const handleInsuranceClick = (e) => {
    e.preventDefault();
    setMegaOpen(prev => !prev);
  };

  const closeMega = () => setMegaOpen(false);

  const navTo = (page) => { closeMega(); onNavigate(page); };

  return (
    <nav className="top-nav" style={{ position: 'sticky', top: 0 }}>
      <div className="top-nav-inner">
        <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); navTo('dashboard'); }}>
          <div className="shield">SS</div>
          <span>SecureShield</span>
        </a>
        <div className="nav-links">
          <a href="#" className={currentPage === 'dashboard' ? 'active' : ''} onClick={e => { e.preventDefault(); navTo('dashboard'); }}>Home</a>
          <div className="nav-link-wrap">
            <a href="#" className={(currentPage === 'auto' || currentPage === 'home-ins' ? 'active' : '') + (megaOpen ? ' mega-open' : '')} onClick={handleInsuranceClick}>Insurance</a>
          </div>
          <a href="#" onClick={e => e.preventDefault()}>Banking</a>
          <a href="#" onClick={e => e.preventDefault()}>Retirement</a>
          <a href="#" onClick={e => e.preventDefault()}>Investing</a>
          <a href="#" onClick={e => e.preventDefault()}>Advice</a>
          <a href="#" onClick={e => e.preventDefault()}>Perks</a>
        </div>
        <div className="nav-right">
          <button onClick={e => e.preventDefault()}>🔍 Search</button>
          <button onClick={e => e.preventDefault()}>💬 Chat</button>
          <div className="nav-avatar" title={user.fullName}>{user.name.charAt(0)}</div>
          <button onClick={onLogout}>Log Off</button>
        </div>
      </div>

      {megaOpen && (
        <React.Fragment>
          <div className="mega-overlay" onClick={closeMega} />
          <div className="mega-menu" ref={megaRef}>
            <div className="mega-menu-inner">
              <div className="mega-columns">
                {MEGA_MENU.columns.map((col, ci) => (
                  <div className="mega-col" key={ci}>
                    {col.links ? (
                      <React.Fragment>
                        <h5>{col.title}</h5>
                        <ul>
                          {col.links.map((l, li) => (
                            <li key={li}><a href="#" onClick={e => { e.preventDefault(); if (l === 'Auto') navTo('auto'); else if (l === 'Homeowners') navTo('home-ins'); }}>{l}</a></li>
                          ))}
                        </ul>
                        {col.viewAll && <a href="#" className="view-all" onClick={e => e.preventDefault()}>{col.viewAll}</a>}
                      </React.Fragment>
                    ) : col.sub ? (
                      col.sub.map((s, si) => (
                        <React.Fragment key={si}>
                          <h5>{s.heading}</h5>
                          {s.links.length > 0 && (
                            <ul>
                              {s.links.map((l, li) => (
                                <li key={li}><a href="#" onClick={e => e.preventDefault()}>{l}</a></li>
                              ))}
                            </ul>
                          )}
                        </React.Fragment>
                      ))
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mega-sidebar">
                {MEGA_MENU.sidebar.map((item, i) => (
                  <a href="#" key={i} onClick={e => e.preventDefault()}>
                    <span className="mega-icon">{item.icon}</span>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </nav>
  );
}

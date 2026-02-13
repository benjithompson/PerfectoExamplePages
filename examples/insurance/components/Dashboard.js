/* Dashboard Component – Main dashboard page with banking, insurance, retirement sections */
function Dashboard({ onNavigate, onPayment, onTransfer, onQuote, onIdCard }) {
  const [claimsOpen, setClaimsOpen] = React.useState(false);

  return (
    <div className="dashboard">
      <div className="greeting">Good Afternoon, ELIZABETH</div>
      <div className="greeting-sub">
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('documents'); }}>✉️ Inbox</a>
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('documents'); }}>📄 Documents</a>
        <a href="#" onClick={e => e.preventDefault()}>✏️ Edit Layout</a>
      </div>

      <div className="dash-grid">
        <div className="main-col">
          {/* Alert */}
          <div className="alert-banner">
            <span className="alert-icon">◆</span>
            <p>
              SecureShield continues to monitor economic conditions and stands ready if pay disruptions occur. Relief options available Feb. 16.
              Our 0% interest loan available to eligible members Feb. 25, prior to the first anticipated missed paycheck.
              <br /><a href="#">Learn more</a>
            </p>
          </div>

          {/* Banking */}
          <div className="section-card">
            <div className="section-header banking">
              <h3>Banking</h3>
              <div className="section-actions">
                <button onClick={onTransfer}><span className="act-icon">↔️</span>Transfer</button>
                <button><span className="act-icon">📄</span>Pay bills</button>
                <button onClick={() => onNavigate('documents')}><span className="act-icon">📋</span>Statements</button>
                <button><span className="act-icon">➕</span>Add account</button>
              </div>
            </div>
            <div className="section-body">
              {ACCOUNTS.banking.map((a, i) => (
                <div className="account-row" key={i} onClick={() => onNavigate('banking')}>
                  <div>
                    <div className="account-name">{a.name} <span className="account-detail">•{a.mask}</span></div>
                  </div>
                  <div className="account-value">{a.balance}</div>
                </div>
              ))}
              <div className="promo-row">
                <div className="promo-text">Looking for a car loan?<small>Find one made to fit your budget.</small></div>
                <a href="#" className="promo-link">Get started →</a>
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div className="section-card">
            <div className="section-header insurance">
              <h3>Insurance</h3>
              <div className="section-actions">
                <button onClick={() => setClaimsOpen(!claimsOpen)}><span className="act-icon">🏷️</span>Claims</button>
                <button onClick={onIdCard}><span className="act-icon">🪪</span>ID card</button>
                <button onClick={() => onPayment('Auto Insurance (WA)', '$186.40')}><span className="act-icon">📄</span>Bills</button>
                <button onClick={onQuote}><span className="act-icon">➕</span>Get quote</button>
              </div>
            </div>

            {claimsOpen && (
              <React.Fragment>
                <div className="claims-overlay" onClick={() => setClaimsOpen(false)} />
                <div className="claims-popover">
                  <div className="claims-popover-header">
                    <h4>Claims</h4>
                    <button className="pop-close" onClick={() => setClaimsOpen(false)}>✕</button>
                  </div>
                  <div className="claims-popover-body">
                    <a href="auto-claims.html" onClick={() => setClaimsOpen(false)}>
                      File an Auto Claim <span className="arrow">›</span>
                    </a>
                    <a href="#" onClick={e => { e.preventDefault(); setClaimsOpen(false); onNavigate('property-claim'); }}>
                      File a Property Claim <span className="arrow">›</span>
                    </a>
                    <a href="#" onClick={e => e.preventDefault()}>Claims Center <span className="arrow">›</span></a>
                    <a href="#" onClick={e => e.preventDefault()}>Insurance Claims Fraud</a>
                    <a href="#" onClick={e => e.preventDefault()}>Disaster and Recovery Center</a>
                  </div>
                </div>
              </React.Fragment>
            )}

            <div className="section-body">
              {ACCOUNTS.insurance.map((a, i) => (
                <div className="account-row" key={i} onClick={() => {
                  if (a.name.includes('Auto')) onNavigate('auto');
                  if (a.name.includes('Homeowners')) onNavigate('home-ins');
                }}>
                  <div>
                    <div className="account-name">{a.name}</div>
                    {a.detail && <div className="account-detail">{a.detail}</div>}
                  </div>
                  <div className="account-value">{a.premium}</div>
                </div>
              ))}
              <div className="promo-row">
                <div className="promo-text">SecureShield Life Insurance<small>Give your loved ones a safe place to land with a budget-friendly price.</small></div>
                <a href="#" className="promo-link" onClick={e => { e.preventDefault(); onQuote(); }}>Get started →</a>
              </div>
            </div>
          </div>

          {/* Retirement */}
          <div className="section-card">
            <div className="section-header retirement">
              <h3>Retirement &amp; Investing</h3>
              <div className="section-actions">
                <button onClick={onTransfer}><span className="act-icon">↔️</span>Transfer</button>
                <button><span className="act-icon">➕</span>Add account</button>
              </div>
            </div>
            <div className="section-body">
              {ACCOUNTS.retirement.map((a, i) => (
                <div className="account-row" key={i}>
                  <div>
                    <div className="account-name">{a.name}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="account-value">{a.balance}</div>
                    <div style={{ fontSize: '.75rem', color: '#059669', fontWeight: 600 }}>{a.change} ({a.changePercent})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Sidebar onNavigate={onNavigate} />
      </div>
    </div>
  );
}

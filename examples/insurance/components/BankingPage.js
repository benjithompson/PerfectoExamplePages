/* BankingPage Component – Full banking page with transactions and account details */
function BankingPage({ onNavigate, onTransfer, onPayBills }) {
  const [selectedAccount, setSelectedAccount] = React.useState('all');
  const [sortOrder, setSortOrder] = React.useState('newest');

  const filteredTx = selectedAccount === 'all'
    ? TRANSACTIONS
    : TRANSACTIONS.filter(t => t.account === selectedAccount);

  const sortedTx = [...filteredTx].sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="page-content">
      <div className="page-breadcrumb">
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('dashboard'); }}>Home</a> / Banking
      </div>
      <h2 className="page-title">Banking</h2>

      <div className="dash-grid">
        <div className="main-col">
          {/* Account Cards */}
          <div className="banking-accounts-row">
            {ACCOUNTS.banking.map((a, i) => (
              <div key={i} className={'banking-acct-card' + (selectedAccount === a.type ? ' selected' : '')} onClick={() => setSelectedAccount(selectedAccount === a.type ? 'all' : a.type)}>
                <div className="banking-acct-type">{a.type === 'credit' ? '💳' : a.type === 'savings' ? '💰' : '🏦'}</div>
                <div className="banking-acct-name">{a.name}</div>
                <div className="banking-acct-mask">•{a.mask}</div>
                <div className="banking-acct-balance">{a.balance}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="banking-quick-actions">
            <button className="banking-action-btn" onClick={onTransfer}><span>↔️</span> Transfer</button>
            <button className="banking-action-btn" onClick={onPayBills}><span>📄</span> Pay Bills</button>
            <button className="banking-action-btn"><span>📋</span> Statements</button>
            <button className="banking-action-btn"><span>💳</span> Manage Cards</button>
          </div>

          {/* Transactions */}
          <div className="policy-card">
            <div className="policy-header">
              <h4>Recent Transactions {selectedAccount !== 'all' && <span style={{ fontWeight: 400, fontSize: '.82rem', color: '#6b7280' }}>– {selectedAccount}</span>}</h4>
              <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                <select className="form-select" style={{ padding: '.35rem .6rem', fontSize: '.78rem' }} value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
                {selectedAccount !== 'all' && (
                  <button className="doc-filter-btn active" onClick={() => setSelectedAccount('all')} style={{ fontSize: '.72rem' }}>Clear Filter ✕</button>
                )}
              </div>
            </div>
            <div className="policy-body" style={{ padding: 0 }}>
              {sortedTx.map(tx => (
                <div key={tx.id} className="tx-row">
                  <div className="tx-date">{tx.date}</div>
                  <div className="tx-info">
                    <div className="tx-desc">{tx.description}</div>
                    <div className="tx-category">{tx.category}</div>
                  </div>
                  <div className={'tx-amount' + (tx.amount.startsWith('+') ? ' positive' : '')}>{tx.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-card">
            <h4>Looking for a car loan?</h4>
            <p>Find one made to fit your budget. Competitive rates for members.</p>
            <a href="#" className="sidebar-link" onClick={e => e.preventDefault()}>Get started →</a>
          </div>
          <div className="sidebar-card">
            <h4>Set Up Direct Deposit</h4>
            <p>Get paid up to 2 days early with direct deposit to your checking account.</p>
            <a href="#" className="sidebar-link" onClick={e => e.preventDefault()}>Learn more →</a>
          </div>
          <div className="sidebar-card">
            <h4>Zelle® Payments</h4>
            <p>Send money to friends and family quickly and securely.</p>
            <a href="#" className="sidebar-link" onClick={e => e.preventDefault()}>Set up Zelle →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

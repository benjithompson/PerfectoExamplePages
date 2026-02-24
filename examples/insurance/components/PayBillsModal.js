/* PayBillsModal Component – View and pay bills from banking */
function PayBillsModal({ isOpen, onClose }) {
  const [view, setView] = React.useState('list'); // list | pay | confirm | success | add
  const [selectedBill, setSelectedBill] = React.useState(null);
  const [filter, setFilter] = React.useState('all'); // all | due | upcoming | paid
  const [payFrom, setPayFrom] = React.useState('checking');
  const [payAmount, setPayAmount] = React.useState('');
  const [payDate, setPayDate] = React.useState('2026-02-24');
  const [bills, setBills] = React.useState(BILLS);

  // Add payee form state
  const [newPayee, setNewPayee] = React.useState('');
  const [newNickname, setNewNickname] = React.useState('');
  const [newAccount, setNewAccount] = React.useState('');
  const [newCategory, setNewCategory] = React.useState('Utilities');

  React.useEffect(() => {
    if (isOpen) {
      setView('list');
      setSelectedBill(null);
      setFilter('all');
      setBills(BILLS);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const accounts = [
    { id: 'checking', label: 'Classic Checking •5291', balance: '$5,142.87', icon: '🏦' },
    { id: 'savings', label: 'Savings •8347', balance: '$14,396.22', icon: '💰' },
    { id: 'credit', label: 'Platinum Visa •6108', balance: '$0.00', icon: '💳' }
  ];

  const filteredBills = filter === 'all' ? bills : bills.filter(b => b.status === filter);

  const statusBadge = (status) => {
    const colors = { due: { bg: '#fef3c7', color: '#92400e', label: 'Due' }, upcoming: { bg: '#eff6ff', color: '#1d4ed8', label: 'Upcoming' }, paid: { bg: '#ecfdf5', color: '#065f46', label: 'Paid' } };
    const s = colors[status] || colors.upcoming;
    return <span className="bill-status-badge" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
  };

  const openPayBill = (bill) => {
    setSelectedBill(bill);
    setPayAmount(bill.amount.replace('$', '').replace(',', ''));
    setPayFrom('checking');
    setPayDate('2026-02-24');
    setView('pay');
  };

  const handleConfirm = () => setView('confirm');

  const handleSubmit = () => {
    setBills(prev => prev.map(b => b.id === selectedBill.id ? { ...b, status: 'paid' } : b));
    setView('success');
  };

  const handleAddPayee = () => {
    if (!newPayee || !newAccount) return;
    const categoryIcons = { Utilities: '⚡', Housing: '🏠', Insurance: '🛡️', Subscription: '📺', Other: '📄' };
    const newBill = {
      id: bills.length + 1,
      payee: newPayee,
      nickname: newNickname || newPayee,
      category: newCategory,
      icon: categoryIcons[newCategory] || '📄',
      accountNumber: '•••' + newAccount.slice(-4),
      amount: '$0.00',
      dueDate: '—',
      status: 'upcoming',
      autopay: false
    };
    setBills(prev => [...prev, newBill]);
    setNewPayee('');
    setNewNickname('');
    setNewAccount('');
    setNewCategory('Utilities');
    setView('list');
  };

  const dueBills = bills.filter(b => b.status === 'due');
  const totalDue = dueBills.reduce((sum, b) => sum + parseFloat(b.amount.replace('$', '').replace(',', '')), 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal bill-pay-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            {view === 'list' && '📄 Pay Bills'}
            {view === 'pay' && '💳 Pay Bill'}
            {view === 'confirm' && '✓ Confirm Payment'}
            {view === 'success' && '✅ Payment Complete'}
            {view === 'add' && '➕ Add Payee'}
          </h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">

          {/* ---- BILL LIST VIEW ---- */}
          {view === 'list' && (
            <div>
              {/* Summary banner */}
              <div className="bill-summary-banner">
                <div>
                  <div className="bill-summary-label">Total Due</div>
                  <div className="bill-summary-amount">${totalDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="bill-summary-label">{dueBills.length} bill{dueBills.length !== 1 ? 's' : ''} due</div>
                  <button className="bill-pay-all-btn" onClick={() => { if (dueBills.length) openPayBill(dueBills[0]); }} disabled={!dueBills.length}>Pay Next Bill</button>
                </div>
              </div>

              {/* Filter tabs */}
              <div className="bill-filters">
                {['all', 'due', 'upcoming', 'paid'].map(f => (
                  <button key={f} className={'bill-filter-btn' + (filter === f ? ' active' : '')} onClick={() => setFilter(f)}>
                    {f.charAt(0).toUpperCase() + f.slice(1)} {f !== 'all' && <span className="bill-filter-count">{bills.filter(b => f === 'all' ? true : b.status === f).length}</span>}
                  </button>
                ))}
              </div>

              {/* Bills list */}
              <div className="bill-list">
                {filteredBills.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af', fontSize: '.88rem' }}>No bills in this category.</div>
                )}
                {filteredBills.map(bill => (
                  <div key={bill.id} className="bill-row">
                    <div className="bill-icon">{bill.icon}</div>
                    <div className="bill-info">
                      <div className="bill-payee">{bill.nickname}</div>
                      <div className="bill-detail">{bill.payee} · {bill.accountNumber}</div>
                    </div>
                    <div className="bill-right">
                      <div className="bill-amount">{bill.amount}</div>
                      <div className="bill-due">
                        {bill.dueDate !== '—' ? 'Due ' + bill.dueDate : ''}
                        {bill.autopay && <span className="bill-autopay-tag" title="Autopay enabled">⟳</span>}
                      </div>
                    </div>
                    <div className="bill-actions">
                      {statusBadge(bill.status)}
                      {bill.status !== 'paid' && (
                        <button className="bill-pay-btn" onClick={() => openPayBill(bill)}>Pay</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add payee button */}
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <button className="bill-add-payee-btn" onClick={() => setView('add')}>+ Add New Payee</button>
              </div>
            </div>
          )}

          {/* ---- PAY BILL FORM ---- */}
          {view === 'pay' && selectedBill && (
            <div>
              <div className="bill-pay-header">
                <span className="bill-pay-header-icon">{selectedBill.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.95rem' }}>{selectedBill.nickname}</div>
                  <div style={{ fontSize: '.78rem', color: '#6b7280' }}>{selectedBill.payee} · {selectedBill.accountNumber}</div>
                </div>
              </div>
              <div className="form-group">
                <label>Payment Amount</label>
                <input type="text" value={'$' + payAmount} onChange={e => setPayAmount(e.target.value.replace(/[^0-9.]/g, ''))} />
              </div>
              <div className="form-group">
                <label>Payment Date</label>
                <input type="date" value={payDate} onChange={e => setPayDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Pay From</label>
                <div className="pay-method-list">
                  {accounts.filter(a => a.id !== 'credit').map(a => (
                    <label key={a.id} className={'pay-method-option' + (payFrom === a.id ? ' selected' : '')}>
                      <input type="radio" name="billPayFrom" value={a.id} checked={payFrom === a.id} onChange={() => setPayFrom(a.id)} />
                      <span className="pay-method-icon">{a.icon}</span>
                      <span className="pay-method-label">{a.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '.6rem', marginTop: '1rem' }}>
                <button className="login-btn" style={{ flex: 1 }} onClick={handleConfirm} disabled={!payAmount}>Review Payment</button>
                <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setView('list')}>Back</button>
              </div>
            </div>
          )}

          {/* ---- CONFIRM VIEW ---- */}
          {view === 'confirm' && selectedBill && (
            <div>
              <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '1rem' }}>Please review your payment details before submitting.</p>
              <div className="info-row"><span className="info-label">Payee</span><span className="info-value">{selectedBill.payee}</span></div>
              <div className="info-row"><span className="info-label">Account</span><span className="info-value">{selectedBill.accountNumber}</span></div>
              <div className="info-row"><span className="info-label">Amount</span><span className="info-value">${payAmount}</span></div>
              <div className="info-row"><span className="info-label">Date</span><span className="info-value">{payDate}</span></div>
              <div className="info-row"><span className="info-label">Pay From</span><span className="info-value">{accounts.find(a => a.id === payFrom)?.label}</span></div>
              <div style={{ display: 'flex', gap: '.6rem', marginTop: '1.2rem' }}>
                <button className="login-btn" style={{ flex: 1 }} onClick={handleSubmit}>Submit Payment</button>
                <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setView('pay')}>Back</button>
              </div>
            </div>
          )}

          {/* ---- SUCCESS VIEW ---- */}
          {view === 'success' && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '.8rem' }}>✅</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>Payment Submitted!</h4>
              <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '.3rem' }}>${payAmount} to {selectedBill?.payee}</p>
              <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '.3rem' }}>from {accounts.find(a => a.id === payFrom)?.label}</p>
              <p style={{ fontSize: '.82rem', color: '#9ca3af', marginBottom: '1.5rem' }}>Confirmation #: SS-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              <div style={{ display: 'flex', gap: '.6rem', justifyContent: 'center' }}>
                <button className="login-btn" style={{ flex: 0 }} onClick={() => setView('list')}>Pay Another Bill</button>
                <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={onClose}>Done</button>
              </div>
            </div>
          )}

          {/* ---- ADD PAYEE VIEW ---- */}
          {view === 'add' && (
            <div>
              <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '1rem' }}>Add a new payee to your bill pay list.</p>
              <div className="form-group">
                <label>Payee Name</label>
                <input type="text" value={newPayee} onChange={e => setNewPayee(e.target.value)} placeholder="e.g. Portland General Electric" />
              </div>
              <div className="form-group">
                <label>Nickname (Optional)</label>
                <input type="text" value={newNickname} onChange={e => setNewNickname(e.target.value)} placeholder="e.g. Electric Bill" />
              </div>
              <div className="form-group">
                <label>Account Number</label>
                <input type="text" value={newAccount} onChange={e => setNewAccount(e.target.value)} placeholder="Enter account number" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select className="form-select" value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                  <option value="Utilities">Utilities</option>
                  <option value="Housing">Housing</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Subscription">Subscription</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '.6rem', marginTop: '1rem' }}>
                <button className="login-btn" style={{ flex: 1 }} onClick={handleAddPayee} disabled={!newPayee || !newAccount}>Add Payee</button>
                <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setView('list')}>Cancel</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

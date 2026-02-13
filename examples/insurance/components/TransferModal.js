/* TransferModal Component – Transfer money between accounts */
function TransferModal({ isOpen, onClose }) {
  const [step, setStep] = React.useState('form');
  const [fromAccount, setFromAccount] = React.useState('checking');
  const [toAccount, setToAccount] = React.useState('savings');
  const [amount, setAmount] = React.useState('');
  const [memo, setMemo] = React.useState('');

  React.useEffect(() => {
    if (isOpen) { setStep('form'); setAmount(''); setMemo(''); }
  }, [isOpen]);

  if (!isOpen) return null;

  const accounts = [
    { id: 'checking', label: 'Classic Checking •4219', balance: '$4,287.53' },
    { id: 'savings', label: 'Savings •7734', balance: '$12,841.09' },
    { id: 'credit', label: 'Platinum Visa •8683', balance: '$0.00' }
  ];

  const fromAcc = accounts.find(a => a.id === fromAccount);
  const toAcc = accounts.find(a => a.id === toAccount);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 460 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{step === 'success' ? 'Transfer Complete' : 'Transfer Money'}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {step === 'form' && (
            <div>
              <div className="form-group">
                <label>From Account</label>
                <select className="form-select" value={fromAccount} onChange={e => setFromAccount(e.target.value)}>
                  {accounts.map(a => (
                    <option key={a.id} value={a.id} disabled={a.id === toAccount}>{a.label} ({a.balance})</option>
                  ))}
                </select>
              </div>
              <div style={{ textAlign: 'center', margin: '.3rem 0' }}>
                <button style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#2a7fff' }}
                  onClick={() => { const temp = fromAccount; setFromAccount(toAccount); setToAccount(temp); }}>
                  ⇅
                </button>
              </div>
              <div className="form-group">
                <label>To Account</label>
                <select className="form-select" value={toAccount} onChange={e => setToAccount(e.target.value)}>
                  {accounts.map(a => (
                    <option key={a.id} value={a.id} disabled={a.id === fromAccount}>{a.label} ({a.balance})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input type="text" value={amount} onChange={e => setAmount(e.target.value)} placeholder="$0.00" />
              </div>
              <div className="form-group">
                <label>Memo (Optional)</label>
                <input type="text" value={memo} onChange={e => setMemo(e.target.value)} placeholder="What's this for?" />
              </div>
              <button className="login-btn" onClick={() => setStep('confirm')} disabled={!amount}>Review Transfer</button>
            </div>
          )}

          {step === 'confirm' && (
            <div>
              <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '1rem' }}>Please confirm your transfer details:</p>
              <div className="info-row"><span className="info-label">From</span><span className="info-value">{fromAcc?.label}</span></div>
              <div className="info-row"><span className="info-label">To</span><span className="info-value">{toAcc?.label}</span></div>
              <div className="info-row"><span className="info-label">Amount</span><span className="info-value">{amount}</span></div>
              {memo && <div className="info-row"><span className="info-label">Memo</span><span className="info-value">{memo}</span></div>}
              <div style={{ display: 'flex', gap: '.6rem', marginTop: '1rem' }}>
                <button className="login-btn" style={{ flex: 1 }} onClick={() => setStep('success')}>Confirm Transfer</button>
                <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setStep('form')}>Back</button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '.8rem' }}>✅</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>Transfer Submitted!</h4>
              <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '.3rem' }}>{amount} from {fromAcc?.label}</p>
              <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '1rem' }}>to {toAcc?.label}</p>
              <p style={{ fontSize: '.82rem', color: '#9ca3af', marginBottom: '1.5rem' }}>Confirmation #: SS-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              <button className="login-btn" onClick={onClose}>Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

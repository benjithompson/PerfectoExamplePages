/* PaymentModal Component – Make a payment for insurance premiums */
function PaymentModal({ isOpen, onClose, policyName, amount }) {
  const [step, setStep] = React.useState('form'); // form | confirm | success
  const [payMethod, setPayMethod] = React.useState('checking');
  const [payAmount, setPayAmount] = React.useState(amount || '$186.40');
  const [payDate, setPayDate] = React.useState('2026-02-15');

  React.useEffect(() => {
    if (isOpen) { setStep('form'); setPayAmount(amount || '$186.40'); }
  }, [isOpen, amount]);

  if (!isOpen) return null;

  const methods = [
    { id: 'checking', label: 'USAA Classic Checking •4219', icon: '🏦' },
    { id: 'savings', label: 'USAA Savings •7734', icon: '💰' },
    { id: 'credit', label: 'Platinum Visa •8683', icon: '💳' }
  ];

  const handleConfirm = () => setStep('confirm');
  const handleSubmit = () => setStep('success');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{step === 'success' ? 'Payment Confirmed' : 'Make a Payment'}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {step === 'form' && (
            <div>
              <div style={{ marginBottom: '1rem', padding: '.8rem', background: '#f0f4f8', borderRadius: 8 }}>
                <div style={{ fontSize: '.75rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>Paying For</div>
                <div style={{ fontSize: '.95rem', fontWeight: 600, marginTop: '.2rem' }}>{policyName || 'Auto Insurance (WA)'}</div>
              </div>
              <div className="form-group">
                <label>Payment Amount</label>
                <input type="text" value={payAmount} onChange={e => setPayAmount(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Payment Date</label>
                <input type="date" value={payDate} onChange={e => setPayDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <div className="pay-method-list">
                  {methods.map(m => (
                    <label key={m.id} className={'pay-method-option' + (payMethod === m.id ? ' selected' : '')}>
                      <input type="radio" name="payMethod" value={m.id} checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} />
                      <span className="pay-method-icon">{m.icon}</span>
                      <span className="pay-method-label">{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button className="login-btn" style={{ marginTop: '.5rem' }} onClick={handleConfirm}>Review Payment</button>
            </div>
          )}

          {step === 'confirm' && (
            <div>
              <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '1rem' }}>Please review your payment details before submitting.</p>
              <div className="modal-body">
                <div className="info-row"><span className="info-label">Policy</span><span className="info-value">{policyName || 'Auto Insurance (WA)'}</span></div>
                <div className="info-row"><span className="info-label">Amount</span><span className="info-value">{payAmount}</span></div>
                <div className="info-row"><span className="info-label">Date</span><span className="info-value">{payDate}</span></div>
                <div className="info-row"><span className="info-label">From</span><span className="info-value">{methods.find(m => m.id === payMethod)?.label}</span></div>
              </div>
              <div style={{ display: 'flex', gap: '.6rem', marginTop: '1rem' }}>
                <button className="login-btn" style={{ flex: 1 }} onClick={handleSubmit}>Submit Payment</button>
                <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setStep('form')}>Back</button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '.8rem' }}>✅</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>Payment Submitted!</h4>
              <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '.3rem' }}>Amount: <strong>{payAmount}</strong></p>
              <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '1.5rem' }}>Confirmation #: <strong>SS-{Math.random().toString(36).substring(2, 10).toUpperCase()}</strong></p>
              <button className="login-btn" onClick={onClose}>Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

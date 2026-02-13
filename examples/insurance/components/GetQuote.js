/* GetQuote Component – Multi-step insurance quote flow */
function GetQuote({ isOpen, onClose }) {
  const [step, setStep] = React.useState(1);
  const [quoteType, setQuoteType] = React.useState('');
  const [formData, setFormData] = React.useState({
    firstName: '', lastName: '', dob: '', zipCode: '',
    vehicleYear: '', vehicleMake: '', vehicleModel: '',
    homeType: '', homeYear: '', homeSqft: ''
  });
  const [quote, setQuote] = React.useState(null);

  React.useEffect(() => {
    if (isOpen) { setStep(1); setQuoteType(''); setQuote(null); }
  }, [isOpen]);

  if (!isOpen) return null;

  const updateField = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const generateQuote = () => {
    const base = quoteType === 'auto' ? 145 : quoteType === 'home' ? 118 : quoteType === 'renters' ? 32 : 89;
    const variance = Math.floor(Math.random() * 60) - 20;
    setQuote({
      monthly: (base + variance).toFixed(2),
      sixMonth: ((base + variance) * 6 * 0.95).toFixed(2),
      annual: ((base + variance) * 12 * 0.9).toFixed(2),
      quoteNumber: 'QT-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    });
    setStep(4);
  };

  const types = [
    { id: 'auto', label: 'Auto Insurance', icon: '🚗', desc: 'Coverage for your vehicles' },
    { id: 'home', label: 'Homeowners', icon: '🏠', desc: 'Protect your home and belongings' },
    { id: 'renters', label: 'Renters Insurance', icon: '🏢', desc: 'Coverage for renters' },
    { id: 'life', label: 'Life Insurance', icon: '🛡️', desc: 'Protect your family\'s future' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 540 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Get a Quote</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {/* Progress bar */}
          <div className="quote-progress">
            {[1,2,3,4].map(s => (
              <div key={s} className={'quote-step-dot' + (s <= step ? ' active' : '') + (s === step ? ' current' : '')} />
            ))}
          </div>

          {step === 1 && (
            <div>
              <p style={{ fontSize: '.9rem', color: '#374151', marginBottom: '1rem' }}>What type of insurance are you looking for?</p>
              <div className="quote-type-grid">
                {types.map(t => (
                  <div key={t.id} className={'quote-type-card' + (quoteType === t.id ? ' selected' : '')} onClick={() => setQuoteType(t.id)}>
                    <div style={{ fontSize: '1.8rem' }}>{t.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: '.88rem' }}>{t.label}</div>
                    <div style={{ fontSize: '.75rem', color: '#6b7280' }}>{t.desc}</div>
                  </div>
                ))}
              </div>
              <button className="login-btn" style={{ marginTop: '1rem' }} disabled={!quoteType} onClick={() => setStep(2)}>Continue</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <p style={{ fontSize: '.9rem', color: '#374151', marginBottom: '1rem' }}>Tell us about yourself:</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.8rem' }}>
                <div className="form-group"><label>First Name</label><input type="text" value={formData.firstName} onChange={e => updateField('firstName', e.target.value)} placeholder="Elizabeth" /></div>
                <div className="form-group"><label>Last Name</label><input type="text" value={formData.lastName} onChange={e => updateField('lastName', e.target.value)} placeholder="Morgan" /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.8rem' }}>
                <div className="form-group"><label>Date of Birth</label><input type="date" value={formData.dob} onChange={e => updateField('dob', e.target.value)} /></div>
                <div className="form-group"><label>ZIP Code</label><input type="text" value={formData.zipCode} onChange={e => updateField('zipCode', e.target.value)} placeholder="98199" maxLength="5" /></div>
              </div>
              <div style={{ display: 'flex', gap: '.6rem', marginTop: '.5rem' }}>
                <button className="login-btn" style={{ flex: 1 }} onClick={() => setStep(3)}>Continue</button>
                <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setStep(1)}>Back</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p style={{ fontSize: '.9rem', color: '#374151', marginBottom: '1rem' }}>
                {quoteType === 'auto' ? 'Tell us about your vehicle:' : quoteType === 'home' ? 'Tell us about your home:' : 'A few more details:'}
              </p>
              {(quoteType === 'auto') && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.8rem' }}>
                    <div className="form-group"><label>Year</label><input type="text" value={formData.vehicleYear} onChange={e => updateField('vehicleYear', e.target.value)} placeholder="2022" /></div>
                    <div className="form-group"><label>Make</label><input type="text" value={formData.vehicleMake} onChange={e => updateField('vehicleMake', e.target.value)} placeholder="Toyota" /></div>
                    <div className="form-group"><label>Model</label><input type="text" value={formData.vehicleModel} onChange={e => updateField('vehicleModel', e.target.value)} placeholder="RAV4" /></div>
                  </div>
                </div>
              )}
              {(quoteType === 'home') && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.8rem' }}>
                    <div className="form-group"><label>Home Type</label><input type="text" value={formData.homeType} onChange={e => updateField('homeType', e.target.value)} placeholder="Single Family" /></div>
                    <div className="form-group"><label>Year Built</label><input type="text" value={formData.homeYear} onChange={e => updateField('homeYear', e.target.value)} placeholder="2004" /></div>
                    <div className="form-group"><label>Sq Footage</label><input type="text" value={formData.homeSqft} onChange={e => updateField('homeSqft', e.target.value)} placeholder="2340" /></div>
                  </div>
                </div>
              )}
              {(quoteType !== 'auto' && quoteType !== 'home') && (
                <div className="form-group"><label>Additional Details</label><textarea style={{ width: '100%', padding: '.8rem', border: '1.5px solid #d1d5db', borderRadius: 8, fontFamily: 'inherit', fontSize: '.9rem', minHeight: 80, resize: 'vertical' }} placeholder="Tell us more about what you'd like to insure..." /></div>
              )}
              <div style={{ display: 'flex', gap: '.6rem', marginTop: '.5rem' }}>
                <button className="login-btn" style={{ flex: 1 }} onClick={generateQuote}>Get My Quote</button>
                <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setStep(2)}>Back</button>
              </div>
            </div>
          )}

          {step === 4 && quote && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🎉</div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '.8rem' }}>Your Estimated Quote</h4>
              <div className="quote-result-cards">
                <div className="quote-result-card">
                  <div className="quote-result-label">Monthly</div>
                  <div className="quote-result-amount">${quote.monthly}</div>
                  <div className="quote-result-sub">per month</div>
                </div>
                <div className="quote-result-card featured">
                  <div className="quote-result-badge">BEST VALUE</div>
                  <div className="quote-result-label">Six-Month</div>
                  <div className="quote-result-amount">${quote.sixMonth}</div>
                  <div className="quote-result-sub">5% savings</div>
                </div>
                <div className="quote-result-card">
                  <div className="quote-result-label">Annual</div>
                  <div className="quote-result-amount">${quote.annual}</div>
                  <div className="quote-result-sub">10% savings</div>
                </div>
              </div>
              <p style={{ fontSize: '.78rem', color: '#9ca3af', margin: '1rem 0 .5rem' }}>Quote #{quote.quoteNumber} • Valid for 30 days</p>
              <button className="login-btn" onClick={onClose}>Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

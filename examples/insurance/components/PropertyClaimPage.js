/* PropertyClaimPage Component – File a property insurance claim */
function PropertyClaimPage({ onNavigate }) {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    incidentType: '',
    incidentDate: '',
    description: '',
    damageAreas: [],
    contactPhone: '(206) 555-0147',
    hasPhotos: false
  });
  const [submitted, setSubmitted] = React.useState(false);

  const updateField = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const toggleDamage = (area) => {
    setFormData(prev => ({
      ...prev,
      damageAreas: prev.damageAreas.includes(area)
        ? prev.damageAreas.filter(a => a !== area)
        : [...prev.damageAreas, area]
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const incidentTypes = ['Storm/Wind Damage', 'Water Damage', 'Fire/Smoke', 'Theft/Vandalism', 'Tree/Debris Damage', 'Other'];
  const damageAreaOptions = ['Roof', 'Exterior Walls', 'Windows/Doors', 'Interior', 'Basement/Foundation', 'Garage', 'Landscaping', 'Fence/Deck'];

  return (
    <div className="page-content">
      <div className="page-breadcrumb">
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('dashboard'); }}>Home</a> / <a href="#" onClick={e => { e.preventDefault(); onNavigate('home-ins'); }}>Homeowners Insurance</a> / File a Claim
      </div>
      <h2 className="page-title">File a Property Claim</h2>

      {submitted ? (
        <div className="policy-card">
          <div className="policy-body" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>Claim Submitted Successfully</h3>
            <p style={{ fontSize: '.9rem', color: '#6b7280', marginBottom: '.3rem' }}>Claim Number: <strong>CLM-{Math.random().toString(36).substring(2, 10).toUpperCase()}</strong></p>
            <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '1.5rem' }}>A claims adjuster will contact you within 24 hours at {formData.contactPhone}.</p>
            <div style={{ display: 'flex', gap: '.6rem', justifyContent: 'center' }}>
              <button className="login-btn" style={{ flex: 0, padding: '.7rem 2rem' }} onClick={() => onNavigate('dashboard')}>Return to Dashboard</button>
              <button className="login-btn" style={{ flex: 0, padding: '.7rem 2rem', background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => onNavigate('home-ins')}>View Policy</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Progress steps */}
          <div className="claim-progress">
            {['Incident Type', 'Details', 'Damage Areas', 'Review'].map((label, i) => (
              <div key={i} className={'claim-progress-step' + (i + 1 <= step ? ' active' : '') + (i + 1 === step ? ' current' : '')}>
                <div className="claim-step-num">{i + 1}</div>
                <div className="claim-step-label">{label}</div>
              </div>
            ))}
          </div>

          <div className="policy-card" style={{ marginTop: '1.5rem' }}>
            <div className="policy-body">
              {step === 1 && (
                <div>
                  <h4 style={{ marginBottom: '1rem' }}>What type of incident occurred?</h4>
                  <div className="claim-type-grid">
                    {incidentTypes.map(type => (
                      <div key={type}
                        className={'claim-type-option' + (formData.incidentType === type ? ' selected' : '')}
                        onClick={() => updateField('incidentType', type)}>
                        {type}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '1.5rem' }}>
                    <button className="login-btn" disabled={!formData.incidentType} onClick={() => setStep(2)}>Continue</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h4 style={{ marginBottom: '1rem' }}>Tell us what happened</h4>
                  <div className="form-group">
                    <label>Date of Incident</label>
                    <input type="date" value={formData.incidentDate} onChange={e => updateField('incidentDate', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea style={{ width: '100%', padding: '.8rem', border: '1.5px solid #d1d5db', borderRadius: 8, fontFamily: 'inherit', fontSize: '.9rem', minHeight: 120, resize: 'vertical' }}
                      value={formData.description}
                      onChange={e => updateField('description', e.target.value)}
                      placeholder="Please describe what happened in detail..." />
                  </div>
                  <div className="form-group">
                    <label>Contact Phone</label>
                    <input type="tel" value={formData.contactPhone} onChange={e => updateField('contactPhone', e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', gap: '.6rem' }}>
                    <button className="login-btn" style={{ flex: 1 }} onClick={() => setStep(3)}>Continue</button>
                    <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setStep(1)}>Back</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h4 style={{ marginBottom: '1rem' }}>Which areas were damaged?</h4>
                  <div className="claim-damage-grid">
                    {damageAreaOptions.map(area => (
                      <label key={area} className={'claim-damage-option' + (formData.damageAreas.includes(area) ? ' selected' : '')}>
                        <input type="checkbox" checked={formData.damageAreas.includes(area)} onChange={() => toggleDamage(area)} />
                        {area}
                      </label>
                    ))}
                  </div>
                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', cursor: 'pointer', textTransform: 'none', letterSpacing: 0, fontSize: '.88rem' }}>
                      <input type="checkbox" checked={formData.hasPhotos} onChange={e => updateField('hasPhotos', e.target.checked)} />
                      I have photos of the damage to upload
                    </label>
                  </div>
                  <div style={{ display: 'flex', gap: '.6rem', marginTop: '1rem' }}>
                    <button className="login-btn" style={{ flex: 1 }} onClick={() => setStep(4)}>Continue</button>
                    <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setStep(2)}>Back</button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h4 style={{ marginBottom: '1rem' }}>Review Your Claim</h4>
                  <div className="info-row"><span className="info-label">Policy</span><span className="info-value">{HOME_POLICY.policyNumber}</span></div>
                  <div className="info-row"><span className="info-label">Incident Type</span><span className="info-value">{formData.incidentType}</span></div>
                  <div className="info-row"><span className="info-label">Date</span><span className="info-value">{formData.incidentDate || 'Not specified'}</span></div>
                  <div className="info-row"><span className="info-label">Description</span><span className="info-value">{formData.description || 'Not provided'}</span></div>
                  <div className="info-row"><span className="info-label">Damaged Areas</span><span className="info-value">{formData.damageAreas.join(', ') || 'None selected'}</span></div>
                  <div className="info-row"><span className="info-label">Contact Phone</span><span className="info-value">{formData.contactPhone}</span></div>
                  <div className="info-row"><span className="info-label">Photos</span><span className="info-value">{formData.hasPhotos ? 'Will upload' : 'None'}</span></div>
                  <div style={{ display: 'flex', gap: '.6rem', marginTop: '1.5rem' }}>
                    <button className="login-btn" style={{ flex: 1 }} onClick={handleSubmit}>Submit Claim</button>
                    <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setStep(3)}>Back</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

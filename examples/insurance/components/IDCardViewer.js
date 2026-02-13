/* IDCardViewer Component – Digital insurance ID card viewer */
function IDCardViewer({ isOpen, onClose }) {
  const [selectedVehicle, setSelectedVehicle] = React.useState(0);
  const [emailSent, setEmailSent] = React.useState(false);

  if (!isOpen) return null;

  const v = AUTO_POLICY.vehicles[selectedVehicle];
  const user = JSON.parse(sessionStorage.getItem('ss_user') || '{}');

  const handleEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Auto Insurance ID Card</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {AUTO_POLICY.vehicles.length > 1 && (
            <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}>
              {AUTO_POLICY.vehicles.map((veh, i) => (
                <button key={i}
                  className={'id-card-tab' + (selectedVehicle === i ? ' active' : '')}
                  onClick={() => setSelectedVehicle(i)}>
                  {veh.icon} {veh.year} {veh.make} {veh.model}
                </button>
              ))}
            </div>
          )}

          <div className="id-card">
            <div className="id-card-header">
              <div className="id-card-logo">
                <div className="shield" style={{ width: 24, height: 24, fontSize: '.65rem' }}>SS</div>
                <span>SecureShield Insurance</span>
              </div>
              <div className="id-card-badge">PROOF OF INSURANCE</div>
            </div>
            <div className="id-card-body">
              <div className="id-card-row">
                <div className="id-card-field">
                  <span className="id-card-label">Named Insured</span>
                  <span className="id-card-value">{user.fullName?.toUpperCase() || 'ELIZABETH A. MORGAN'}</span>
                </div>
                <div className="id-card-field">
                  <span className="id-card-label">Policy Number</span>
                  <span className="id-card-value">{AUTO_POLICY.policyNumber}</span>
                </div>
              </div>
              <div className="id-card-row">
                <div className="id-card-field">
                  <span className="id-card-label">Vehicle</span>
                  <span className="id-card-value">{v.year} {v.make.toUpperCase()} {v.model.toUpperCase()}</span>
                </div>
                <div className="id-card-field">
                  <span className="id-card-label">VIN</span>
                  <span className="id-card-value">{v.vin}</span>
                </div>
              </div>
              <div className="id-card-row">
                <div className="id-card-field">
                  <span className="id-card-label">Effective Date</span>
                  <span className="id-card-value">{AUTO_POLICY.effectiveDate}</span>
                </div>
                <div className="id-card-field">
                  <span className="id-card-label">Expiration Date</span>
                  <span className="id-card-value">{AUTO_POLICY.expirationDate}</span>
                </div>
              </div>
              <div className="id-card-row">
                <div className="id-card-field" style={{ flex: 1 }}>
                  <span className="id-card-label">Bodily Injury Liability</span>
                  <span className="id-card-value">{AUTO_POLICY.bodilyInjury}</span>
                </div>
                <div className="id-card-field">
                  <span className="id-card-label">Property Damage</span>
                  <span className="id-card-value">{AUTO_POLICY.propertyDamage}</span>
                </div>
              </div>
            </div>
            <div className="id-card-footer">
              SecureShield Insurance Co. • P.O. Box 33610 • San Antonio, TX 78265 • 1-800-555-0199
            </div>
          </div>

          <div style={{ display: 'flex', gap: '.6rem', marginTop: '1rem' }}>
            <button className="login-btn" style={{ flex: 1 }} onClick={handleEmail}>
              {emailSent ? '✓ Email Sent!' : '📧 Email ID Card'}
            </button>
            <button className="login-btn" style={{ flex: 1, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => window.print()}>
              🖨️ Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

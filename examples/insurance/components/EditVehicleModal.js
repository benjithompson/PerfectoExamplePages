/* EditVehicleModal Component – Edit vehicle location */
function EditVehicleModal({ isOpen, onClose, vehicleIndex }) {
  const [address, setAddress] = React.useState('4728 Maple Creek Dr');
  const [city, setCity] = React.useState('Portland');
  const [state, setState] = React.useState('OR');
  const [zip, setZip] = React.useState('97205');
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) setSaved(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const v = AUTO_POLICY.vehicles[vehicleIndex || 0];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => onClose(), 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{saved ? 'Location Updated' : 'Edit Vehicle Location'}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {saved ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '.8rem' }}>✅</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '.3rem' }}>Location Updated</h4>
              <p style={{ fontSize: '.85rem', color: '#6b7280' }}>for {v.year} {v.make} {v.model}</p>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '1rem', padding: '.6rem .8rem', background: '#f0f4f8', borderRadius: 8, fontSize: '.85rem' }}>
                {v.icon} {v.year} {v.make} {v.model}
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '.8rem' }}>
                <div className="form-group"><label>City</label><input type="text" value={city} onChange={e => setCity(e.target.value)} /></div>
                <div className="form-group"><label>State</label><input type="text" value={state} onChange={e => setState(e.target.value)} maxLength="2" /></div>
                <div className="form-group"><label>ZIP</label><input type="text" value={zip} onChange={e => setZip(e.target.value)} maxLength="5" /></div>
              </div>
              <div style={{ display: 'flex', gap: '.6rem', marginTop: '.5rem' }}>
                <button className="login-btn" style={{ flex: 1 }} onClick={handleSave}>Save Changes</button>
                <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={onClose}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* NicknameModal Component – Rename policy display name */
function NicknameModal({ isOpen, onClose }) {
  const [nickname, setNickname] = React.useState('');
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) { setNickname(''); setSaved(false); }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => onClose(nickname || null), 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{saved ? 'Nickname Saved' : 'Nickname This Account'}</h3>
          <button className="modal-close" onClick={() => onClose(null)}>✕</button>
        </div>
        <div className="modal-body">
          {saved ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '.8rem' }}>✅</div>
              <p style={{ fontSize: '.9rem', color: '#374151' }}>Policy renamed to <strong>"{nickname}"</strong></p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '1rem' }}>Give your Washington Auto Policy a custom nickname for easy identification.</p>
              <div className="form-group">
                <label>Nickname</label>
                <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="e.g., Family Cars, My Auto" maxLength="30" />
              </div>
              <div style={{ fontSize: '.75rem', color: '#9ca3af', marginBottom: '1rem' }}>{nickname.length}/30 characters</div>
              <div style={{ display: 'flex', gap: '.6rem' }}>
                <button className="login-btn" style={{ flex: 1 }} onClick={handleSave} disabled={!nickname.trim()}>Save Nickname</button>
                <button className="login-btn" style={{ flex: 0, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => onClose(null)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

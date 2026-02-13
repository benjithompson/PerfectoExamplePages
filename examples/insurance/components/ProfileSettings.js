/* ProfileSettings Component – Account profile and settings page */
function ProfileSettings({ onNavigate }) {
  const stored = AuthManager.getUser() || {};
  const [profile, setProfile] = React.useState({
    fullName: stored.fullName || 'Elizabeth A. Morgan',
    email: 'elizabeth.morgan@email.com',
    phone: '(206) 555-0147',
    address: '21110 4th Ave W, Seattle, WA 98199',
    memberId: stored.memberId || '2847391056'
  });
  const [editing, setEditing] = React.useState(null); // 'personal' | 'contact' | 'password' | null
  const [notifications, setNotifications] = React.useState({
    emailBilling: true,
    emailPolicy: true,
    emailMarketing: false,
    smsBilling: true,
    smsAlerts: true,
    smsMarketing: false
  });
  const [saved, setSaved] = React.useState(false);
  const [passwordForm, setPasswordForm] = React.useState({ current: '', new1: '', new2: '' });
  const [passwordChanged, setPasswordChanged] = React.useState(false);

  const handleSave = () => {
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordChange = () => {
    if (passwordForm.new1 && passwordForm.new1 === passwordForm.new2) {
      setPasswordChanged(true);
      setPasswordForm({ current: '', new1: '', new2: '' });
      setEditing(null);
      setTimeout(() => setPasswordChanged(false), 3000);
    }
  };

  const toggleNotif = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="page-content">
      <div className="page-breadcrumb">
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('dashboard'); }}>Home</a> / Profile &amp; Settings
      </div>
      <h2 className="page-title">Profile &amp; Settings</h2>

      {(saved || passwordChanged) && (
        <div className="auto-alert" style={{ borderColor: '#059669', background: '#ecfdf5', marginBottom: '1rem' }}>
          <span className="alert-dot">✅</span>
          <p style={{ color: '#065f46' }}>{passwordChanged ? 'Password updated successfully.' : 'Your changes have been saved.'}</p>
        </div>
      )}

      <div className="dash-grid">
        <div className="main-col">
          {/* Personal Information */}
          <div className="policy-card">
            <div className="policy-header">
              <h4>Personal Information</h4>
              {editing !== 'personal' && <button className="edit-btn" onClick={() => setEditing('personal')}>✏️ Edit</button>}
            </div>
            <div className="policy-body">
              {editing === 'personal' ? (
                <div>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" value={profile.fullName} onChange={e => setProfile({ ...profile, fullName: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })} />
                  </div>
                  <div style={{ display: 'flex', gap: '.6rem' }}>
                    <button className="login-btn" style={{ flex: 0, padding: '.6rem 1.5rem', fontSize: '.85rem' }} onClick={handleSave}>Save</button>
                    <button className="login-btn" style={{ flex: 0, padding: '.6rem 1.5rem', fontSize: '.85rem', background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="policy-grid">
                  <div className="policy-field"><label>Full Name</label><div className="val">{profile.fullName}</div></div>
                  <div className="policy-field"><label>Member ID</label><div className="val">{profile.memberId}</div></div>
                  <div className="policy-field"><label>Address</label><div className="val">{profile.address}</div></div>
                  <div className="policy-field"><label>Member Since</label><div className="val">March 2019</div></div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="policy-card">
            <div className="policy-header">
              <h4>Contact Information</h4>
              {editing !== 'contact' && <button className="edit-btn" onClick={() => setEditing('contact')}>✏️ Edit</button>}
            </div>
            <div className="policy-body">
              {editing === 'contact' ? (
                <div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
                  </div>
                  <div style={{ display: 'flex', gap: '.6rem' }}>
                    <button className="login-btn" style={{ flex: 0, padding: '.6rem 1.5rem', fontSize: '.85rem' }} onClick={handleSave}>Save</button>
                    <button className="login-btn" style={{ flex: 0, padding: '.6rem 1.5rem', fontSize: '.85rem', background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="policy-grid">
                  <div className="policy-field"><label>Email</label><div className="val">{profile.email}</div></div>
                  <div className="policy-field"><label>Phone</label><div className="val">{profile.phone}</div></div>
                </div>
              )}
            </div>
          </div>

          {/* Change Password */}
          <div className="policy-card">
            <div className="policy-header">
              <h4>Security</h4>
              {editing !== 'password' && <button className="edit-btn" onClick={() => setEditing('password')}>Change Password</button>}
            </div>
            <div className="policy-body">
              {editing === 'password' ? (
                <div>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" value={passwordForm.current} onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" value={passwordForm.new1} onChange={e => setPasswordForm({ ...passwordForm, new1: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" value={passwordForm.new2} onChange={e => setPasswordForm({ ...passwordForm, new2: e.target.value })} />
                  </div>
                  {passwordForm.new1 && passwordForm.new2 && passwordForm.new1 !== passwordForm.new2 && (
                    <div className="login-error" style={{ marginBottom: '.8rem' }}>Passwords do not match.</div>
                  )}
                  <div style={{ display: 'flex', gap: '.6rem' }}>
                    <button className="login-btn" style={{ flex: 0, padding: '.6rem 1.5rem', fontSize: '.85rem' }} onClick={handlePasswordChange}>Update Password</button>
                    <button className="login-btn" style={{ flex: 0, padding: '.6rem 1.5rem', fontSize: '.85rem', background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="policy-grid">
                  <div className="policy-field"><label>Password</label><div className="val">••••••••</div></div>
                  <div className="policy-field"><label>Last Changed</label><div className="val">Oct 15, 2025</div></div>
                  <div className="policy-field"><label>Two-Factor Auth</label><div className="val" style={{ color: '#059669' }}>Enabled</div></div>
                </div>
              )}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="policy-card">
            <div className="policy-header">
              <h4>Notification Preferences</h4>
            </div>
            <div className="policy-body">
              <div className="notif-grid">
                <div className="notif-section">
                  <h5 style={{ fontSize: '.85rem', fontWeight: 600, marginBottom: '.6rem' }}>📧 Email Notifications</h5>
                  {[
                    { key: 'emailBilling', label: 'Billing & Payments' },
                    { key: 'emailPolicy', label: 'Policy Updates' },
                    { key: 'emailMarketing', label: 'Offers & Promotions' }
                  ].map(n => (
                    <label key={n.key} className="notif-toggle">
                      <span>{n.label}</span>
                      <button className={'toggle-btn' + (notifications[n.key] ? ' on' : '')} onClick={() => toggleNotif(n.key)}>
                        <span className="toggle-knob" />
                      </button>
                    </label>
                  ))}
                </div>
                <div className="notif-section">
                  <h5 style={{ fontSize: '.85rem', fontWeight: 600, marginBottom: '.6rem' }}>📱 SMS Notifications</h5>
                  {[
                    { key: 'smsBilling', label: 'Payment Reminders' },
                    { key: 'smsAlerts', label: 'Security Alerts' },
                    { key: 'smsMarketing', label: 'Offers & Promotions' }
                  ].map(n => (
                    <label key={n.key} className="notif-toggle">
                      <span>{n.label}</span>
                      <button className={'toggle-btn' + (notifications[n.key] ? ' on' : '')} onClick={() => toggleNotif(n.key)}>
                        <span className="toggle-knob" />
                      </button>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-card">
            <h4>Need Help?</h4>
            <p>Contact our support team for assistance with your account.</p>
            <a href="#" className="sidebar-link" onClick={e => e.preventDefault()}>Call 1-800-555-0199</a>
          </div>
          <div className="sidebar-card">
            <h4>Security Tips</h4>
            <p>Keep your account secure by regularly updating your password and enabling two-factor authentication.</p>
            <a href="#" className="sidebar-link" onClick={e => e.preventDefault()}>Learn More →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

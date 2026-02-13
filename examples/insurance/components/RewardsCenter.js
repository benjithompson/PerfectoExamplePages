/* RewardsCenter Component – Rewards points, catalog, and activity */
function RewardsCenter({ onNavigate }) {
  const [activeTab, setActiveTab] = React.useState('catalog');
  const [redeemItem, setRedeemItem] = React.useState(null);
  const [redeemed, setRedeemed] = React.useState(false);
  const [points, setPoints] = React.useState(3222);

  const handleRedeem = (item) => {
    if (points >= item.points) {
      setRedeemItem(item);
    }
  };

  const confirmRedeem = () => {
    setPoints(prev => prev - redeemItem.points);
    setRedeemed(true);
    setTimeout(() => { setRedeemed(false); setRedeemItem(null); }, 2500);
  };

  return (
    <div className="page-content">
      <div className="page-breadcrumb">
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('dashboard'); }}>Home</a> / Rewards Center
      </div>
      <h2 className="page-title">Rewards Center</h2>

      {/* Points Summary */}
      <div className="rewards-summary-bar">
        <div className="rewards-points-box">
          <div className="rewards-points-label">Your Reward Points</div>
          <div className="rewards-points-value">{points.toLocaleString()}</div>
        </div>
        <div className="rewards-stats">
          <div className="rewards-stat"><span className="stat-label">Points Earned (2026)</span><span className="stat-value">+400</span></div>
          <div className="rewards-stat"><span className="stat-label">Points Redeemed (2026)</span><span className="stat-value">0</span></div>
          <div className="rewards-stat"><span className="stat-label">Member Since</span><span className="stat-value">Mar 2019</span></div>
        </div>
      </div>

      <div className="auto-tabs" style={{ marginTop: '1.5rem' }}>
        <button className={activeTab === 'catalog' ? 'active' : ''} onClick={() => setActiveTab('catalog')}>Redeem Points</button>
        <button className={activeTab === 'activity' ? 'active' : ''} onClick={() => setActiveTab('activity')}>Activity History</button>
      </div>

      {activeTab === 'catalog' && (
        <div className="rewards-grid" style={{ marginTop: '1rem' }}>
          {REWARDS_CATALOG.map(item => (
            <div key={item.id} className="reward-catalog-card">
              <div className="reward-card-icon">{item.icon}</div>
              <div className="reward-card-name">{item.name}</div>
              <div className="reward-card-value">{item.value}</div>
              <div className="reward-card-points">{item.points.toLocaleString()} points</div>
              <button
                className={'reward-redeem-btn' + (points < item.points ? ' disabled' : '')}
                onClick={() => handleRedeem(item)}
                disabled={points < item.points}
              >
                {points < item.points ? 'Not Enough Points' : 'Redeem'}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="policy-card" style={{ marginTop: '1rem' }}>
          <div className="policy-body" style={{ padding: 0 }}>
            {REWARDS_ACTIVITY.map((a, i) => (
              <div key={i} className="rewards-activity-row">
                <div className="rewards-activity-date">{a.date}</div>
                <div className="rewards-activity-desc">{a.description}</div>
                <div className={'rewards-activity-points' + (a.points.startsWith('+') ? ' earned' : ' spent')}>{a.points}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Redeem Confirmation Modal */}
      {redeemItem && (
        <div className="modal-overlay" onClick={() => !redeemed && setRedeemItem(null)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{redeemed ? 'Redeemed!' : 'Confirm Redemption'}</h3>
              <button className="modal-close" onClick={() => setRedeemItem(null)}>✕</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              {redeemed ? (
                <div style={{ padding: '1rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>🎉</div>
                  <p style={{ fontSize: '.9rem', color: '#065f46', fontWeight: 600 }}>Successfully redeemed {redeemItem.name}!</p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>{redeemItem.icon}</div>
                  <h4 style={{ marginBottom: '.3rem' }}>{redeemItem.name}</h4>
                  <p style={{ fontSize: '.85rem', color: '#6b7280', marginBottom: '1rem' }}>{redeemItem.points.toLocaleString()} points → {redeemItem.value}</p>
                  <div style={{ display: 'flex', gap: '.6rem' }}>
                    <button className="login-btn" style={{ flex: 1 }} onClick={confirmRedeem}>Confirm</button>
                    <button className="login-btn" style={{ flex: 1, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={() => setRedeemItem(null)}>Cancel</button>
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

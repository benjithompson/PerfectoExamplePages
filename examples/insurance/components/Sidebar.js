/* Sidebar Component – Right sidebar with membership, tax, rewards, perks cards */
function Sidebar() {
  const [cards, setCards] = React.useState({ membership: true, tax: true, rewards: true, perks: true });
  const hide = key => setCards(prev => ({ ...prev, [key]: false }));

  return (
    <div className="sidebar">
      {cards.membership && (
        <div className="sidebar-card">
          <button className="close-btn" onClick={() => hide('membership')}>✕</button>
          <h4>Make your membership work for you.</h4>
          <p>Get customized offers and benefits tailored to your needs.</p>
          <a href="#" className="sidebar-link">Personalize my membership →</a>
        </div>
      )}
      {cards.tax && (
        <div className="sidebar-card">
          <button className="close-btn" onClick={() => hide('tax')}>✕</button>
          <h4>Federal Tax-Filing Deadline</h4>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '.1rem' }}>65 days until Apr. 15, 2026</p>
          <p>Get your refund fast. Members save on TurboTax.</p>
          <a href="#" className="sidebar-link">Visit Tax Center →</a>
        </div>
      )}
      {cards.rewards && (
        <div className="sidebar-card">
          <button className="close-btn" onClick={() => hide('rewards')}>✕</button>
          <h4>Reward Balance</h4>
          <div className="reward-points">3,222</div>
          <div className="reward-label">Reward Points</div>
          <br />
          <a href="#" className="sidebar-link">Go to Rewards Center →</a>
        </div>
      )}
      {cards.perks && (
        <div className="perks-banner">
          <div className="perks-logo">★ SECURESHIELD PERKS</div>
          <h4>Perks: Up to 40% off Fun!</h4>
          <p>Discounted Fun for Members</p>
          <a href="#" className="perks-btn">Featured Deal</a>
          <div className="perks-footer">
            <a href="#">View all Perks →</a>
          </div>
        </div>
      )}
    </div>
  );
}

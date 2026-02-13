/* PerksPage Component – Member perks and deals browsing page */
function PerksPage({ onNavigate }) {
  const [filter, setFilter] = React.useState('all');
  const [selectedDeal, setSelectedDeal] = React.useState(null);

  const categories = ['all', 'Travel', 'Entertainment', 'Dining', 'Shopping', 'Home'];
  const filtered = filter === 'all' ? PERKS_DEALS : PERKS_DEALS.filter(d => d.category === filter);

  return (
    <div className="page-content">
      <div className="page-breadcrumb">
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('dashboard'); }}>Home</a> / Perks &amp; Deals
      </div>

      <div className="perks-page-hero">
        <div className="perks-page-hero-inner">
          <div className="perks-logo" style={{ marginBottom: '.8rem' }}>★ SECURESHIELD PERKS</div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '.4rem' }}>Member Exclusive Deals</h2>
          <p style={{ fontSize: '.9rem', opacity: .8 }}>Save up to 40% with your SecureShield membership on travel, entertainment, dining, and more.</p>
        </div>
      </div>

      <div className="doc-filters" style={{ marginBottom: '1.2rem' }}>
        {categories.map(c => (
          <button key={c} className={'doc-filter-btn' + (filter === c ? ' active' : '')} onClick={() => setFilter(c)}>
            {c === 'all' ? 'All Deals' : c}
          </button>
        ))}
      </div>

      <div className="perks-grid">
        {filtered.map(deal => (
          <div key={deal.id} className="perk-card" onClick={() => setSelectedDeal(deal)}>
            <div className="perk-icon">{deal.icon}</div>
            <div className="perk-info">
              <div className="perk-name">{deal.name}</div>
              <div className="perk-discount">{deal.discount}</div>
              <div className="perk-desc">{deal.description}</div>
            </div>
            <div className="perk-category-tag">{deal.category}</div>
          </div>
        ))}
      </div>

      {/* Deal Detail Modal */}
      {selectedDeal && (
        <div className="modal-overlay" onClick={() => setSelectedDeal(null)}>
          <div className="modal" style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Deal Details</h3>
              <button className="modal-close" onClick={() => setSelectedDeal(null)}>✕</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>{selectedDeal.icon}</div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '.3rem' }}>{selectedDeal.name}</h4>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#059669', marginBottom: '.5rem' }}>{selectedDeal.discount}</div>
              <p style={{ fontSize: '.88rem', color: '#374151', marginBottom: '1rem', lineHeight: 1.6 }}>{selectedDeal.description}</p>
              <div style={{ background: '#f0f4f8', borderRadius: 8, padding: '.8rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '.75rem', color: '#6b7280', marginBottom: '.2rem' }}>Promo Code</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: 2 }}>SHIELD{selectedDeal.id}2026</div>
              </div>
              <button className="login-btn" onClick={() => setSelectedDeal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

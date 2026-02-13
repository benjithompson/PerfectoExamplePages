/* SearchOverlay Component – Global search with keyboard navigation */
function SearchOverlay({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const allItems = [
    { label: 'Dashboard', desc: 'Return to your account home page', page: 'dashboard', icon: '🏠', category: 'Pages' },
    { label: 'Auto Insurance', desc: 'View your auto insurance policy details', page: 'auto', icon: '🚗', category: 'Pages' },
    { label: 'Home Insurance', desc: 'View your homeowners policy', page: 'home-ins', icon: '🏠', category: 'Pages' },
    { label: 'Banking', desc: 'View your bank accounts and transactions', page: 'banking', icon: '🏦', category: 'Pages' },
    { label: 'Documents & Inbox', desc: 'View your documents and messages', page: 'documents', icon: '📄', category: 'Pages' },
    { label: 'Rewards Center', desc: 'View and redeem your reward points', page: 'rewards', icon: '🏆', category: 'Pages' },
    { label: 'Perks & Deals', desc: 'Browse member discounts and deals', page: 'perks', icon: '🏷️', category: 'Pages' },
    { label: 'Profile & Settings', desc: 'Manage your account settings', page: 'profile', icon: '⚙️', category: 'Pages' },
    { label: 'File an Auto Claim', desc: 'Report an auto insurance claim', page: 'auto-claims', icon: '🏷️', category: 'Actions' },
    { label: 'File a Property Claim', desc: 'Report a homeowners insurance claim', page: 'property-claim', icon: '🏠', category: 'Actions' },
    { label: 'Make a Payment', desc: 'Pay your insurance premium', page: 'payment', icon: '💳', category: 'Actions' },
    { label: 'Get a Quote', desc: 'Get an insurance quote', page: 'quote', icon: '📋', category: 'Actions' },
    { label: 'How to file a claim', desc: 'Step-by-step guide for filing claims', icon: '❓', category: 'Help' },
    { label: 'Understanding your coverage', desc: 'Learn about your policy coverage types', icon: '❓', category: 'Help' },
    { label: 'Billing & payment options', desc: 'Payment methods and billing information', icon: '❓', category: 'Help' },
    { label: 'Contact support', desc: 'Call 1-800-555-0199 or use chat', icon: '📞', category: 'Help' }
  ];

  const filtered = query.length === 0 ? allItems : allItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    }
  };

  const handleSelect = (item) => {
    if (item.page) {
      onClose();
      onNavigate(item.page);
    }
  };

  // Group by category
  const grouped = {};
  filtered.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  let flatIndex = -1;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-wrap">
          <span className="search-icon-lg">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search pages, actions, help topics..."
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
          />
          <kbd className="search-kbd">ESC</kbd>
        </div>
        <div className="search-results">
          {Object.keys(grouped).map(category => (
            <div key={category}>
              <div className="search-category">{category}</div>
              {grouped[category].map(item => {
                flatIndex++;
                const idx = flatIndex;
                return (
                  <div
                    key={item.label}
                    className={'search-result-item' + (selectedIndex === idx ? ' selected' : '')}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <span className="search-result-icon">{item.icon}</span>
                    <div className="search-result-text">
                      <div className="search-result-label">{item.label}</div>
                      <div className="search-result-desc">{item.desc}</div>
                    </div>
                    {item.page && <span className="search-result-arrow">→</span>}
                  </div>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>No results found for "{query}"</div>
          )}
        </div>
      </div>
    </div>
  );
}

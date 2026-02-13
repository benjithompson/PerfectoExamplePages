/* DocumentsInbox Component – Documents and Inbox page */
function DocumentsInbox({ onNavigate }) {
  const [activeTab, setActiveTab] = React.useState('inbox');
  const [messages, setMessages] = React.useState(INBOX_MESSAGES);
  const [docs] = React.useState(DOCUMENTS);
  const [selectedMessage, setSelectedMessage] = React.useState(null);
  const [docFilter, setDocFilter] = React.useState('all');

  const markRead = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const openMessage = (msg) => {
    markRead(msg.id);
    setSelectedMessage(msg);
  };

  const unreadCount = messages.filter(m => !m.read).length;
  const unreadDocCount = docs.filter(d => !d.read).length;

  const filteredDocs = docFilter === 'all' ? docs : docs.filter(d => d.category.toLowerCase() === docFilter);

  return (
    <div className="page-content">
      <div className="page-breadcrumb">
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('dashboard'); }}>Home</a> / Documents &amp; Inbox
      </div>
      <h2 className="page-title">Documents &amp; Messages</h2>

      <div className="auto-tabs" style={{ marginTop: 0 }}>
        <button className={activeTab === 'inbox' ? 'active' : ''} onClick={() => { setActiveTab('inbox'); setSelectedMessage(null); }}>
          Inbox {unreadCount > 0 && <span className="tab-badge">{unreadCount}</span>}
        </button>
        <button className={activeTab === 'documents' ? 'active' : ''} onClick={() => { setActiveTab('documents'); setSelectedMessage(null); }}>
          Documents {unreadDocCount > 0 && <span className="tab-badge">{unreadDocCount}</span>}
        </button>
      </div>

      {activeTab === 'inbox' && !selectedMessage && (
        <div className="policy-card" style={{ marginTop: '1rem' }}>
          <div className="policy-body" style={{ padding: 0 }}>
            {messages.map(msg => (
              <div key={msg.id} className={'inbox-row' + (!msg.read ? ' unread' : '')} onClick={() => openMessage(msg)}>
                <div className="inbox-dot">{!msg.read && <span className="unread-dot" />}</div>
                <div className="inbox-content">
                  <div className="inbox-from">{msg.from}</div>
                  <div className="inbox-subject">{msg.subject}</div>
                  <div className="inbox-preview">{msg.preview}</div>
                </div>
                <div className="inbox-date">{msg.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'inbox' && selectedMessage && (
        <div className="policy-card" style={{ marginTop: '1rem' }}>
          <div className="policy-header">
            <div>
              <button className="back-link" onClick={() => setSelectedMessage(null)}>← Back to Inbox</button>
            </div>
          </div>
          <div className="policy-body">
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '.3rem' }}>{selectedMessage.subject}</h4>
              <div style={{ fontSize: '.82rem', color: '#6b7280' }}>From: {selectedMessage.from} • {selectedMessage.date}</div>
            </div>
            <div style={{ fontSize: '.9rem', color: '#374151', lineHeight: 1.7 }}>
              <p>{selectedMessage.preview}</p>
              <p style={{ marginTop: '1rem' }}>Thank you for being a valued SecureShield member. If you have any questions about this message, please don't hesitate to contact us at 1-800-555-0199 or use the chat feature on our website.</p>
              <p style={{ marginTop: '1rem' }}>Best regards,<br />{selectedMessage.from} Team</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div>
          <div className="doc-filters" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            {['all', 'auto', 'home', 'banking', 'tax', 'retirement'].map(f => (
              <button key={f} className={'doc-filter-btn' + (docFilter === f ? ' active' : '')} onClick={() => setDocFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="policy-card">
            <div className="policy-body" style={{ padding: 0 }}>
              {filteredDocs.map(doc => (
                <div key={doc.id} className={'doc-row' + (!doc.read ? ' unread' : '')}>
                  <span className="doc-icon">{doc.icon}</span>
                  <div className="doc-info">
                    <div className="doc-title">{doc.title}</div>
                    <div className="doc-meta">{doc.category} • {doc.date}</div>
                  </div>
                  <button className="doc-download-btn">⬇ Download</button>
                </div>
              ))}
              {filteredDocs.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>No documents found for this filter.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

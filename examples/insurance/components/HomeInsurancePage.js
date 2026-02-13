/* HomeInsurancePage Component – Homeowners insurance policy page with tabs */
function HomeInsurancePage({ onNavigate, onPayment }) {
  const [activeTab, setActiveTab] = React.useState('overview');
  const p = HOME_POLICY;

  return (
    <div className="page-content">
      <div className="page-breadcrumb">
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('dashboard'); }}>Home</a> / <a href="#" onClick={e => { e.preventDefault(); onNavigate('auto'); }}>Insurance</a> / Homeowners
      </div>
      <h2 className="page-title">Homeowners Insurance</h2>

      <div className="auto-tabs" style={{ marginTop: 0 }}>
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'coverage' ? 'active' : ''} onClick={() => setActiveTab('coverage')}>Coverage Details</button>
        <button className={activeTab === 'discounts' ? 'active' : ''} onClick={() => setActiveTab('discounts')}>Discounts</button>
        <button className={activeTab === 'documents' ? 'active' : ''} onClick={() => setActiveTab('documents')}>Documents</button>
      </div>

      {activeTab === 'overview' && (
        <div className="dash-grid" style={{ marginTop: '1rem' }}>
          <div className="main-col">
            <div className="policy-card">
              <div className="policy-header">
                <h4>Policy Overview</h4>
                <span className="policy-status active">● Active</span>
              </div>
              <div className="policy-body">
                <div className="policy-grid">
                  <div className="policy-field"><label>Policy Number</label><div className="val">{p.policyNumber}</div></div>
                  <div className="policy-field"><label>Effective Date</label><div className="val">{p.effectiveDate}</div></div>
                  <div className="policy-field"><label>Expiration Date</label><div className="val">{p.expirationDate}</div></div>
                  <div className="policy-field"><label>Premium</label><div className="val">{p.premium} / {p.frequency}</div></div>
                </div>
              </div>
              <div className="policy-footer">
                <button className="primary" onClick={() => setActiveTab('coverage')}>View Full Details</button>
                <button onClick={() => onPayment && onPayment('Homeowners Insurance', '$142.75')}>Make a Payment</button>
                <button onClick={() => onNavigate('property-claim')}>File a Claim</button>
              </div>
            </div>

            <div className="policy-card">
              <div className="policy-header">
                <h4>Property Details</h4>
              </div>
              <div className="policy-body">
                <div className="policy-grid">
                  <div className="policy-field"><label>Address</label><div className="val">{p.address}</div></div>
                  <div className="policy-field"><label>Year Built</label><div className="val">{p.yearBuilt}</div></div>
                  <div className="policy-field"><label>Square Footage</label><div className="val">{p.sqft} sq ft</div></div>
                  <div className="policy-field"><label>Roof Type</label><div className="val">{p.roofType}</div></div>
                </div>
              </div>
            </div>

            <div className="policy-card">
              <div className="policy-header">
                <h4>Coverage Summary</h4>
              </div>
              <div className="policy-body">
                <div className="policy-grid">
                  <div className="policy-field"><label>Dwelling Coverage</label><div className="val">{p.dwelling}</div></div>
                  <div className="policy-field"><label>Personal Property</label><div className="val">{p.personalProperty}</div></div>
                  <div className="policy-field"><label>Personal Liability</label><div className="val">{p.liability}</div></div>
                  <div className="policy-field"><label>Deductible</label><div className="val">{p.deductible}</div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="sidebar-card">
              <h4>Home Inventory</h4>
              <p>Keep an up-to-date inventory of your belongings to simplify the claims process.</p>
              <a href="#" className="sidebar-link" onClick={e => e.preventDefault()}>Start Inventory →</a>
            </div>
            <div className="sidebar-card">
              <h4>Disaster Preparedness</h4>
              <p>Review your emergency plan and ensure your coverage is adequate for natural disasters.</p>
              <a href="#" className="sidebar-link" onClick={e => e.preventDefault()}>Review Plan →</a>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'coverage' && (
        <div style={{ marginTop: '1rem' }}>
          <div className="policy-card">
            <div className="policy-header"><h4>Dwelling Coverage</h4></div>
            <div className="policy-body">
              <div className="policy-grid">
                <div className="policy-field"><label>Dwelling (Coverage A)</label><div className="val">{p.dwelling}</div></div>
                <div className="policy-field"><label>Other Structures (Coverage B)</label><div className="val">$42,500</div></div>
                <div className="policy-field"><label>Personal Property (Coverage C)</label><div className="val">{p.personalProperty}</div></div>
                <div className="policy-field"><label>Loss of Use (Coverage D)</label><div className="val">$85,000</div></div>
              </div>
            </div>
          </div>
          <div className="policy-card">
            <div className="policy-header"><h4>Liability Coverage</h4></div>
            <div className="policy-body">
              <div className="policy-grid">
                <div className="policy-field"><label>Personal Liability (Coverage E)</label><div className="val">{p.liability}</div></div>
                <div className="policy-field"><label>Medical Payments (Coverage F)</label><div className="val">$5,000</div></div>
              </div>
            </div>
          </div>
          <div className="policy-card">
            <div className="policy-header"><h4>Deductibles</h4></div>
            <div className="policy-body">
              <div className="policy-grid">
                <div className="policy-field"><label>All Peril Deductible</label><div className="val">{p.deductible}</div></div>
                <div className="policy-field"><label>Wind/Hail Deductible</label><div className="val">$2,500</div></div>
                <div className="policy-field"><label>Earthquake</label><div className="val">Not Covered</div></div>
                <div className="policy-field"><label>Flood</label><div className="val">Separate Policy Required</div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'discounts' && (
        <div style={{ marginTop: '1rem' }}>
          <div className="policy-card">
            <div className="policy-header"><h4>Your Homeowners Discounts</h4></div>
            <div className="policy-body">
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '.85rem', color: '#374151', marginBottom: '1rem' }}>You're saving <strong style={{ color: '#065f46', fontSize: '1.1rem' }}>$438.20</strong> annually thanks to the following discounts:</p>
              </div>
              <div className="policy-grid">
                <div className="policy-field"><label>Multi-Policy Discount</label><div className="val" style={{ color: '#065f46' }}>-$186.50</div></div>
                <div className="policy-field"><label>Claims-Free Discount</label><div className="val" style={{ color: '#065f46' }}>-$98.40</div></div>
                <div className="policy-field"><label>Home Security System</label><div className="val" style={{ color: '#065f46' }}>-$72.30</div></div>
                <div className="policy-field"><label>New Roof Discount</label><div className="val" style={{ color: '#065f46' }}>-$81.00</div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div style={{ marginTop: '1rem' }}>
          <div className="policy-card">
            <div className="policy-body" style={{ padding: 0 }}>
              {[
                { icon: '📄', title: 'Homeowners Policy Declaration', date: 'Jan 01, 2025' },
                { icon: '📄', title: 'Policy Renewal Notice', date: 'Dec 10, 2025' },
                { icon: '💳', title: 'Premium Payment Receipt – Feb 2026', date: 'Feb 01, 2026' },
                { icon: '📋', title: 'Home Inspection Report', date: 'Nov 15, 2024' },
                { icon: '📄', title: 'Coverage Change Confirmation', date: 'Sep 20, 2025' }
              ].map((doc, i) => (
                <div key={i} className="doc-row">
                  <span className="doc-icon">{doc.icon}</span>
                  <div className="doc-info">
                    <div className="doc-title">{doc.title}</div>
                    <div className="doc-meta">{doc.date}</div>
                  </div>
                  <button className="doc-download-btn">⬇ Download</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* HomeInsurancePage Component – Homeowners insurance policy page */
function HomeInsurancePage({ onNavigate }) {
  const p = HOME_POLICY;

  return (
    <div className="page-content">
      <div className="page-breadcrumb">
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('dashboard'); }}>Home</a> / <a href="#" onClick={e => { e.preventDefault(); onNavigate('auto'); }}>Insurance</a> / Homeowners
      </div>
      <h2 className="page-title">Homeowners Insurance</h2>

      <div className="dash-grid">
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
              <button className="primary">View Full Details</button>
              <button>Make a Payment</button>
              <button>File a Claim</button>
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
            <a href="#" className="sidebar-link">Start Inventory →</a>
          </div>
          <div className="sidebar-card">
            <h4>Disaster Preparedness</h4>
            <p>Review your emergency plan and ensure your coverage is adequate for natural disasters.</p>
            <a href="#" className="sidebar-link">Review Plan →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

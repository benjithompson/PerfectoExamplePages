/* AutoInsurancePage Component – Auto insurance policy page with tabs */
function AutoInsurancePage({ onNavigate }) {
  const [activeTab, setActiveTab] = React.useState('summary');
  const p = AUTO_POLICY;

  return (
    <div className="auto-page">
      <div className="auto-page-header">
        <h2>My Auto Insurance Policy (WA)</h2>
        <button className="ask-btn">Ask SecureShield</button>
      </div>

      <div className="auto-tabs">
        <button className={activeTab === 'summary' ? 'active' : ''} onClick={() => setActiveTab('summary')}>Summary</button>
        <button className={activeTab === 'coverage' ? 'active' : ''} onClick={() => setActiveTab('coverage')}>Coverage</button>
        <button className={activeTab === 'discounts' ? 'active' : ''} onClick={() => setActiveTab('discounts')}>Discounts &amp; Savings</button>
      </div>

      {activeTab === 'summary' && (
        <div>
          {/* Alert */}
          <div className="auto-alert">
            <span className="alert-dot">ℹ️</span>
            <p>Your auto ID card and Proof of Insurance have been e-mailed, and coverage is effective immediately. Your 2025 TOYOTA 86 will be added as of 12:01 a.m. Standard Time on 11/10/2025. Any premium changes will be reflected in your next billing statement.</p>
          </div>

          {/* Promo */}
          <div className="auto-promo">
            <h4>Get small business insurance.</h4>
            <p>Let us help protect what you've worked hard for.</p>
            <a href="#" className="learn-more">Learn More</a>
          </div>

          {/* Action Cards Row */}
          <div className="action-cards-row">
            <div className="action-card">
              <div className="card-icon">⬇️</div>
              <div className="card-label">Get Auto ID Cards</div>
              <div className="card-sub">For Registration and Legal Purposes</div>
            </div>
            <div className="action-card">
              <div className="card-icon">⬇️</div>
              <div className="card-label">Get Proof of Coverage</div>
              <div className="card-sub">For Lienholder or Leasing Company</div>
            </div>
            <div className="action-card premium-card">
              <div className="premium-label">Six-Month Premium</div>
              <div className="premium-amount">$992.24</div>
              <div className="premium-note">after discounts &amp; savings</div>
              <div className="disc-label">Discounts &amp; Savings</div>
              <div className="disc-amount">$927.46</div>
              <button className="pay-btn">View and Pay Bill</button>
            </div>
          </div>

          {/* Action Tiles Row */}
          <div className="action-tiles-row">
            <div className="action-tile">
              <div className="tile-icon">🚗</div>
              <div className="tile-label">Add, Replace or Delete a Vehicle</div>
            </div>
            <div className="action-tile">
              <div className="tile-icon">🔄</div>
              <div className="tile-label">View or Update Coverage and Deductibles</div>
            </div>
            <div className="action-tile">
              <div className="tile-icon">📍</div>
              <div className="tile-label">Change Vehicle Location</div>
            </div>
            <div className="action-tile highlight">
              <div className="tile-icon">🛡️</div>
              <div className="tile-label">Save $40.24 on your Auto. Add Life Insurance</div>
            </div>
            <div className="action-tile">
              <div className="tile-icon">🐷</div>
              <div className="tile-label">Want a Lower Premium?</div>
            </div>
          </div>

          {/* Policy Info Bar */}
          <div className="policy-info-bar">
            <div className="policy-title-group">
              <h4>Washington Auto Policy <a href="#">» Nickname This Account</a></h4>
              <span className="cic">CIC 10944759 7101</span>
            </div>
            <div className="policy-info-meta">
              <div className="meta-item">
                <span className="meta-label">Company Code</span>
                <span className="meta-value">459</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Policy Term</span>
                <span className="meta-value">Nov 05, 2025 - May 05, 2026</span>
              </div>
            </div>
            <a href="#" className="print-link">🖨️ Print | Feb 09, 2026</a>
          </div>

          {/* Vehicle Rows */}
          {p.vehicles.map((v, i) => (
            <div className="vehicle-row-card" key={i}>
              <div className="vehicle-row-header">
                <span className="veh-name">{v.year} {v.make.toUpperCase()} {v.model.toUpperCase()}</span>
                <div className="veh-cost">
                  <span className="veh-price">$ {(parseFloat(v.premium.replace('$','')) * 6).toFixed(2)}</span>
                  <span className="veh-per"> per 6 months</span>
                </div>
                <div className="veh-deductibles">
                  <div className="ded-label">Deductibles</div>
                  <div className="ded-value">Comprehensive {p.deductible} / Collision 1,000</div>
                </div>
              </div>
              <div className="vehicle-row-body">
                <div className="veh-img">{v.icon}</div>
                <div className="vehicle-row-detail">
                  <div className="detail-row">
                    <span className="dlabel">Vehicle Location</span>
                    <a href="#">» Edit</a>
                  </div>
                  <div className="detail-row">
                    <span className="dvalue">21110 4TH AVE W</span>
                  </div>
                  <div className="detail-row">
                    <span className="dvalue">SEATTLE, WA 98199</span>
                  </div>
                </div>
                <div className="vehicle-row-detail">
                  <div className="detail-row">
                    <span className="dlabel">Drivers License Information</span>
                    <a href="#">» Edit</a>
                  </div>
                  <div className="detail-row">
                    <span className="dvalue">ELIZABETH A MORGAN</span>
                  </div>
                  <div className="detail-row">
                    <span className="dvalue">WA • MORG***E482LN</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'coverage' && (
        <div>
          <div className="policy-card" style={{ marginTop: '1rem' }}>
            <div className="policy-header"><h4>Coverage Summary</h4></div>
            <div className="policy-body">
              <div className="policy-grid">
                <div className="policy-field"><label>Deductible (Collision)</label><div className="val">{p.deductible}</div></div>
                <div className="policy-field"><label>Bodily Injury</label><div className="val">{p.bodilyInjury}</div></div>
                <div className="policy-field"><label>Property Damage</label><div className="val">{p.propertyDamage}</div></div>
                <div className="policy-field"><label>Uninsured Motorist</label><div className="val">{p.uninsuredMotorist}</div></div>
                <div className="policy-field"><label>Comprehensive Deductible</label><div className="val">$500</div></div>
                <div className="policy-field"><label>Medical Payments</label><div className="val">$10,000</div></div>
                <div className="policy-field"><label>Rental Reimbursement</label><div className="val">$50/day, $1,500 max</div></div>
                <div className="policy-field"><label>Roadside Assistance</label><div className="val">Included</div></div>
              </div>
            </div>
          </div>
          {p.vehicles.map((v, i) => (
            <div className="policy-card" key={i}>
              <div className="policy-header"><h4>{v.year} {v.make} {v.model}</h4></div>
              <div className="policy-body">
                <div className="policy-grid">
                  <div className="policy-field"><label>Collision Deductible</label><div className="val">$1,000</div></div>
                  <div className="policy-field"><label>Comprehensive Deductible</label><div className="val">{p.deductible}</div></div>
                  <div className="policy-field"><label>Emergency Roadside</label><div className="val">Included</div></div>
                  <div className="policy-field"><label>Rental Car</label><div className="val">$50/day</div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'discounts' && (
        <div>
          <div className="policy-card" style={{ marginTop: '1rem' }}>
            <div className="policy-header"><h4>Your Discounts &amp; Savings</h4></div>
            <div className="policy-body">
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '.85rem', color: '#374151', marginBottom: '1rem' }}>You're saving <strong style={{ color: '#065f46', fontSize: '1.1rem' }}>$927.46</strong> on your six-month premium thanks to the following discounts:</p>
              </div>
              <div className="policy-grid">
                <div className="policy-field"><label>Multi-Policy Discount</label><div className="val" style={{ color: '#065f46' }}>-$312.18</div></div>
                <div className="policy-field"><label>Safe Driver Discount</label><div className="val" style={{ color: '#065f46' }}>-$198.40</div></div>
                <div className="policy-field"><label>Defensive Driving</label><div className="val" style={{ color: '#065f46' }}>-$74.52</div></div>
                <div className="policy-field"><label>Vehicle Safety Features</label><div className="val" style={{ color: '#065f46' }}>-$89.30</div></div>
                <div className="policy-field"><label>Low Mileage Discount</label><div className="val" style={{ color: '#065f46' }}>-$142.80</div></div>
                <div className="policy-field"><label>Loyalty Discount</label><div className="val" style={{ color: '#065f46' }}>-$110.26</div></div>
              </div>
            </div>
          </div>
          <div className="auto-promo" style={{ marginTop: '1rem' }}>
            <h4>Want even more savings?</h4>
            <p>Add Life Insurance to save an additional $40.24 on your auto policy. Bundle and save with SecureShield.</p>
            <a href="#" className="learn-more">Get a Quote</a>
          </div>
        </div>
      )}
    </div>
  );
}

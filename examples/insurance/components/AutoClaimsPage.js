/* AutoClaimsPage Component – Auto insurance claims page */
function AutoClaimsPage({ onNavigate }) {
  return (
    <div className="claims-page">
      <div className="claims-hero">
        <div className="claims-hero-inner">
          <h1>Auto insurance claims</h1>
          <p className="hero-sub">We're here to help every step of the way.</p>
          <div className="claims-hero-actions">
            <a href="#" className="hero-btn primary" onClick={e => e.preventDefault()}>Report an auto claim</a>
            <a href="#" className="hero-btn secondary" onClick={e => e.preventDefault()}>Check claim status  ›</a>
          </div>
        </div>
      </div>

      <div className="claims-content">
        <h3>Find out what's covered before you file a claim.</h3>
        <p className="body-text">
          Our policies typically cover things like damage to your car from an
          accident or if you hit another driver and are at fault. If you're not
          sure about your coverage, you can check your policy.
        </p>
        <a href="#" className="check-link" onClick={e => { e.preventDefault(); onNavigate('auto'); }}>Check my policy  ›</a>
      </div>

      <div className="claims-process">
        <div className="claims-process-inner">
          <h3>How the auto claims process works</h3>
          <p className="process-sub">We'll help you with every step of your claim and provide personalized updates along the way.</p>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-num">1</div>
              <h5>Report your claim</h5>
              <p>Tell us what happened. Get started on secureshield.com or the SecureShield Mobile App.</p>
            </div>
            <div className="process-step">
              <div className="step-num">2</div>
              <h5>Get more details</h5>
              <p>We'll review what happened and check what your policy covers. You can also add more details in <a href="#" onClick={e => e.preventDefault()}>My Claims Center</a>.</p>
            </div>
            <div className="process-step">
              <div className="step-num">3</div>
              <h5>Evaluate the claim</h5>
              <p>We'll go over the details and figure out what to pay based on your coverage, deductible and who's responsible.</p>
            </div>
            <div className="process-step">
              <div className="step-num">4</div>
              <h5>Settle the claim</h5>
              <p>If covered, we'll make a payment to you or a third party.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

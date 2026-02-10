/* ============================================
   SecureShield Insurance – Static Data Constants
   ============================================ */

var TEST_USER = {
  username: 'elizabeth.morgan',
  password: 'Test1234!',
  name: 'Elizabeth',
  fullName: 'Elizabeth A. Morgan',
  memberId: '2847391056'
};

var ACCOUNTS = {
  banking: [
    { name: 'Platinum Visa', mask: '8683', balance: '$0.00', type: 'credit' },
    { name: 'USAA Classic Checking', mask: '4219', balance: '$4,287.53', type: 'checking' },
    { name: 'USAA Savings', mask: '7734', balance: '$12,841.09', type: 'savings' }
  ],
  insurance: [
    { name: 'Auto Insurance (WA)', detail: 'Policy #AUT-8834721', premium: '$186.40/mo' },
    { name: 'Homeowners', detail: '21110 4TH AVE W', premium: '$142.75/mo' },
    { name: 'Valuable Personal Property', detail: 'JEWELRY', premium: '$23.50/mo' }
  ],
  retirement: [
    { name: 'Your Retirement Savings', balance: '$87,432.18', change: '+$1,247.30', changePercent: '+1.45%' },
    { name: 'Roth IRA', balance: '$34,219.55', change: '+$412.80', changePercent: '+1.22%' }
  ]
};

var AUTO_POLICY = {
  policyNumber: 'AUT-8834721',
  status: 'Active',
  effectiveDate: 'Mar 15, 2025',
  expirationDate: 'Sep 15, 2025',
  premium: '$186.40',
  frequency: 'Monthly',
  deductible: '$500',
  bodilyInjury: '$100,000 / $300,000',
  propertyDamage: '$100,000',
  uninsuredMotorist: '$100,000 / $300,000',
  vehicles: [
    { year: '2022', make: 'Toyota', model: 'RAV4 XLE', vin: '2T3W1RFV...8241', premium: '$104.20', icon: '🚙' },
    { year: '2019', make: 'Honda', model: 'Civic Sport', vin: '19XFC2F5...3847', premium: '$82.20', icon: '🚗' }
  ]
};

var HOME_POLICY = {
  policyNumber: 'HOM-5529183',
  status: 'Active',
  effectiveDate: 'Jan 01, 2025',
  expirationDate: 'Jan 01, 2026',
  premium: '$142.75',
  frequency: 'Monthly',
  dwelling: '$425,000',
  personalProperty: '$212,500',
  liability: '$300,000',
  deductible: '$1,000',
  address: '21110 4th Ave W, Seattle, WA 98199',
  yearBuilt: '2004',
  sqft: '2,340',
  roofType: 'Composition Shingle'
};

var MEGA_MENU = {
  columns: [
    { title: 'Vehicle Insurance', links: ['Auto','Pay as You Drive','Motorcycle','ATV','RV and Motorhome','Boat','Bicycle and E-Bike','Classic and Collector Car','Aviation'], viewAll: 'View All Insurance' },
    { title: 'Property Insurance', links: ['Renters','Homeowners','Condo','Landlord','Personal Property','Flood','Mobile Home','Collectibles','Cell Phone Protection'] },
    { title: 'Life Insurance', sub: [
      { heading: 'Life Insurance', links: ['Long-Term Care'] },
      { heading: 'Umbrella Insurance', links: [] },
      { heading: 'Health Insurance', links: ['Medicare Plans','Individual and Family Plans','Dental','Vision','Supplemental Health Gap'] }
    ]},
    { title: 'Business Insurance', sub: [
      { heading: 'Business Insurance', links: ['Commercial General Liability','Business Owners Policy','Commercial Auto'] },
      { heading: 'Overseas Insurance', links: [] },
      { heading: 'Additional Insurance', links: ['Pet','Travel','Event'] }
    ]}
  ],
  sidebar: [
    { icon: '🏷️', label: 'Claims' },
    { icon: '🚗', label: 'Roadside Assistance' },
    { icon: '🪪', label: 'Auto ID Card' },
    { icon: '🏠', label: 'Auto and Property Insurance Bill' },
    { icon: '💰', label: 'Life Insurance and Other Bills' },
    { icon: '⚙️', label: 'Manage Auto and Property Insurance' },
    { icon: '📋', label: 'View All Insurance Support' }
  ]
};

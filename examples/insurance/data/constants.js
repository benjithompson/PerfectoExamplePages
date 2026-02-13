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

var DOCUMENTS = [
  { id: 1, type: 'policy', title: 'Auto Insurance Policy Declaration', date: 'Jan 15, 2026', category: 'Auto', icon: '📄', read: true },
  { id: 2, type: 'bill', title: 'Auto Insurance Premium – February 2026', date: 'Feb 01, 2026', category: 'Auto', icon: '💳', read: true },
  { id: 3, type: 'policy', title: 'Homeowners Policy Renewal Notice', date: 'Dec 10, 2025', category: 'Home', icon: '📄', read: true },
  { id: 4, type: 'bill', title: 'Homeowners Premium – February 2026', date: 'Feb 01, 2026', category: 'Home', icon: '💳', read: false },
  { id: 5, type: 'statement', title: 'Monthly Banking Statement – January 2026', date: 'Jan 31, 2026', category: 'Banking', icon: '🏦', read: false },
  { id: 6, type: 'tax', title: '1099-INT Tax Form 2025', date: 'Jan 20, 2026', category: 'Tax', icon: '📋', read: false },
  { id: 7, type: 'policy', title: 'Personal Property Insurance Certificate', date: 'Nov 05, 2025', category: 'Property', icon: '📄', read: true },
  { id: 8, type: 'statement', title: 'Retirement Account Quarterly Statement', date: 'Dec 31, 2025', category: 'Retirement', icon: '📊', read: true }
];

var INBOX_MESSAGES = [
  { id: 1, from: 'SecureShield Auto', subject: 'Your auto ID card is ready', date: 'Feb 12, 2026', preview: 'Your updated auto insurance ID card for your 2022 Toyota RAV4 is now available for download.', read: false },
  { id: 2, from: 'SecureShield Billing', subject: 'Payment received – Thank you', date: 'Feb 05, 2026', preview: 'We received your auto insurance premium payment of $186.40. Your next payment is due March 1, 2026.', read: false },
  { id: 3, from: 'SecureShield Perks', subject: '🎉 New member deals available!', date: 'Feb 03, 2026', preview: 'Check out this month\'s exclusive member discounts on travel, dining, and entertainment.', read: true },
  { id: 4, from: 'SecureShield Home', subject: 'Annual policy review reminder', date: 'Jan 28, 2026', preview: 'It\'s time to review your homeowners policy to ensure your coverage still meets your needs.', read: true },
  { id: 5, from: 'SecureShield Security', subject: 'New device login detected', date: 'Jan 22, 2026', preview: 'A new device was used to sign in to your account. If this was you, no action is needed.', read: true },
  { id: 6, from: 'SecureShield Rewards', subject: 'You earned 150 bonus points!', date: 'Jan 15, 2026', preview: 'Congratulations! You earned 150 bonus reward points for paying your bill on time.', read: true }
];

var TRANSACTIONS = [
  { id: 1, date: 'Feb 12, 2026', description: 'Whole Foods Market', amount: '-$87.34', category: 'Groceries', account: 'checking' },
  { id: 2, date: 'Feb 11, 2026', description: 'Shell Gas Station', amount: '-$52.18', category: 'Auto & Gas', account: 'checking' },
  { id: 3, date: 'Feb 10, 2026', description: 'Direct Deposit – Employer', amount: '+$3,245.00', category: 'Income', account: 'checking' },
  { id: 4, date: 'Feb 09, 2026', description: 'Netflix Subscription', amount: '-$15.99', category: 'Entertainment', account: 'credit' },
  { id: 5, date: 'Feb 08, 2026', description: 'Starbucks', amount: '-$6.45', category: 'Dining', account: 'credit' },
  { id: 6, date: 'Feb 07, 2026', description: 'Amazon.com', amount: '-$124.55', category: 'Shopping', account: 'credit' },
  { id: 7, date: 'Feb 06, 2026', description: 'Transfer to Savings', amount: '-$500.00', category: 'Transfer', account: 'checking' },
  { id: 8, date: 'Feb 06, 2026', description: 'Transfer from Checking', amount: '+$500.00', category: 'Transfer', account: 'savings' },
  { id: 9, date: 'Feb 05, 2026', description: 'Auto Insurance Premium', amount: '-$186.40', category: 'Insurance', account: 'checking' },
  { id: 10, date: 'Feb 04, 2026', description: 'Trader Joe\'s', amount: '-$63.21', category: 'Groceries', account: 'checking' }
];

var REWARDS_CATALOG = [
  { id: 1, name: 'Amazon Gift Card', points: 500, value: '$5.00', icon: '🎁', category: 'Gift Cards' },
  { id: 2, name: 'Starbucks Gift Card', points: 750, value: '$7.50', icon: '☕', category: 'Gift Cards' },
  { id: 3, name: 'Statement Credit', points: 1000, value: '$10.00', icon: '💵', category: 'Credits' },
  { id: 4, name: 'Target Gift Card', points: 1500, value: '$15.00', icon: '🎯', category: 'Gift Cards' },
  { id: 5, name: 'Travel Credit', points: 2000, value: '$25.00', icon: '✈️', category: 'Travel' },
  { id: 6, name: 'Dining Credit', points: 2500, value: '$30.00', icon: '🍽️', category: 'Dining' }
];

var REWARDS_ACTIVITY = [
  { date: 'Feb 05, 2026', description: 'On-time payment bonus', points: '+150' },
  { date: 'Jan 15, 2026', description: 'Auto policy renewal', points: '+200' },
  { date: 'Jan 01, 2026', description: 'Monthly membership bonus', points: '+50' },
  { date: 'Dec 20, 2025', description: 'Referral bonus – John Smith', points: '+500' },
  { date: 'Dec 15, 2025', description: 'Redeemed: Amazon Gift Card', points: '-500' },
  { date: 'Dec 01, 2025', description: 'Monthly membership bonus', points: '+50' }
];

var PERKS_DEALS = [
  { id: 1, name: 'Walt Disney World® Resort', discount: 'Up to 40% Off', description: 'Save on select Disney Resort hotels and theme park tickets.', icon: '🏰', category: 'Travel' },
  { id: 2, name: 'AMC Theatres', discount: 'Up to 25% Off', description: 'Discounted movie tickets for members and their families.', icon: '🎬', category: 'Entertainment' },
  { id: 3, name: 'Hertz Car Rental', discount: 'Up to 25% Off', description: 'Save on rental cars for your next vacation or business trip.', icon: '🚘', category: 'Travel' },
  { id: 4, name: 'DoorDash', discount: '$10 Off First Order', description: 'New customers get $10 off their first DoorDash delivery order.', icon: '🍕', category: 'Dining' },
  { id: 5, name: 'Samsung Electronics', discount: 'Up to 30% Off', description: 'Exclusive member pricing on select Samsung products.', icon: '📱', category: 'Shopping' },
  { id: 6, name: 'Expedia Hotels', discount: 'Up to 15% Off', description: 'Exclusive hotel savings when you book through our partner link.', icon: '🏨', category: 'Travel' },
  { id: 7, name: 'ADT Home Security', discount: '$100 Off Install', description: 'Save on ADT home security system installation for members.', icon: '🔒', category: 'Home' },
  { id: 8, name: 'FTD Flowers', discount: '25% Off', description: 'Beautiful bouquets and arrangements at member-exclusive prices.', icon: '💐', category: 'Shopping' }
];

var CHAT_FAQ = [
  { q: 'How do I file a claim?', a: 'You can file a claim by clicking "Claims" in the Insurance section of your dashboard, or by calling us at 1-800-555-0199. Online claims can be filed 24/7.' },
  { q: 'How do I make a payment?', a: 'Click the "Bills" button on any insurance section, or navigate to the payment page from your policy details. We accept checking accounts, credit cards, and debit cards.' },
  { q: 'How do I get my auto ID card?', a: 'Your digital auto ID card is available on the Auto Insurance page. Click "Get Auto ID Cards" to view and download it. You can also request a physical card to be mailed.' },
  { q: 'How do I update my address?', a: 'You can update your address by going to your Profile settings (click your avatar in the top navigation) or by editing the vehicle location on your Auto Insurance page.' },
  { q: 'What does my policy cover?', a: 'Your coverage details are available on each insurance policy page under the "Coverage" tab. For specific questions about what\'s covered in a situation, please contact us.' },
  { q: 'How do I add a vehicle?', a: 'Navigate to your Auto Insurance page and click "Add, Replace or Delete a Vehicle" tile. You\'ll need the vehicle\'s VIN, year, make, and model.' }
];

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

/* ============================================================
   Shared chrome (header / nav / footer) + demo session helpers
   for the BlazeMeter Tech mock example.
   Usage: <script src="site.js"></script> then COLLEGE.renderHeader('academics')
   ============================================================ */
window.COLLEGE = (function () {
  'use strict';

  const NAV = [
    {
      id: 'about', label: 'About', href: 'index.html',
      items: [
        ['About', 'index.html'], ['Mission, Vision and Strategic Directions', 'index.html'],
        ['History', 'index.html'], ['College Initiatives', 'index.html'],
        ['Consumer Information', 'index.html'], ['Board of Trustees', 'index.html'],
        ['Accreditation', 'index.html'], ['Employment', 'index.html'],
        ['Campus Safety', 'index.html'], ['News & Events', 'index.html']
      ]
    },
    {
      id: 'admissions', label: 'Admissions &amp;<br>Financial Aid', href: 'admissions.html',
      items: [
        ['Admissions', 'admissions.html'], ['Apply Online', 'apply.html'],
        ['Tuition &amp; Fees', 'admissions.html'], ['Prospective Students', 'admissions.html'],
        ['Credit for Prior Learning', 'admissions.html'],
        ['Campus Visit Day / Info Sessions', 'admissions.html'],
        ['New Student Orientation', 'admissions.html'],
        ['Financial Aid &amp; Scholarships', 'admissions.html'],
        ['Request Information', 'admissions.html']
      ]
    },
    {
      id: 'academics', label: 'Academics', href: 'registration-info.html',
      items: [
        ['Programs of Study', 'registration-info.html'], ['Registration', 'registration-info.html'],
        ['Register for Courses', 'register.html'], ['Academic Calendar', 'registration-info.html'],
        ['Transfer Options', 'registration-info.html'], ['Catalog/Student Handbook', 'registration-info.html']
      ]
    },
    {
      id: 'resources', label: 'Student<br>Resources', href: 'index.html',
      items: [
        ['Student Support', 'index.html'], ['Graduation', 'index.html'], ['Advising', 'index.html'],
        ['Libraries', 'index.html'], ['Bookstores', 'index.html'], ['Career Services', 'index.html'],
        ['Disability Support Services', 'index.html'], ['Veterans Services', 'index.html'],
        ['Transcript or Diploma Request', 'index.html']
      ]
    },
    {
      id: 'campuslife', label: 'Campus Life', href: 'index.html',
      items: [
        ['Calendar of Events', 'index.html'], ['Clubs &amp; Organizations', 'index.html'],
        ['Athletics', 'index.html'], ['Dining Services', 'index.html'],
        ['Parking and Transportation', 'index.html'], ['Student Spotlight', 'index.html']
      ]
    },
    {
      id: 'contined', label: 'Continuing<br>Education', href: 'index.html',
      items: [
        ['Course Search and Registration', 'index.html'], ['Workforce Training', 'index.html'],
        ['Testing Centers', 'index.html'], ['Customized Training', 'index.html'],
        ['Personal Enrichment', 'index.html'], ['Youth Programs', 'index.html']
      ]
    },
    {
      id: 'campuses', label: 'Our Campuses', href: 'index.html',
      items: [['Ashford', 'index.html'], ['Brookdale', 'index.html'], ['Clearview', 'index.html'], ['Northgate', 'index.html']]
    }
  ];

  const LOGO = (extraClass) =>
    '<span class="logo ' + (extraClass || '') + '">' +
      '<span class="logo-top">BLAZEMETER</span>' +
      '<span class="logo-mid">TECHNICAL<i class="logo-diamond"></i>COMMUNITY</span>' +
      '<span class="logo-bot">COLLEGE</span>' +
    '</span>';

  function renderHeader(activeId) {
    const nav = NAV.map(group =>
      '<div class="nav-item" data-nav="' + group.id + '">' +
        '<button type="button" class="nav-top" aria-expanded="false" aria-haspopup="true" ' +
          'id="nav-' + group.id + '">' + group.label + '</button>' +
        '<ul class="nav-dropdown" aria-labelledby="nav-' + group.id + '">' +
          group.items.map(i => '<li><a href="' + i[1] + '">' + i[0] + '</a></li>').join('') +
        '</ul>' +
      '</div>'
    ).join('');

    document.getElementById('site-header').innerHTML =
      '<a class="visually-hidden" href="#main-content">Skip to main content.</a>' +
      '<div class="utility-bar"><div class="container utility-inner">' +
        '<a class="logo-link" href="index.html" aria-label="BlazeMeter Tech home">' + LOGO() + '</a>' +
        '<div class="utility-right">' +
          '<div class="utility-links">' +
            '<a href="apply.html" id="utility-apply-now">Apply Now</a><span class="sep">|</span>' +
            '<a href="index.html">Giving</a><span class="sep">|</span>' +
            '<a href="index.html">News &amp; Events</a><span class="sep">|</span>' +
            '<a href="index.html">Employment</a><span class="sep">|</span>' +
            '<a href="index.html">Campus Safety</a>' +
            '<a class="btn btn-green btn-sm" href="login.html" id="utility-portal">MyBlazeMeter</a>' +
            '<form class="search-form" role="search" onsubmit="return false;">' +
              '<label class="visually-hidden" for="site-search">Search</label>' +
              '<input id="site-search" type="text" placeholder="Enter Keyword" />' +
              '<button class="btn btn-green btn-sm" type="submit">Search</button>' +
            '</form>' +
          '</div>' +
          '<div class="utility-secondary">' +
            '<a href="index.html">Alumni</a>' +
            '<a href="admissions.html">Prospective Students</a>' +
            '<a class="demo-pill" href="../../index.html" title="Back to the examples index">Demo &#8617; Index</a>' +
          '</div>' +
        '</div>' +
      '</div></div>' +
      '<nav class="nav-main" aria-label="Main menu">' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav-list">&#9776; Menu</button>' +
        '<div class="container collapsed" id="main-nav-list">' + nav + '</div>' +
      '</nav>';

    wireNav(activeId);
  }

  function wireNav(activeId) {
    const items = [...document.querySelectorAll('.nav-item')];
    items.forEach(item => {
      const btn = item.querySelector('.nav-top');
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = item.classList.contains('open');
        items.forEach(other => {
          other.classList.remove('open');
          other.querySelector('.nav-top').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
      if (item.dataset.nav === activeId) item.querySelector('.nav-top').style.background = 'var(--brand-green-dark)';
    });
    document.addEventListener('click', () => {
      items.forEach(item => {
        item.classList.remove('open');
        item.querySelector('.nav-top').setAttribute('aria-expanded', 'false');
      });
    });
    const toggle = document.querySelector('.nav-toggle');
    const list = document.getElementById('main-nav-list');
    toggle.addEventListener('click', () => {
      const collapsed = list.classList.toggle('collapsed');
      toggle.setAttribute('aria-expanded', String(!collapsed));
    });
    // Desktop shows the full bar; the collapsed class only bites under 780px.
  }

  function renderFooter() {
    document.getElementById('site-footer').innerHTML =
      '<div class="container">' +
        '<div class="footer-logo">' + LOGO('footer') + '</div>' +
        '<div class="footer-links">' +
          '<a href="index.html">Contact Directory</a>' +
          '<a href="index.html">Employee Directory</a>' +
          '<a href="index.html">Digital Accessibility</a>' +
          '<a href="index.html">Privacy Policy</a>' +
        '</div>' +
        '<div class="footer-contact">Questions? We&rsquo;re here to help. &#9742; (555) 010-1000 &nbsp; &#9993; Contact Us</div>' +
        '<p class="footer-legal">BlazeMeter Technical Community College is an equal opportunity employer and educational institution. ' +
          'The College does not discriminate on the basis of race, color, creed, religion, sex, national origin, age, disability, ' +
          'marital status, veteran status, or political affiliation or belief in its educational programs, activities, admissions, or employment practices.</p>' +
        '<p class="footer-disclaimer">Demo / test page. BlazeMeter Technical Community College is a fictional institution ' +
          'created for automated-testing practice. All names, records, and credentials shown here are fabricated. ' +
          '&nbsp;<a href="../../index.html">Back to examples index</a></p>' +
      '</div>';
  }

  /* ---------------- Demo session (flow 2) ---------------- */
  const SESSION_KEY = 'college-demo-session';
  const CART_KEY = 'college-demo-cart';
  const APP_KEY = 'college-demo-application';

  const DEMO_USER = {
    username: 'jdoe',
    password: 'Test1234!',
    studentId: 'S00123456',
    firstName: 'Jordan',
    lastName: 'Doe',
    email: 'jdoe@student.example.edu',
    program: 'A.A.S. Computer Information Systems',
    campus: 'Ashford',
    advisor: 'Dr. Renee Patterson',
    creditsEarned: 34,
    gpa: '3.42',
    balance: '$0.00',
    holds: 0
  };

  const store = {
    get(key, fallback) {
      try { return JSON.parse(sessionStorage.getItem(key)) ?? fallback; }
      catch (e) { return fallback; }
    },
    set(key, value) { sessionStorage.setItem(key, JSON.stringify(value)); },
    clear(key) { sessionStorage.removeItem(key); }
  };

  function login(username, password) {
    const ok = username.trim().toLowerCase() === DEMO_USER.username && password === DEMO_USER.password;
    if (ok) store.set(SESSION_KEY, { user: DEMO_USER, loginAt: new Date().toISOString() });
    return ok;
  }

  function session() { return store.get(SESSION_KEY, null); }

  function requireSession() {
    const s = session();
    if (!s) { window.location.href = 'login.html?next=' + encodeURIComponent(location.pathname.split('/').pop()); return null; }
    return s;
  }

  function logout() {
    store.clear(SESSION_KEY);
    store.clear(CART_KEY);
    window.location.href = 'login.html';
  }

  function renderPortalChrome(activePage) {
    const s = session();
    const name = s ? s.user.firstName + ' ' + s.user.lastName : 'Guest';
    const id = s ? s.user.studentId : '';
    const link = (href, label) =>
      '<a href="' + href + '"' + (href === activePage ? ' aria-current="page"' : '') + '>' + label + '</a>';
    document.getElementById('portal-chrome').innerHTML =
      '<div class="portal-bar"><div class="container">' +
        '<span class="portal-title">MyBlazeMeter &middot; Student Information System</span>' +
        '<span class="portal-user">' +
          '<span id="portal-user-name">' + name + ' (' + id + ')</span>' +
          '<button class="btn btn-sm btn-outline" type="button" id="portal-signout">Sign Out</button>' +
        '</span>' +
      '</div></div>' +
      '<div class="portal-nav"><div class="container">' +
        link('portal.html', 'Dashboard') +
        link('register.html', 'Register or Drop Classes') +
        link('portal.html#grades', 'Grades') +
        link('portal.html#financial', 'Financial Information') +
        link('portal.html#profile', 'Student Profile') +
      '</div></div>';
    document.getElementById('portal-signout').addEventListener('click', logout);
  }

  return {
    NAV, DEMO_USER, SESSION_KEY, CART_KEY, APP_KEY,
    renderHeader, renderFooter, renderPortalChrome,
    store, login, session, requireSession, logout
  };
})();

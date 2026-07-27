/* Fictional course catalog used by register.html (flow 2). */
window.COLLEGE_TERMS = [
  { code: 'FA26', name: 'Fall 2026', window: 'Registration open Aug 17 - Sep 8, 2026' },
  { code: 'SP27', name: 'Spring 2027', window: 'Registration opens Oct 26, 2026' },
  { code: 'SU27', name: 'Summer 2027', window: 'Registration opens Mar 15, 2027' }
];

window.COLLEGE_SUBJECTS = [
  { code: 'ACC', name: 'Accounting' },
  { code: 'BIO', name: 'Biology' },
  { code: 'BUS', name: 'Business Administration' },
  { code: 'CHM', name: 'Chemistry' },
  { code: 'CIS', name: 'Computer Information Systems' },
  { code: 'CRJ', name: 'Criminal Justice' },
  { code: 'ENG', name: 'English' },
  { code: 'MAT', name: 'Mathematics' },
  { code: 'NUR', name: 'Nursing' },
  { code: 'PSY', name: 'Psychology' }
];

window.COLLEGE_CAMPUSES = ['Ashford', 'Brookdale', 'Clearview', 'Northgate'];

/* status: open | waitlist ; days use M T W R F ; time is 24h for conflict math */
window.COLLEGE_SECTIONS = [
  { crn: '10241', subject: 'CIS', number: '106', section: '001', title: 'Introduction to Programming', credits: 4, campus: 'Ashford', days: 'MW', start: '09:00', end: '10:50', instructor: 'K. Alvarez', seats: 12, cap: 24, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10242', subject: 'CIS', number: '106', section: '002', title: 'Introduction to Programming', credits: 4, campus: 'Ashford', days: 'TR', start: '18:00', end: '19:50', instructor: 'K. Alvarez', seats: 3, cap: 24, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10243', subject: 'CIS', number: '106', section: '900', title: 'Introduction to Programming', credits: 4, campus: 'Ashford', days: 'ONLINE', start: '', end: '', instructor: 'P. Nguyen', seats: 0, cap: 30, status: 'waitlist', term: 'FA26', mode: 'Online Asynchronous' },
  { crn: '10310', subject: 'CIS', number: '175', section: '001', title: 'Database Fundamentals', credits: 3, campus: 'Ashford', days: 'MW', start: '11:00', end: '12:20', instructor: 'S. Whitfield', seats: 8, cap: 20, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10311', subject: 'CIS', number: '175', section: '002', title: 'Database Fundamentals', credits: 3, campus: 'Clearview', days: 'TR', start: '09:30', end: '10:50', instructor: 'S. Whitfield', seats: 14, cap: 20, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10388', subject: 'CIS', number: '220', section: '001', title: 'Network Essentials', credits: 3, campus: 'Ashford', days: 'MW', start: '09:30', end: '10:50', instructor: 'R. Boateng', seats: 6, cap: 18, status: 'open', term: 'FA26', mode: 'Hybrid' },
  { crn: '10402', subject: 'CIS', number: '265', section: '001', title: 'Web Application Development', credits: 4, campus: 'Northgate', days: 'TR', start: '13:00', end: '14:50', instructor: 'M. Feldman', seats: 9, cap: 22, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10455', subject: 'ENG', number: '101', section: '004', title: 'Composition I', credits: 3, campus: 'Ashford', days: 'TR', start: '11:00', end: '12:20', instructor: 'A. Rowley', seats: 5, cap: 22, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10456', subject: 'ENG', number: '101', section: '009', title: 'Composition I', credits: 3, campus: 'Brookdale', days: 'MWF', start: '08:00', end: '08:50', instructor: 'T. Marsh', seats: 11, cap: 22, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10460', subject: 'ENG', number: '102', section: '001', title: 'Composition II', credits: 3, campus: 'Ashford', days: 'MW', start: '14:00', end: '15:20', instructor: 'A. Rowley', seats: 16, cap: 22, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10501', subject: 'MAT', number: '153', section: '002', title: 'College Algebra', credits: 4, campus: 'Ashford', days: 'MW', start: '09:30', end: '11:20', instructor: 'D. Okafor', seats: 4, cap: 26, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10502', subject: 'MAT', number: '153', section: '005', title: 'College Algebra', credits: 4, campus: 'Ashford', days: 'TR', start: '14:00', end: '15:50', instructor: 'D. Okafor', seats: 10, cap: 26, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10510', subject: 'MAT', number: '281', section: '001', title: 'Statistics', credits: 3, campus: 'Clearview', days: 'TR', start: '09:30', end: '10:50', instructor: 'L. Cheng', seats: 0, cap: 24, status: 'waitlist', term: 'FA26', mode: 'In Person' },
  { crn: '10604', subject: 'BIO', number: '120', section: '001', title: 'Anatomy and Physiology I', credits: 4, campus: 'Brookdale', days: 'MW', start: '13:00', end: '14:50', instructor: 'J. Ibarra', seats: 7, cap: 20, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10611', subject: 'BIO', number: '130', section: '003', title: 'General Biology', credits: 4, campus: 'Ashford', days: 'TR', start: '08:00', end: '09:50', instructor: 'H. Sandoval', seats: 13, cap: 24, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10702', subject: 'ACC', number: '110', section: '001', title: 'Financial Accounting', credits: 3, campus: 'Northgate', days: 'MW', start: '18:00', end: '19:20', instructor: 'G. Delacroix', seats: 15, cap: 25, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10715', subject: 'BUS', number: '100', section: '002', title: 'Introduction to Business', credits: 3, campus: 'Ashford', days: 'ONLINE', start: '', end: '', instructor: 'C. Mbeki', seats: 22, cap: 40, status: 'open', term: 'FA26', mode: 'Online Asynchronous' },
  { crn: '10801', subject: 'PSY', number: '121', section: '006', title: 'General Psychology', credits: 3, campus: 'Ashford', days: 'ONLINE', start: '', end: '', instructor: 'E. Trujillo', seats: 18, cap: 40, status: 'open', term: 'FA26', mode: 'Online Asynchronous' },
  { crn: '10802', subject: 'PSY', number: '121', section: '001', title: 'General Psychology', credits: 3, campus: 'Clearview', days: 'MW', start: '11:00', end: '12:20', instructor: 'E. Trujillo', seats: 9, cap: 30, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '10905', subject: 'CRJ', number: '110', section: '001', title: 'Introduction to Criminal Justice', credits: 3, campus: 'Brookdale', days: 'TR', start: '11:00', end: '12:20', instructor: 'V. Castellano', seats: 12, cap: 28, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '11002', subject: 'NUR', number: '100', section: '001', title: 'Nursing Fundamentals', credits: 5, campus: 'Northgate', days: 'MWF', start: '08:00', end: '10:20', instructor: 'B. Okonkwo', seats: 2, cap: 16, status: 'open', term: 'FA26', mode: 'In Person' },
  { crn: '11110', subject: 'CHM', number: '110', section: '001', title: 'General Chemistry I', credits: 4, campus: 'Clearview', days: 'TR', start: '13:00', end: '14:50', instructor: 'F. Adeyemi', seats: 6, cap: 20, status: 'open', term: 'FA26', mode: 'In Person' },

  /* Spring 2027 sampling */
  { crn: '20241', subject: 'CIS', number: '211', section: '001', title: 'Data Structures', credits: 4, campus: 'Ashford', days: 'MW', start: '09:00', end: '10:50', instructor: 'K. Alvarez', seats: 18, cap: 24, status: 'open', term: 'SP27', mode: 'In Person' },
  { crn: '20310', subject: 'CIS', number: '280', section: '001', title: 'Cloud Computing', credits: 3, campus: 'Ashford', days: 'TR', start: '18:00', end: '19:20', instructor: 'P. Nguyen', seats: 20, cap: 24, status: 'open', term: 'SP27', mode: 'Hybrid' },
  { crn: '20460', subject: 'ENG', number: '102', section: '003', title: 'Composition II', credits: 3, campus: 'Ashford', days: 'TR', start: '11:00', end: '12:20', instructor: 'A. Rowley', seats: 19, cap: 22, status: 'open', term: 'SP27', mode: 'In Person' },
  { crn: '20510', subject: 'MAT', number: '281', section: '002', title: 'Statistics', credits: 3, campus: 'Ashford', days: 'MW', start: '13:00', end: '14:20', instructor: 'L. Cheng', seats: 21, cap: 24, status: 'open', term: 'SP27', mode: 'In Person' }
];

/* Courses the demo student has already completed / is enrolled in. */
window.COLLEGE_STUDENT_PLAN = [
  { subject: 'CIS', number: '106', title: 'Introduction to Programming', credits: 4, status: 'Planned', term: 'FA26' },
  { subject: 'MAT', number: '153', title: 'College Algebra', credits: 4, status: 'Planned', term: 'FA26' },
  { subject: 'ENG', number: '101', title: 'Composition I', credits: 3, status: 'Planned', term: 'FA26' }
];

window.COLLEGE_COMPLETED = [
  { course: 'CIS 101', title: 'Computing Fundamentals', credits: 3, grade: 'A', term: 'Spring 2026' },
  { course: 'ENG 095', title: 'Reading and Writing Workshop', credits: 3, grade: 'B+', term: 'Spring 2026' },
  { course: 'MAT 095', title: 'Quantitative Reasoning Support', credits: 3, grade: 'A-', term: 'Fall 2025' },
  { course: 'SSC 100', title: 'First Year Seminar', credits: 1, grade: 'A', term: 'Fall 2025' }
];

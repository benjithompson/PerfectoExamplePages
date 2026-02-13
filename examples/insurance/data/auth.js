/* ============================================
   AuthManager – Client-side session management
   JWT-like token in localStorage with expiry + idle timeout.
   ============================================ */

var AuthManager = (function () {
  var TOKEN_KEY = 'ss_auth_token';
  var ACTIVITY_KEY = 'ss_last_active';
  var SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
  var IDLE_TIMEOUT = 15 * 60 * 1000;     // 15 minutes of inactivity
  var _idleTimer = null;
  var _activityEvents = ['click', 'keydown', 'mousemove', 'scroll', 'touchstart'];

  // --- Token helpers ---

  function _encode(obj) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
  }

  function _decode(str) {
    try {
      return JSON.parse(decodeURIComponent(escape(atob(str))));
    } catch (e) {
      return null;
    }
  }

  function _now() {
    return Date.now();
  }

  // --- Public API ---

  /** Authenticate a user – creates a signed token with expiry */
  function login(user) {
    var token = {
      user: user,
      iat: _now(),                        // issued at
      exp: _now() + SESSION_DURATION      // expires at
    };
    localStorage.setItem(TOKEN_KEY, _encode(token));
    localStorage.setItem(ACTIVITY_KEY, String(_now()));
    // Set Datadog RUM user context if available
    if (window.DD_RUM && user) {
      window.DD_RUM.setUser({
        id: user.memberId || user.username,
        name: user.fullName || user.username,
        email: user.username + '@secureshield.com'
      });
    }
  }

  /** Get current user if session is valid, or null */
  function getUser() {
    var raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;

    var token = _decode(raw);
    if (!token || !token.user || !token.exp) return null;

    // Check token expiry
    if (_now() > token.exp) {
      logout('Session expired');
      return null;
    }

    // Check idle timeout
    var lastActive = parseInt(localStorage.getItem(ACTIVITY_KEY) || '0', 10);
    if (lastActive && (_now() - lastActive) > IDLE_TIMEOUT) {
      logout('Session timed out due to inactivity');
      return null;
    }

    return token.user;
  }

  /** Quick boolean check */
  function isAuthenticated() {
    return getUser() !== null;
  }

  /** Get remaining session time in ms */
  function getTimeRemaining() {
    var raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return 0;
    var token = _decode(raw);
    if (!token || !token.exp) return 0;
    return Math.max(0, token.exp - _now());
  }

  /** Extend the session (e.g. on "Keep me signed in" click) */
  function refreshSession() {
    var raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return;
    var token = _decode(raw);
    if (!token) return;
    token.exp = _now() + SESSION_DURATION;
    localStorage.setItem(TOKEN_KEY, _encode(token));
    localStorage.setItem(ACTIVITY_KEY, String(_now()));
  }

  /** Record user activity (called on interaction events) */
  function touchActivity() {
    localStorage.setItem(ACTIVITY_KEY, String(_now()));
  }

  /** Clear session and redirect to login */
  function logout(reason) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ACTIVITY_KEY);
    stopIdleWatch();
    // Clear Datadog RUM user
    if (window.DD_RUM) {
      try { window.DD_RUM.clearUser(); } catch (e) { /* noop */ }
    }
    // Redirect with optional reason
    var url = 'login.html';
    if (reason) {
      url += '?reason=' + encodeURIComponent(reason);
    }
    window.location.href = url;
  }

  /** Start monitoring for idle timeout + session expiry */
  function startIdleWatch() {
    // Record activity on user interactions
    function onActivity() { touchActivity(); }
    _activityEvents.forEach(function (evt) {
      document.addEventListener(evt, onActivity, { passive: true });
    });

    // Check every 30 seconds for idle / expired
    _idleTimer = setInterval(function () {
      var user = getUser(); // this internally checks expiry + idle
      if (!user) {
        // getUser already called logout() if expired
        return;
      }

      // Warn when < 2 minutes remaining
      var remaining = getTimeRemaining();
      if (remaining > 0 && remaining < 2 * 60 * 1000) {
        _dispatchWarning(remaining);
      }
    }, 30000);
  }

  /** Stop idle monitoring */
  function stopIdleWatch() {
    if (_idleTimer) {
      clearInterval(_idleTimer);
      _idleTimer = null;
    }
    _activityEvents.forEach(function (evt) {
      document.removeEventListener(evt, touchActivity);
    });
  }

  /** Dispatch a custom event for session-about-to-expire warning */
  function _dispatchWarning(remaining) {
    if (typeof CustomEvent === 'function') {
      window.dispatchEvent(new CustomEvent('ss-session-warning', {
        detail: { remainingMs: remaining }
      }));
    }
  }

  /** Auth guard – redirect if not authenticated */
  function requireAuth() {
    if (!isAuthenticated()) {
      window.location.href = 'login.html';
      return null;
    }
    return getUser();
  }

  // --- Migrate legacy sessionStorage sessions ---
  // (One-time: convert old ss_user sessionStorage to new token format)
  function migrateLegacy() {
    var legacy = sessionStorage.getItem('ss_user');
    if (legacy && !localStorage.getItem(TOKEN_KEY)) {
      try {
        var user = JSON.parse(legacy);
        login(user);
        sessionStorage.removeItem('ss_user');
      } catch (e) { /* ignore bad data */ }
    }
  }

  // Run migration on load
  migrateLegacy();

  return {
    login: login,
    logout: logout,
    getUser: getUser,
    isAuthenticated: isAuthenticated,
    getTimeRemaining: getTimeRemaining,
    refreshSession: refreshSession,
    touchActivity: touchActivity,
    startIdleWatch: startIdleWatch,
    stopIdleWatch: stopIdleWatch,
    requireAuth: requireAuth,
    SESSION_DURATION: SESSION_DURATION,
    IDLE_TIMEOUT: IDLE_TIMEOUT
  };
})();

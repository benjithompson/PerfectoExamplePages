/* ============================================
   SecureShield Insurance – Auth Manager
   (Svelte ES Module Version)
   Uses ss_svelte_ prefixed localStorage keys
   ============================================ */

import { TEST_USER } from './constants.js';

const TOKEN_KEY = 'ss_svelte_auth_token';
const LAST_ACTIVE_KEY = 'ss_svelte_last_active';
const SESSION_WARNING_EVENT = 'ss-svelte-session-warning';
const SESSION_DURATION = 30 * 60 * 1000;   // 30 minutes
const IDLE_TIMEOUT = 15 * 60 * 1000;       // 15 minutes
const WARNING_BEFORE = 2 * 60 * 1000;      // 2 minutes before expiry

function createToken(user) {
  const payload = {
    sub: user.username,
    name: user.name,
    fullName: user.fullName,
    email: user.email,
    iat: Date.now(),
    exp: Date.now() + SESSION_DURATION
  };
  return btoa(JSON.stringify(payload));
}

function decodeToken(token) {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}

const AuthManager = {
  login(username, password) {
    if (username === TEST_USER.username && password === TEST_USER.password) {
      const token = createToken(TEST_USER);
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
      return {
        success: true,
        user: {
          username: TEST_USER.username,
          name: TEST_USER.name,
          fullName: TEST_USER.fullName,
          email: TEST_USER.email
        }
      };
    }
    return { success: false, error: 'Invalid username or password' };
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LAST_ACTIVE_KEY);
  },

  getUser() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    const payload = decodeToken(token);
    if (!payload) return null;
    if (Date.now() > payload.exp) {
      this.logout();
      return null;
    }
    return {
      username: payload.sub,
      name: payload.name,
      fullName: payload.fullName,
      email: payload.email
    };
  },

  isAuthenticated() {
    return this.getUser() !== null;
  },

  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  refreshSession() {
    const user = this.getUser();
    if (user) {
      const token = createToken({ ...TEST_USER, ...user });
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
    }
  },

  startIdleWatch(onWarning) {
    const resetActivity = () => {
      localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(e => document.addEventListener(e, resetActivity, { passive: true }));

    const intervalId = setInterval(() => {
      const lastActive = parseInt(localStorage.getItem(LAST_ACTIVE_KEY) || '0');
      const idle = Date.now() - lastActive;

      if (idle >= IDLE_TIMEOUT) {
        this.logout();
        window.location.href = 'login.html';
        return;
      }

      if (idle >= IDLE_TIMEOUT - WARNING_BEFORE) {
        const remaining = Math.ceil((IDLE_TIMEOUT - idle) / 1000);
        if (onWarning) onWarning(remaining);
        window.dispatchEvent(new CustomEvent(SESSION_WARNING_EVENT, { detail: { remaining } }));
      }
    }, 1000);

    // Return cleanup function
    return () => {
      clearInterval(intervalId);
      events.forEach(e => document.removeEventListener(e, resetActivity));
    };
  }
};

export default AuthManager;

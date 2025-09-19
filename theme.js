// Global theme utility
(function(){
  const STORAGE_KEY = 'site-theme';
  const root = document.documentElement;
  function preferred(){
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function apply(theme){
    root.setAttribute('data-theme', theme);
    [...document.querySelectorAll('#themeToggle')].forEach(btn=>{
      btn.setAttribute('aria-pressed', theme==='dark');
    });
  }
  function toggle(){
    const cur = root.getAttribute('data-theme')==='dark' ? 'dark' : 'light';
    const next = cur==='dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    apply(next);
  }
  function init(){
    const stored = localStorage.getItem(STORAGE_KEY);
    apply(stored || preferred());
    document.addEventListener('click', e => {
      if(e.target && e.target.id === 'themeToggle'){
        toggle();
      }
    });
    // Sync if multiple tabs are open
    window.addEventListener('storage', e => { if(e.key===STORAGE_KEY){ apply(e.newValue || preferred()); } });
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();

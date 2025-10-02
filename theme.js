// Global theme utility with support for multiple theme files
(function(){
  const STORAGE_KEY = 'site-theme';
  const STORAGE_KEY_FILE = 'site-theme-file';
  const root = document.documentElement;
  
  // Available themes (file names without .css)
  const AVAILABLE_THEMES = ['default', 'nord'];
  
  function preferred(){
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  function loadThemeFile(themeFile){
    // Remove existing theme stylesheets
    const existingLinks = document.querySelectorAll('link[data-theme-file]');
    existingLinks.forEach(link => link.remove());
    
    // Add new theme stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    const isExample = window.location.pathname.includes('/examples/');
    link.href = (isExample ? '../' : '') + 'themes/' + themeFile + '.css';
    link.setAttribute('data-theme-file', themeFile);
    document.head.appendChild(link);
    
    localStorage.setItem(STORAGE_KEY_FILE, themeFile);
  }
  
  function apply(theme){
    root.setAttribute('data-theme', theme);
    // Update theme toggle button
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
  
  function changeThemeFile(themeFile){
    if(AVAILABLE_THEMES.includes(themeFile)){
      loadThemeFile(themeFile);
      // Update theme picker select
      const picker = document.getElementById('themePicker');
      if(picker) picker.value = themeFile;
    }
  }
  
  function init(){
    // Load theme file first
    const storedFile = localStorage.getItem(STORAGE_KEY_FILE);
    const themeFile = storedFile && AVAILABLE_THEMES.includes(storedFile) ? storedFile : 'default';
    
    // Only load theme file if not already present in HTML
    const hasStaticTheme = document.querySelector('link[href*="themes/"]');
    if(!hasStaticTheme){
      loadThemeFile(themeFile);
    } else {
      // Replace static link with dynamic one
      const staticLink = hasStaticTheme;
      staticLink.setAttribute('data-theme-file', themeFile);
      localStorage.setItem(STORAGE_KEY_FILE, themeFile);
    }
    
    // Apply light/dark mode
    const stored = localStorage.getItem(STORAGE_KEY);
    apply(stored || preferred());
    
    // Theme toggle button (light/dark)
    document.addEventListener('click', e => {
      if(e.target && e.target.id === 'themeToggle'){
        toggle();
      }
    });
    
    // Theme picker (file selection)
    const picker = document.getElementById('themePicker');
    if(picker){
      picker.value = themeFile;
      picker.addEventListener('change', e => {
        changeThemeFile(e.target.value);
      });
    }
    
    // Sync if multiple tabs are open
    window.addEventListener('storage', e => { 
      if(e.key===STORAGE_KEY){ 
        apply(e.newValue || preferred()); 
      } else if(e.key===STORAGE_KEY_FILE){
        changeThemeFile(e.newValue || 'default');
      }
    });
  }
  
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
  
  // Expose for external use if needed
  window.themeUtility = { changeThemeFile, AVAILABLE_THEMES };
})();

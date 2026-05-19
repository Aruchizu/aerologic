document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  updateNavbarAuthState();
});

function setupMobileMenu() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Inject hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.id = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = `<span></span><span></span><span></span>`;
  navbar.appendChild(hamburger);

  // Inject mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobile-menu';
  mobileMenu.className = 'mobile-menu';
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.appendChild(mobileMenu);

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.toggle('mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('mobile-menu--open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });
}

function updateNavbarAuthState() {
  const navbarRight = document.getElementById('navbar-right');
  const mobileMenu  = document.getElementById('mobile-menu');
  if (!navbarRight) return;

  const token = localStorage.getItem('token');
  let user = null;
  try { user = JSON.parse(localStorage.getItem('user') || 'null'); } catch { user = null; }

  if (token && user) {
    const name     = user.fullName || user.name || 'User';
    const initials = name.trim().split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);

    navbarRight.innerHTML = `
      <a href="profile.html" class="profile-nav-btn" title="My Profile">
        <span class="profile-nav-icon">${initials}</span>
      </a>
      <button class="logout-nav-btn" id="logout-btn">Log Out</button>
    `;

    if (mobileMenu) {
      mobileMenu.innerHTML = `
        <nav class="mobile-menu-nav">
          <a href="index.html" class="mobile-menu-link">Home</a>
          <a href="lessons.html" class="mobile-menu-link">Lessons</a>
          <a href="myprogress.html" class="mobile-menu-link">My Progress</a>
          <a href="profile.html" class="mobile-menu-link">Profile</a>
          <button class="mobile-menu-auth-btn mobile-menu-auth-btn--logout" id="mobile-logout-btn">Logout</button>
        </nav>
      `;
      document.getElementById('mobile-logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
      });
    }

    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });
  } else {
    navbarRight.innerHTML = `
      <a href="signup.html" class="signup-btn">Sign up or Log in</a>
    `;

    if (mobileMenu) {
      mobileMenu.innerHTML = `
        <nav class="mobile-menu-nav">
          <a href="index.html" class="mobile-menu-link">Home</a>
          <a href="lessons.html" class="mobile-menu-link">Lessons</a>
          <a href="myprogress.html" class="mobile-menu-link">My Progress</a>
          <a href="login.html" class="mobile-menu-auth-btn mobile-menu-auth-btn--signin">Sign In</a>
          <a href="signup.html" class="mobile-menu-auth-btn mobile-menu-auth-btn--signup">Sign Up</a>
        </nav>
      `;
    }
  }
}

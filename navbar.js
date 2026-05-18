document.addEventListener('DOMContentLoaded', () => {
  updateNavbarAuthState();
});

function updateNavbarAuthState() {
  const navbarRight = document.getElementById('navbar-right');
  if (!navbarRight) return;

  const token = localStorage.getItem('token');
  const user  = JSON.parse(localStorage.getItem('user') || 'null');

  if (token && user) {
    const name     = user.fullName || user.name || 'User';
    const initials = name.trim().split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);

    navbarRight.innerHTML = `
      <a href="profile.html" class="profile-nav-btn" title="My Profile">
        <span class="profile-nav-icon">${initials}</span>
      </a>
      <button class="logout-nav-btn" id="logout-btn">Log Out</button>
    `;

    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });
  } else {
    navbarRight.innerHTML = `
      <a href="signup.html" class="signup-btn">Sign up or Log in</a>
    `;
  }
}

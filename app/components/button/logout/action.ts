export async function logout() {
    await fetch('/auth/logout', {
      method: 'POST',
    });
    window.location.href = '/signin'; // Redirect to login page after logging out
  }


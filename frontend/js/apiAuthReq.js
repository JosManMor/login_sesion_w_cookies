class AuthRequest {
  constructor(ip = 'localhost', port = 3000) {
    this.ip = ip;
    this.port = port;
    this.baseUrl = `http://${this.ip}:${port}/auth`;
  }
  loginUser = async ({ username, password }) => {
    const response = await fetch(this.baseUrl + '/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok || response.status === 401) {
      const data = await response
        .json()
        .catch(() => ({ message: 'Login failed' }));
      throw data;
    }
    const data = await response.json();
    return data;
  };

  validateSession = async () => {
    const response = await fetch(this.baseUrl + '/validate', {
      credentials: 'include',
    });
    if (!response.ok || response.status === 401) {
      const data = await response.json().catch(() => ({ valid: false }));
      throw data;
    }
    const data = await response.json();
    return data;
  };

  logout = async () => {
    const response = await fetch(this.baseUrl + '/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      const data = await response
        .json()
        .catch(() => ({ message: 'Logout failed' }));
      throw data;
    }
    const data = await response.json();
    return data;
  };

  signup = async ({ username, password }) => {
    const response = await fetch(this.baseUrl + '/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      const data = await response
        .json()
        .catch(() => ({ message: 'Signup failed' }));
      throw data;
    }
    const data = await response.json();
    return data;
  };
}
const authRequest = new AuthRequest();
export default authRequest;

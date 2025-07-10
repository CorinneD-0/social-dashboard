const API_BASE_URL = 'http://localhost:3001';

// Helper per le chiamate API
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export const postsAPI = {
  getAll: () => apiCall('/posts'),
  getById: (id) => apiCall(`/posts/${id}`),
  create: (post) => apiCall('/posts', {
    method: 'POST',
    body: JSON.stringify(post),
  }),
  update: (id, post) => apiCall(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
  }),
  delete: (id) => apiCall(`/posts/${id}`, {
    method: 'DELETE',
  }),
};

export const usersAPI = {
  getAll: () => apiCall('/users'),
  getById: (id) => apiCall(`/users/${id}`),
  getByUsername: (username) => apiCall(`/users?username=${username}`),
  update: (id, user) => apiCall(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  }),
};

// Auth API (mock)
export const authAPI = {
  login: async (credentials) => {
    // Simula una chiamata API per il login
    const users = await usersAPI.getAll();
    const user = users.find(u => 
      u.username === credentials.username || u.email === credentials.username
    );
    
    if (user) {
      // In un'app reale, qui verificheresti la password
      return user;
    }
    throw new Error('Credenziali non valide');
  },
}; 
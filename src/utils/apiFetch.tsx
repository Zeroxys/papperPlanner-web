const fakeAuthService = {
  isAuthenticated: false,

  login(username, password) {
    // Simulación de lógica de autenticación
    if (username === "user" && password === "password") {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  },

  logout() {
    // Simulación de cierre de sesión
    this.isAuthenticated = false;
  },

  getAccessToken() {
    // Simulación de obtención de token de acceso
    return "fakeAccessToken";
  },
};

export default fakeAuthService;

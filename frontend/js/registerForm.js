export const registerForm = () => {
  return `
<div class="register-card">
  <button class="btn-close" id="closeDialog">
    <i class="ph ph-x"></i>
  </button>
  
  <h2 class="title">Create Account</h2>
  <p class="subtitle">Join us today! Enter your details below.</p>
  
  <form id="register">
    <div class="field">
      <i class="ph ph-user input-icon"></i>
      <input autocomplete="off" required id="r_username" placeholder="Username" class="input-field" name="logemail" type="text">
    </div>
    
    <div class="field">
      <i class="ph ph-lock-key input-icon"></i>
      <input autocomplete="off" required id="r_password" placeholder="Password" class="input-field" name="logpass" type="password">
    </div>
    
    <div class="field">
      <i class="ph ph-lock-key input-icon"></i>
      <input autocomplete="off" required id="conf_password" placeholder="Confirm Password" class="input-field" name="logpass" type="password">
    </div>
    
    <button class="btn btn-primary" type="submit">Sign Up</button>
  </form>
</div>`;
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };
  
  export const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/\d/.test(password)) return "Password must contain at least one number";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[!@#$%^&*]/.test(password)) return "Password must contain at least one special character";
    return "";
  };
  
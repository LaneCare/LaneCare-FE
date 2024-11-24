// TypeScript Type for Users Table
export interface User {
  userid: string; // UUID as a string
  name: string; // Name of the user
  email: string; // User's email
  password: string; // Hashed password
  role: string;
}

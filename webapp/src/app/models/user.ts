/**
 * Represents a User in the system
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: Date;
  isAdmin: boolean;
}

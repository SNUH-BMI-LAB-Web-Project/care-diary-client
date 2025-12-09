import type { UserRole, Gender } from "./constants";

export interface User {
  id: string;
  name: string;
  email: string;
  gender: Gender;
  age: number;
  role: UserRole;
  adminKey?: string;
  createdAt: Date;
}

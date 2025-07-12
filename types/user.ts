export interface User {
  _id?: string;
  name: string;
  email?: string;
  location?: string;
  photo?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  isPublic: boolean;
  isBan: boolean; // Add isBan field
  role: "user" | "admin";
  createdAt?: string;
}

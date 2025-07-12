export interface User {
  _id?: string;
  name: string;
  location?: string;
  photo?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  isPublic: boolean;
  role: "user" | "admin";
}

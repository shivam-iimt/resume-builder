export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  headline: string;
}

export interface Experience {
  title: string;
  company: string;
  years: string;
  description?: string;
}

export interface Project {
  title: string;
  summary: string;
  url?: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  projects: Project[];
  skills: string[];
}

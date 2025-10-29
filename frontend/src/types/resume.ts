export interface Experience {
  title: string;
  company: string;
  years: string;
  description: string;
}

export interface Project {
  title: string;
  summary: string;
  url: string;
}

export interface Personal {
  name: string;
  headline: string;
  email: string;
  phone: string;
}

export interface ResumeData {
  personal: Personal;
  experience: Experience[];
  projects: Project[];
  skills: string[];
}

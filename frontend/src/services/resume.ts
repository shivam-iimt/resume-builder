import axios from "axios";
import { ResumeData } from "../types/resume";

const API_URL = import.meta.env.VITE_API_URL;

export const saveResume = async (data: ResumeData, publish?: boolean) =>
  axios.post(`${API_URL}/resume`, { data, publish }, { withCredentials: true });

export const getResume = async () =>
  axios.get(`${API_URL}/resume`, { withCredentials: true });

export const getPublicResume = async (slug: string) =>
  axios.get(`${API_URL}/resume/public/${slug}`);

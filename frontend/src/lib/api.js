/** @format */

import axios from "axios";

const api = axios.create();

export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Unexpected error";

export const fetchPasswords = async () => {
  const { data } = await api.get("/api/passwords");
  return data;
};

export const fetchPassword = async (id) => {
  const { data } = await api.get(`/api/passwords/${id}`);
  return data;
};

export const createPassword = async (values) => {
  const { data } = await api.post("/api/passwords", values);
  return data;
};

export const updatePassword = async ({ id, values }) => {
  const { data } = await api.put(`/api/passwords/${id}`, values);
  return data;
};

export const deletePassword = async (id) => {
  const { data } = await api.delete(`/api/passwords/${id}`);
  return data;
};

export const fetchNotes = async () => {
  const { data } = await api.get("/api/notes");
  return data;
};

export const fetchNote = async (id) => {
  const { data } = await api.get(`/api/notes/${id}`);
  return data;
};

export const createNote = async (values) => {
  const { data } = await api.post("/api/notes", values);
  return data;
};

export const updateNote = async ({ id, values }) => {
  const { data } = await api.put(`/api/notes/${id}`, values);
  return data;
};

export const deleteNote = async (id) => {
  const { data } = await api.delete(`/api/notes/${id}`);
  return data;
};

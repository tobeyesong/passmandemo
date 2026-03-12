/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createNote,
  deleteNote,
  fetchNote,
  fetchNotes,
  updateNote,
} from "../lib/api";

const noteKeys = {
  all: ["notes"],
  detail: (id) => ["notes", id],
};

export const useNotesQuery = () =>
  useQuery({
    queryKey: noteKeys.all,
    queryFn: fetchNotes,
  });

export const useNoteQuery = (id) =>
  useQuery({
    queryKey: noteKeys.detail(id),
    queryFn: () => fetchNote(id),
    enabled: Boolean(id),
  });

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.all });
      toast.success("Note Created");
    },
  });
};

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.all });
      queryClient.setQueryData(noteKeys.detail(note._id), note);
      toast.info("Note Updated");
    },
  });
};

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.all });
      queryClient.removeQueries({ queryKey: noteKeys.detail(id) });
      toast.error("Note Deleted");
    },
  });
};

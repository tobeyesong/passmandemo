/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createPassword,
  deletePassword,
  fetchPassword,
  fetchPasswords,
  updatePassword,
} from "../lib/api";

const passwordKeys = {
  all: ["passwords"],
  detail: (id) => ["passwords", id],
};

export const usePasswordsQuery = () =>
  useQuery({
    queryKey: passwordKeys.all,
    queryFn: fetchPasswords,
  });

export const usePasswordQuery = (id) =>
  useQuery({
    queryKey: passwordKeys.detail(id),
    queryFn: () => fetchPassword(id),
    enabled: Boolean(id),
  });

export const useCreatePasswordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: passwordKeys.all });
      toast.success("Password Created");
    },
  });
};

export const useUpdatePasswordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePassword,
    onSuccess: (password) => {
      queryClient.invalidateQueries({ queryKey: passwordKeys.all });
      queryClient.setQueryData(passwordKeys.detail(password._id), password);
      toast.info("Password Updated");
    },
  });
};

export const useDeletePasswordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePassword,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: passwordKeys.all });
      queryClient.removeQueries({ queryKey: passwordKeys.detail(id) });
      toast.error("Password Deleted");
    },
  });
};

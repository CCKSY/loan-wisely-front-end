"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { getQueryClient } from "@/infra/queryClient";

type QueryProviderProps = {
  children: React.ReactNode;
};

const QueryProvider = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>
);

export default QueryProvider;

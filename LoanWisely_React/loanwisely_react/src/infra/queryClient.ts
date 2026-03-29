// React Query client configuration.
 import { QueryClient } from "@tanstack/react-query";

 const createQueryClient = (): QueryClient =>
   new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 1000 * 30,
         retry: 1,
         refetchOnWindowFocus: false,
       },
     },
   });

 let browserQueryClient: QueryClient | null = null;

 export const getQueryClient = (): QueryClient => {
   if (typeof window === "undefined") {
     return createQueryClient();
   }

   if (!browserQueryClient) {
     browserQueryClient = createQueryClient();
   }

   return browserQueryClient;
 };



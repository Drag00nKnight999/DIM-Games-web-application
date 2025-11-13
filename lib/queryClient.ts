import { QueryClient } from "@tanstack/react-query";

async function handleResponse(response: Response) {
  if (response.status === 401) {
    throw new Error(`401: ${response.statusText} - Unauthorized`);
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status}: ${response.statusText} - ${text}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  return await response.text();
}

export async function apiRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  });
  return handleResponse(response);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        return apiRequest(url);
      },
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    },
  },
});

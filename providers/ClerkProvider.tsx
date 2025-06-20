import { ClerkProvider as BaseClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { ReactNode } from "react";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

interface ClerkProviderProps {
  children: ReactNode;
}

export function ClerkProvider({ children }: ClerkProviderProps) {
  return (
    <BaseClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      {children}
    </BaseClerkProvider>
  );
}

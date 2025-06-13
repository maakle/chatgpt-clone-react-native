import { useSSO } from "@clerk/clerk-expo";

type SSOStrategy = "oauth_google" | "oauth_apple";

export const useSSOAuth = () => {
  const { startSSOFlow } = useSSO();

  const handleSSOSignIn = async (strategy: SSOStrategy) => {
    try {
      const result = await startSSOFlow({ strategy });
      
      if (result.createdSessionId && result.setActive) {
        await result.setActive({ session: result.createdSessionId });
        return { success: true };
      }
      
      return { success: false, error: "Failed to create session" };
    } catch (error) {
      console.error(`Error signing in with ${strategy}:`, error);
      return { success: false, error };
    }
  };

  return {
    handleSSOSignIn,
  };
}; 
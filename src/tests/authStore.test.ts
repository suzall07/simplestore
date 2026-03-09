import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "../store/authStore";

describe("authStore", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null, error: null });
  });

  it("should login with correct credentials", async () => {
    const { login } = useAuthStore.getState();
    
    const success = await login("mor_2314", "83r5^_");
    
    expect(success).toBe(true);
    const { user, token } = useAuthStore.getState();
    expect(user).toBeTruthy();
    expect(token).toBeTruthy();
  });

  it("should fail with incorrect credentials", async () => {
    const { login } = useAuthStore.getState();
    
    const success = await login("wrong", "wrong");
    
    expect(success).toBe(false);
    const { user, token, error } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(error).toBeTruthy();
  });

  it("should logout and clear user data", () => {
    useAuthStore.setState({ 
      user: { email: "test", username: "test" }, 
      token: "fake-token" 
    });
    
    const { logout } = useAuthStore.getState();
    logout();
    
    const { user, token } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
  });
});
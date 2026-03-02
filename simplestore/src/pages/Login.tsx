import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    const success = await login(username, password);
    if (success) {
      navigate("/"); // Redirect to home after successful login
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-8">
      <div className="max-w-[400px] w-full py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl text-[#111111] mb-4">Welcome Back</h1>
          <p className="text-text-muted font-light text-sm">
            Use demo credentials: <span className="font-medium text-[#111111]">mor_2314 / 83r5^_</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-custom">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-[10px] uppercase tracking-widest text-[#111111] font-medium">
              Username
            </label>
            <input 
              id="username"
              type="text" 
              placeholder="mor_2314"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] transition-colors text-sm font-light"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-[10px] uppercase tracking-widest text-[#111111] font-medium">
                Password
              </label>
            </div>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] transition-colors text-sm font-light"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn btn-primary btn-lg justify-center py-4 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted font-light">
            Don't have an account?{" "}
            <button className="text-[#111111] font-medium hover:underline underline-offset-4">
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
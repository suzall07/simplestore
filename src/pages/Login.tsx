import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import { loginSchema, type LoginFormData } from "../lib/validations";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    const success = await login(data.username, data.password);
    if (success) {
      navigate("/");
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

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-[10px] uppercase tracking-widest text-[#111111] font-medium">
              Username
            </label>
            <input 
              id="username"
              type="text" 
              placeholder="mor_2314"
              {...register("username")}
              className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] transition-colors text-sm font-light"
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
            )}
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
              {...register("password")}
              className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] transition-colors text-sm font-light"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn btn-primary btn-lg justify-center py-4 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
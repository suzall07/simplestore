const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-8">
      <div className="max-w-[400px] w-full py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl text-[#111111] mb-4">Welcome Back</h1>
          <p className="text-text-muted font-light text-sm">Please enter your details to sign in.</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-[#111111] font-medium">Email Address</label>
            <input 
              id="email"
              type="email" 
              placeholder="name@example.com"
              className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] transition-colors text-sm font-light"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="pass" className="text-[10px] uppercase tracking-widest text-[#111111] font-medium">Password</label>
              <button type="button" className="text-[10px] uppercase tracking-widest text-text-muted hover:text-[#111111]">Forgot?</button>
            </div>
            <input 
              id="pass"
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] transition-colors text-sm font-light"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg justify-center py-4 mt-2">
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted font-light">
            Don't have an account? <button className="text-[#111111] font-medium hover:underline underline-offset-4">Create one</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

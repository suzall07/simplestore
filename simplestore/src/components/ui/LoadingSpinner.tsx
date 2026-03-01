const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-text-muted text-sm">
    <div className="w-6 h-6 border-2 border-border-custom border-t-[#111111] rounded-full animate-spin" />
    <span>Loading experience...</span>
  </div>
);

export default LoadingSpinner;
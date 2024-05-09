const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen items-center flex justify-center text-white">
      {children}
    </div>
  );
};

export default AuthLayout;

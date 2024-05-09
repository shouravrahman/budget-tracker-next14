export const Header = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1 className="text-3xl font-semibold">☢Auth</h1>
      <p className="text-muted">{label}</p>
    </div>
  );
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-center min-h-screen">{children}</div>;
}

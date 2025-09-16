export default function Badge({ children }: { children: React.ReactNode }) {
  return <span className="text-xs rounded-full border px-2 py-0.5">{children}</span>;
}

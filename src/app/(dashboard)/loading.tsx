export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      <div className="h-32 rounded-2xl bg-slate-100 animate-pulse" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-24 rounded-2xl bg-slate-100 animate-pulse" />
        <div className="h-24 rounded-2xl bg-slate-100 animate-pulse" />
        <div className="h-24 rounded-2xl bg-slate-100 animate-pulse" />
      </div>
    </div>
  );
}
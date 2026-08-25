export function SkeletonCard({ className = '' }) {
  return (
    <div className={`rounded-2xl overflow-hidden border border-slate-200 ${className}`}>
      <div className="skeleton h-48 w-full" />
      <div className="p-6 space-y-4">
        <div className="skeleton h-6 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
        <div className="flex gap-2 mt-4">
          <div className="skeleton h-6 w-16 rounded" />
          <div className="skeleton h-6 w-20 rounded" />
          <div className="skeleton h-6 w-14 rounded" />
        </div>
        <div className="skeleton h-10 w-full rounded-xl mt-4" />
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="min-h-[90vh] bg-slate-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="skeleton h-5 w-32 rounded" />
            <div className="space-y-3">
              <div className="skeleton h-14 w-full rounded" />
              <div className="skeleton h-14 w-4/5 rounded" />
            </div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-5/6 rounded" />
            </div>
            <div className="flex gap-4 pt-4">
              <div className="skeleton h-14 w-48 rounded-xl" />
              <div className="skeleton h-14 w-36 rounded-xl" />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-4">
            <div className="skeleton h-80 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="py-20 bg-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center px-4 space-y-2">
              <div className="skeleton h-10 w-20 mx-auto rounded bg-emerald-900/50" />
              <div className="skeleton h-4 w-16 mx-auto rounded bg-emerald-900/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

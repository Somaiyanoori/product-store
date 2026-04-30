import { useAppContext } from "../context/AppContext";

function SkeletonCard({ isListView }) {
  if (isListView) {
    return (
      <div className="flex gap-4 p-4 rounded-2xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 animate-pulse">
        <div className="skeleton w-32 h-32 rounded-xl flex-shrink-0 bg-slate-200 dark:bg-slate-700" />
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="skeleton h-4 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="skeleton h-3 w-1/2 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="skeleton h-3 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="skeleton h-3 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="flex gap-2 mt-2">
            <div className="skeleton h-8 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="skeleton h-8 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 animate-pulse">
      <div className="skeleton h-52 w-full bg-slate-200 dark:bg-slate-700" />
      <div className="p-4 flex flex-col gap-3">
        <div className="skeleton h-4 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="skeleton h-3 w-1/2 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="flex justify-between items-center mt-2">
          <div className="skeleton h-6 w-20 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="skeleton h-4 w-16 rounded-lg bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="skeleton h-10 w-full rounded-xl bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ count = 12 }) {
  const { state } = useAppContext();
  const isListView = state.viewMode === "list";

  return (
    <div
      className={
        isListView
          ? "flex flex-col gap-4"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      }
    >
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} isListView={isListView} />
      ))}
    </div>
  );
}

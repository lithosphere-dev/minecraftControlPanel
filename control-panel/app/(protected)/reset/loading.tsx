import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex gap-1">
      <Skeleton className="w-24 h-24 rounded" />
      <Skeleton className="w-24 h-24 rounded" />
      <Skeleton className="w-24 h-24 rounded" />
    </div>
  )
}
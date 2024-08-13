import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup } from "@/components/ui/toggle-group";

export default function Loading() {
  return (
    <div className="flex gap-1">
      <Skeleton className="w-24 h-24 rounded" />
      <Skeleton className="w-24 h-24 rounded" />
      <Skeleton className="w-24 h-24 rounded" />
    </div>
  )
}
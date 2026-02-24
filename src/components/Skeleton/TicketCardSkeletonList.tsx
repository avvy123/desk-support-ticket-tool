import TicketCardSkeleton from "./TicketCardSkeleton";

export default function TicketCardSkeletonList({ count } : any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <TicketCardSkeleton key={i} />
      ))}
    </div>
  );
}
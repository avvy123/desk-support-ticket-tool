export default function TicketCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 shadow animate-pulse space-y-4">
      {/* Title */}
      <div className="h-4 w-3/4 bg-gray-300 rounded" />

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
      </div>

      {/* Meta info */}
      <div className="flex justify-between mt-4">
        <div className="h-3 w-24 bg-gray-300 rounded" />
        <div className="h-3 w-20 bg-gray-300 rounded" />
      </div>

      {/* Footer buttons */}
      <div className="flex gap-3 mt-4">
        <div className="h-8 w-20 bg-gray-300 rounded-lg" />
        <div className="h-8 w-20 bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
}
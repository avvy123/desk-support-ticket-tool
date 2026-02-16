import { usePathname } from "next/navigation";
type NoTicketProps = {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
};

export default function NoTickets({
  title = "No tickets found",
  description = "You don’t have any tickets here yet.",
  actionText,
  onAction,
}: NoTicketProps) {
    const pathname = usePathname();
    const isDashboard = pathname.includes("/dashboard");
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
      <div className="mb-4 text-6xl">🎫</div>

      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm">
        {description}
      </p>

      {!isDashboard && actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

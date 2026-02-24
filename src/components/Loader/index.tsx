export default function Loader({
  message = "Please wait while loading tickets",
}: {
  message?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 text-gray-600">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mb-4" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

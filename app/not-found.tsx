export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-gray-600 text-lg">
        Oops! The page you are looking for does not exist.
      </p>

      <a
        href="/login"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go to Login
      </a>
    </div>
  );
}

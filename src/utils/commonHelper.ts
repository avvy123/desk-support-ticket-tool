export const formatDate = (dateInput: string | number) => {
  const date =
    typeof dateInput === "number"
      ? new Date(dateInput * 1000)
      : new Date(dateInput);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const getUserName = (email: string) => {
  const users =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("users") || "[]")
    : [];
  const found = users.find((u: any) => u.email === email);
  return found?.firstName || email;
};

export const getPriorityBadge = (priority: string) => {
  if (priority === "high") return "bg-red-600 text-white text-center";
  if (priority === "medium") return "bg-yellow-600 text-white text-center";
  if (priority === "low") return "bg-green-600 text-white text-center";
  return "bg-gray-100 text-gray-600 text-center";
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "open":
      return "bg-blue-600 text-white";
    case "in-progress":
      return "bg-yellow-700 text-white";
    case "closed":
      return "bg-green-600 text-white";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
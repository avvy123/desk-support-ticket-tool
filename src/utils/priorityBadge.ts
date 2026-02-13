export const getPriorityBadge = (priority: string) => {
  if (priority === "high") return "bg-red-600 text-white text-center";
  if (priority === "medium") return "bg-yellow-600 text-white text-center";
  if (priority === "low") return "bg-green-600 text-white text-center";
  return "bg-gray-100 text-gray-600 text-center";
};

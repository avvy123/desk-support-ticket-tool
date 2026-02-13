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
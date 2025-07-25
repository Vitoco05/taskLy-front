export const borderStyle = (priority) => {
  switch (priority) {
    case "low":
      return "border-blue-500";
    case "medium":
      return "border-yellow-500";
    case "high":
      return "border-red-500";
    default:
      return "border-gray-500";
  }
};

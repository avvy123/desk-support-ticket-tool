export const getUserName = (email: string) => {
    const users =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("users") || "[]")
      : [];
    const found = users.find((u: any) => u.email === email);
    return found?.firstName || email;
};
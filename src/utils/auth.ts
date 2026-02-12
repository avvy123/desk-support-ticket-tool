"use client";

export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export function login(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid email or password");
    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
}


export function signup(firstName: string, lastName: string, email: string, password: string) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const existingUser = users.find((u: any) => u.email === email);
  if (existingUser) throw new Error("User already exists");
  const newUser = { firstName, lastName, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  return newUser;
}

export const logout = () => {
    localStorage.removeItem("currentUser");
};

export function getUser() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return null;
    return JSON.parse(currentUser);
}

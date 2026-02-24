"use client";
import bcrypt from "bcryptjs";

export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: "admin" | "user";
}

export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: "admin" | "user"
) => {
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

  const userExists = existingUsers.find(
    (user: any) => user.email === email
  );

  const adminExists = existingUsers.some(
    (user: any) => user.role === "admin"
  );


  if (userExists) {
    throw new Error("Email already registered");
  }

  if (role === "admin" && adminExists) {
    throw new Error("Admin already exists. Only one admin allowed.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  };

  localStorage.setItem(
    "users",
    JSON.stringify([...existingUsers, newUser])
  );

  return newUser;
};

export const login = async (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find((u: any) => u.email === email);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  return user;
};


export const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("tickets_state");
};

export function getUser() {
  if (typeof window === "undefined") {
    return null;
  }
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return null;
  return JSON.parse(currentUser);
}


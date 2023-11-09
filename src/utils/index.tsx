import React from "react";
import { BASE_URL } from "../constants";

export const getTokenFromLocalStorage = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    return JSON.parse(refreshToken);
  }
  return undefined;
};

async function checkResponse(response: Response[] | Response) {
  if (Array.isArray(response)) {
    const promises = response.map((response: Response) => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
    return Promise.all(promises);
  }
  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  return response.json();
}

export const fetchMenu = async () => {
  const pizzaData = await fetch(`${BASE_URL}/api/menu/pizza`);
  const saladData = await fetch(`${BASE_URL}/api/menu/salad`);
  const rollData = await fetch(`${BASE_URL}/api/menu/roll`);
  const drinkData = await fetch(`${BASE_URL}/api/menu/drink`);
  return checkResponse([pizzaData, saladData, rollData, drinkData]);
};
export const fetchUsers = async () => {
  const usersData = await fetch(`${BASE_URL}/api/users`);
  return checkResponse(usersData);
};
export const fetchCode = async (
  endpoint: string,
  body: {},
  requestType: "GET_CODE" | "VERIFY_CODE",
) => {
  if (requestType === "GET_CODE") {
    const data = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return checkResponse(data);
  }
  const data = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return checkResponse(data);
};
export const fetchCurrentUser = async () => {
  const res = await fetch(`${BASE_URL}/api/users/me`, {
    method: "GET",
    headers: {
      authorization: getTokenFromLocalStorage(),
      "Content-Type": "application/json",
    },
  });
  return checkResponse(res);
};
export const generateChangerInputValue = (
  setStateAction: React.Dispatch<React.SetStateAction<string>>,
  value: string,
) => {
  setStateAction(value);
};
export const logout = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: getTokenFromLocalStorage() }),
  });
  return checkResponse(response);
};

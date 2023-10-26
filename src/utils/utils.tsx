import { BASE_URL } from "../constants/constants";
import { jsonData } from "../services/slices/menu/menu.types";
import { jsonDataUsers } from "../services/slices/users/users.types";

async function checkResponse(
  response: Response[] | Response,
): Promise<jsonData[] | jsonDataUsers> {
  if (Array.isArray(response)) {
    const promises = response.map((response: Response) => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
    return await Promise.all(promises);
  } else {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
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

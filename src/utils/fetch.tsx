import { GameResult } from "../components/DoneForToday";
import API_URL from "./urls";

export async function fetchDate(
  date: string,
  gameName: string
): Promise<{
  response: {
    result: {
      _id: string;
      result: string;
      username: string;
      game: string;
      date: string;
    }[];
  };
}> {
  console.log(`using ${date} for date`);
  return fetch(
    `${API_URL}/today?` +
      new URLSearchParams({
        date: `${date}`,
        game: `${gameName}`,
      }),
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function addResults(resultData: {
  username: string | null;
  date: string;
  results: GameResult[];
}): Promise<{ _id: string; result: string; active: boolean }> {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resultData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

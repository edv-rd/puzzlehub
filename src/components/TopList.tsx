import { useEffect, useState } from "react";
import { fetchDate } from "../utils/fetch";

interface TopListProps {
  gameName: string;
  date: string;
}

const TopList: React.FC<TopListProps> = ({ gameName, date }) => {
  interface Result {
    _id: string;
    result: string;
    username: string;
    game: string;
    date: string;
  }

  interface ResultsResponse {
    response: {
      result: Result[];
    };
  }

  const [todaysResults, setTodaysResults] = useState<ResultsResponse | null>(
    null
  );

  useEffect(() => {
    const fetchResults = async () => {
      const results = await fetchDate(gameName, date);
      setTodaysResults(results);
    };

    fetchResults();
  }, [date]);

  return (
    <>
      {todaysResults ? (
        todaysResults.response.result.map((todaysResult) => (
          <div key={todaysResult._id}>{todaysResult.username}</div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default TopList;

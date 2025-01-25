import { useEffect, useState } from "react";
import { fetchDate } from "../utils/fetch";
import { getTodayDate } from "../utils/utils";
import resultCalc from "../utils/resultCalc";

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
      allEntries: Result[];
    };
  }

  const [todaysResults, setTodaysResults] = useState<ResultsResponse | null>(
    null
  );

  const processResult = (todaysResult: any) => {
    const props = {
      gameName: todaysResult.game,
      result: todaysResult.result,
      username: todaysResult.username,
    };
    return resultCalc(props);
  };

  useEffect(() => {
    const fetchResults = async () => {
      const results = await fetchDate(getTodayDate().toString(), gameName);
      setTodaysResults(results);
      console.log(`results for ${gameName}`);
      console.dir(results);
      console.dir(todaysResults);
    };

    fetchResults();
  }, [date]);

  return (
    <>
      <h1>
        {gameName} results for {getTodayDate()}
      </h1>
      {todaysResults?.response.allEntries.length ? (
        todaysResults.response.allEntries.map((todaysResult) => (
          <div key={todaysResult._id}>
            {todaysResult.username} {processResult(todaysResult)}
          </div>
        ))
      ) : (
        <div>Loading results for {gameName}...</div>
      )}
    </>
  );
};

export default TopList;

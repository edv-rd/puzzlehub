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

  const processResult = (todaysResult: Result) => {
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
    };

    fetchResults();
  }, [date]);

  return (
    <>
      <h1>
        {gameName} results for {getTodayDate()}
      </h1>
      {todaysResults?.response.allEntries.length ? (
        todaysResults.response.allEntries
          .sort((a, b) => {
            const resultA = processResult(a);
            const resultB = processResult(b);
            return resultB.resultInt - resultA.resultInt; // descending order
          })
          .map((todaysResult) => {
            const result = processResult(todaysResult);
            return (
              <div key={todaysResult._id}>
                {todaysResult.username} {result.trimmedResult}
              </div>
            );
          })
      ) : (
        <div>Loading results for {gameName}...</div>
      )}
    </>
  );
};

export default TopList;

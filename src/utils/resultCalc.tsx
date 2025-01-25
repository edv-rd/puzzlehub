type Props = {
  gameName: string;
  result: string;
  username: string;
};

const resultCalc = (props: Props) => {
  let trimmedResult = "";
  const originalResult = props.result;

  switch (props.gameName) {
    case "Wordle": {
      const lines = originalResult.split("\n");
      const firstLine = lines[0];
      const scoreMatch = firstLine.match(/(\d+)\/6/);
      trimmedResult = scoreMatch ? `${scoreMatch[1]}/6` : "0/6";
      break;
    }

    case "Connections": {
      const lines = originalResult.split("\n");
      const gameLines = lines.filter((line) => line.match(/[🟨🟩🟦🟪]/u));
      trimmedResult = gameLines.length.toString();
      break;
    }
    case "GuessThe.Game": {
      break;
    }
    case "Framed": {
      break;
    }
    case "Chronophoto": {
      const scoreMatch = originalResult.match(/I got a score of (\d+)/);
      const score = scoreMatch ? scoreMatch[1] : "0";
      const lines = originalResult.split("\n").slice(1);

      const firstLine = `Chronophoto ${score}/5000`;

      trimmedResult = [firstLine, ...lines]
        .join("\n")
        .trim()
        .replace(/\s*https:\/\/www\.chronophoto\.app\/daily\.html\s*$/, "");

      break;
    }
    case "TimeGuessr": {
      const lines = originalResult.split("\n");

      const cleanedLines = lines.slice(0, -1).map((line) => line.trim());

      trimmedResult = cleanedLines.join("\n");
      break;
    }
    default:
      return originalResult;
      break;
  }

  return trimmedResult;
};

export default resultCalc;

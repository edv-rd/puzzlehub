interface ResultCalcReturn {
  trimmedResult: string;
  resultInt: number;
}

type Props = {
  gameName: string;
  result: string;
  username: string;
};

const resultCalc = (props: Props): ResultCalcReturn => {
  let trimmedResult = "";
  const originalResult = props.result;

  let resultInt = 0;

  switch (props.gameName) {
    case "Wordle": {
      const lines = originalResult.split("\n");
      const firstLine = lines[0];
      const scoreMatch = firstLine.match(/(\d+)\/6/);
      trimmedResult = scoreMatch ? `${scoreMatch[1]}/6` : "0/6";
      resultInt = parseInt(scoreMatch ? scoreMatch[1] : "0");
      break;
    }

    case "Connections": {
      const lines = originalResult.split("\n");
      const gameLines = lines.filter((line) => line.match(/[🟨🟩🟦🟪]/u));

      const hasYellowRow = gameLines.some((line) => line === "🟨🟨🟨🟨");
      const hasGreenRow = gameLines.some((line) => line === "🟩🟩🟩🟩");
      const hasBlueRow = gameLines.some((line) => line === "🟦🟦🟦🟦");
      const hasPurpleRow = gameLines.some((line) => line === "🟪🟪🟪🟪");

      if (hasYellowRow && hasGreenRow && hasBlueRow && hasPurpleRow) {
        trimmedResult = `${gameLines.length} tries`;
        resultInt = gameLines.length;
      } else {
        trimmedResult = "failed";
        resultInt = 0;
      }
      break;
    }
    case "GuessThe.Game": {
      const lines = originalResult.split("\n");
      const gameLine = lines[1];
      const hasGreenSquare = gameLine.includes("🟩");

      if (!hasGreenSquare) {
        trimmedResult = "failed";
        resultInt = 0;
      } else {
        const squares = gameLine.match(/[🟥🟩]/gu)?.length || 0;
        resultInt = squares;
        trimmedResult = `${resultInt} tries`;
      }
      break;
    }
    case "Framed": {
      const lines = originalResult.split("\n");
      const gameLine = lines[1];
      const hasGreenSquare = gameLine.includes("🟩");

      if (!hasGreenSquare) {
        trimmedResult = "failed";
        resultInt = 0;
      } else {
        const squares = gameLine.match(/[🟥🟩]/gu)?.length || 0;
        resultInt = squares;
        trimmedResult = `${resultInt} tries`;
      }
      break;
    }
    case "Chronophoto": {
      const lines = originalResult.split("\n");
      const firstLine = lines[0];
      const scoreMatch = firstLine.match(/Chronophoto (\d+)\/5000/);
      const score = scoreMatch ? scoreMatch[1] : "0";

      resultInt = parseInt(score);
      trimmedResult = `${resultInt}/5000`;
      break;
    }
    case "TimeGuessr": {
      const lines = originalResult.split("\n");
      const firstLine = lines[0];
      const scoreMatch = firstLine.match(/TimeGuessr #\d+ (\d+,?\d*)\/50,000/);
      const score = scoreMatch ? scoreMatch[1].replace(",", "") : "0";

      resultInt = parseInt(score);
      trimmedResult = `${scoreMatch ? scoreMatch[1] : "0"}/50,000`;
      break;
    }

    case "Strands": {
      const lines = originalResult.split("\n");
      const gameLines = lines.filter((line) => line.match(/[🔵🟡💡]/u));

      const circles = gameLines.join("").match(/[🔵🟡]/gu)?.length || 0;
      const hints = gameLines.join("").match(/💡/gu)?.length || 0;

      resultInt = circles;
      trimmedResult = `${resultInt} tries (${hints} hints)`;
      break;
    }

    case "The Mini Crossword": {
      // I finished today's Mini in 54 seconds!

      const timeAmount = originalResult.match(/(\d+) seconds/);

      resultInt = timeAmount ? -parseInt(timeAmount[1]) : 0;
      trimmedResult = `${Math.abs(resultInt)} seconds`;
      break;
    }
    default:
      return { trimmedResult, resultInt };
      break;
  }

  return { trimmedResult, resultInt };
};

export default resultCalc;

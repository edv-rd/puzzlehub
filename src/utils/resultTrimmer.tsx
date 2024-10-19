type Props = {
  gameName: string;
  text: string;
};

const resultTrimmer = (props: Props) => {
  let trimmedText = "";
  const originalText = props.text;
  console.log(originalText);
  switch (props.gameName) {
    case "Wordle": {
      const lines = originalText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      const cleanedLines = [
        lines[0].replace(/(\d+)/, "#$1"),
        ...lines.slice(1).map((line) => line.trim()),
      ];

      trimmedText = cleanedLines.join("\n");
      break;
    }

    case "Connections": {
      const lines = originalText.split(/\r?\n/);
      console.dir(lines);

      const cleanedLines = [
        `${lines[0]} #${lines[1].split("#")[1].trim()}`,
        ...lines.slice(2).map((line) => line.trim()),
      ];

      console.dir(cleanedLines);

      trimmedText = cleanedLines.join("\n").trim();
      break;
    }
    case "GuessThe.Game": {
      const lines = originalText.split("\n");

      const cleanedLines = [lines[0].replace(/^#/, "").trim(), lines[2].trim()];

      trimmedText = cleanedLines.join("\n");

      break;
    }
    case "Framed": {
      const lines = originalText.split("\n");

      const cleanedLines = [lines[0].trim(), lines[1].trim()];

      trimmedText = cleanedLines.join("\n");
      break;
    }
    case "Chronophoto": {
      const scoreMatch = originalText.match(/I got a score of (\d+)/);
      const score = scoreMatch ? scoreMatch[1] : "0"; // Default to 0 if not found
      const lines = originalText.split("\n").slice(1, -1); // Remove the first and last line

      // Create the first line with the score
      const firstLine = `Chronophoto ${score}/5000`;

      // Join the cleaned lines back together
      trimmedText = [firstLine, ...lines].join("\n").trim();
      break;
    }
    case "TimeGuessr": {
      const lines = originalText.split("\n");

      const cleanedLines = lines.slice(0, -1).map((line) => line.trim());

      trimmedText = cleanedLines.join("\n");
      break;
    }
    default:
      return originalText;
      break;
  }
  console.log(trimmedText);
  return trimmedText;
};

export default resultTrimmer;

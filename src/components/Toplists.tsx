import { StyledButton } from "./styles/Button.styled";

interface TopListsProps {
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
}

const TopLists: React.FC<TopListsProps> = ({ setViewMode }) => {
  return (
    <>
      <StyledButton onClick={() => setViewMode("gamelist")}>
        Back to games
      </StyledButton>
    </>
  );
};

export default TopLists;

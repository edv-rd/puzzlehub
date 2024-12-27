import styled from "styled-components";
import UserName from "./UserName";

const StyledTopBar = styled.div`
  height: 30px;
  background-color: var(--fourth-color);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;

  a {
    color: var(--second-color);
  }
`;

const StyledEditModeSwitch = styled.div`
  cursor: pointer;
`;

interface TopBarProps {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopBar: React.FC<TopBarProps> = ({ editMode, setEditMode }) => {
  return (
    <StyledTopBar>
      <StyledEditModeSwitch onClick={() => setEditMode(!editMode)}>
        edit mode <b>{editMode ? "on" : "off"}</b>
      </StyledEditModeSwitch>
      <UserName />
    </StyledTopBar>
  );
};

export default TopBar;

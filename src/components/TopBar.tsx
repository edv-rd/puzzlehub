import React from "react";
import styled from "styled-components";

const StyledTopBar = styled.div`
  height: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
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
        Edit mode {editMode ? "on" : "off"}
      </StyledEditModeSwitch>
      <div>
        <a href="http://edvardshemsida.se">edvards hemsida</a>
      </div>
    </StyledTopBar>
  );
};

export default TopBar;

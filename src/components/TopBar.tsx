import React from "react";
import styled from "styled-components";

const StyledTopBar = styled.div`
  height: 30px;
  background-color: var(--fourth-color);
  display: flex;
  justify-content: space-between;
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
      <div>
        <a href="http://edvardshemsida.se" target="_blank">
          edvards hemsida
        </a>
      </div>
    </StyledTopBar>
  );
};

export default TopBar;

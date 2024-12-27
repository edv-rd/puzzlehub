import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserName from "./UserName";

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
  const [countdown, setCountdown] = useState(calculateCountdown());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <StyledTopBar>
      <StyledEditModeSwitch onClick={() => setEditMode(!editMode)}>
        edit mode <b>{editMode ? "on" : "off"}</b>
      </StyledEditModeSwitch>
      <UserName />
      <div>⏰ New games in {countdown}...</div>
      <div>
        <a href="http://edvardshemsida.se" target="_blank">
          edvards hemsida
        </a>
      </div>
    </StyledTopBar>
  );
};

function calculateCountdown(): string {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default TopBar;

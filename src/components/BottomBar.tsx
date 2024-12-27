import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledBottomBar = styled.div`
  height: 30px;
  width: 100%;
  background-color: var(--fourth-color);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  left: 0;
  bottom: 0;

  a {
    color: var(--second-color);
  }
`;

const BottomBar: React.FC<BottomBarProps> = () => {
  const [countdown, setCountdown] = useState(calculateCountdown());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <StyledBottomBar>
      <div>⏰ New games in {countdown}...</div>
      <div>
        <a href="http://edvardshemsida.se" target="_blank">
          edvards hemsida
        </a>
      </div>
    </StyledBottomBar>
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

export default BottomBar;

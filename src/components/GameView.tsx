import React, { useState } from "react";

import { DoneForToday } from "./DoneForToday";
import styled from "styled-components";

import TopBar from "./TopBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomBar from "./BottomBar";
import { GameList } from "./GameList";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export interface GameInfo {
  gameName: string;
  gameImage: string;
  gameUrl: string;
  regex: string;
  visible: boolean;
}

export const GameView: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <TopBar editMode={editMode} setEditMode={setEditMode} />
      <StyledWrapper>
        <GameList editMode={editMode} />
        <DoneForToday />
      </StyledWrapper>
      <BottomBar />
    </>
  );
};

import React, { useState } from "react";

import styled from "styled-components";

import TopBar from "./TopBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomBar from "./BottomBar";
import { GameList } from "./GameList";
import TopLists from "./Toplists";

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
  const [viewMode, setViewMode] = useState("gamelist");
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
        {viewMode === "gamelist" ? (
          <GameList editMode={editMode} setViewMode={setViewMode} />
        ) : viewMode === "toplists" ? (
          <TopLists setViewMode={setViewMode} />
        ) : (
          <GameList editMode={editMode} setViewMode={setViewMode} />
        )}
      </StyledWrapper>
      <BottomBar />
    </>
  );
};

import styled, { css } from "styled-components";

interface StyledWrapperProps {
  visible: boolean;
  finished: boolean;
  editMode: boolean;
}

export const StyledWrapper = styled.div<StyledWrapperProps>`
  display: ${(props) => (props.editMode || props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;

  @media (max-width: 991px) {
    width: 90%;
  }

  img {
    object-fit: contain;
    height: 60px;
  }

  a {
    text-decoration: none;
  }

  ${(props) =>
    props.editMode && !props.visible
      ? css`
          filter: brightness(60%);
        `
      : props.finished
      ? css`
          filter: brightness(60%);
        `
      : css`
          &:hover {
            cursor: pointer;
            transform: translateX(1%) translateY(1%);
            transition: transform 0.2s ease-out;
          }
        `}
`;

export const StyledGameInfoSection = styled.div`
  width: 100%;
  background-color: var(--fourth-color);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 5px;
  padding: 5px;

  a {
    color: var(--tertiary-color);
  }
`;

export const StyledButtonSection = styled.div`
  width: 100%;
  min-height: 60px;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  font-size: 18px;

  h2 {
    color: var(--tertiary-color);
    margin: 5px 0;
    text-align: center;
  }

  a {
    color: var(--tertiary-color);
  }

  a:visited {
    color: var(--tertiary-color);
  }
`;

export const StyledButton = styled.div`
  padding: 2px;
  margin: 5px 0;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const StyledPasteButton = styled.button`
  background-color: var(--secondary-color);
  color: var(--secondary-color);
  border-color: var(--tertiary-color);
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  font-size: 16px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const StyledButtonInterior = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5em;
  flex-direction: row;
  justify-content: center;
`;

export const StyledButtonInteriorText = styled.div`
  flex: 3;
`;

export const StyledButtonInteriorPasteButton = styled.div`
  flex: 1;
`;

export const StyledCheckmark = styled.div`
  cursor: pointer;
  font-size: 24px;
  margin-top: 10px;
  &:hover {
    opacity: 0.7;
  }
`;

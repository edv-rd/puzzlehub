import styled, { css } from "styled-components";

interface StyledWrapperProps {
  finished: boolean;
}

export const StyledWrapper = styled.div<StyledWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30em;

  img {
    object-fit: contain;
    height: 60px;
  }

  a {
    text-decoration: none;
  }

  ${(props) =>
    props.finished
      ? css`
          filter: brightness(60%);
        `
      : css`
          box-shadow: 10px 10px #000;
          &:hover {
            cursor: pointer;
            transform: translateX(2%) translateY(2%);
            transition: transform 0.25s ease-out;
            box-shadow: 10px 10px var(--background-color);
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
  flex-direction: row;
  justify-content: center;
  padding: 5px;
  height: 60px;
  font-size: 18px;

  h2 {
    color: var(--tertiary-color);
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
  margin: 5px;
  background-color: var(--secondary-color);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

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

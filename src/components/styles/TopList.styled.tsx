import styled from "styled-components";

export const TopListsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  margin-top: 5%;
  @media (max-width: 991px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }
`;

export const StyledWrapper = styled.div`
  background-color: var(--fourth-color);
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0;
  height: 100%;

  h2 {
    color: var(--tertiary-color);
    margin: 5px 0;
    text-align: center;
  }
`;

export const StyledTopList = styled.div`
  width: 100%;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 18px;
  flex: 1;
  margin: 0;
`;

export const StyledTopListText = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  align-items: left;
`;

export const StyledTopListItem = styled.p`
  font-size: 18px;
  margin: 5px 0;
  padding: 0;
`;

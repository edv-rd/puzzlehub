import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledField = styled.input`
  border: 1px solid var(--tertiary-color);
  padding: 3px;
  background-color: var(--fourth-color);
  font-weight: bold;
`;

const UserName = () => {
  const localUserName = localStorage.getItem("localUserName");
  const [userName, setUserName] = useState(localUserName || "");

  useEffect(() => {
    const localUserName = localStorage.getItem("localUserName");
    if (localUserName) {
      setUserName(localUserName);
    }
  }, []);

  useEffect(() => {
    if (userName === "") {
      setUserName("Guest (click to edit)");
    }
  }, [userName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = e.target.value;
    setUserName(newUserName);
    localStorage.setItem("localUserName", newUserName);
  };

  return (
    <StyledWrapper>
      playing as
      <StyledField
        type="text"
        name="userName"
        value={userName}
        onChange={handleInputChange}
      />
    </StyledWrapper>
  );
};

export default UserName;

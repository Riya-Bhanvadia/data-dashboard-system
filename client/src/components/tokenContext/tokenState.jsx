import React, { Children, useState } from "react";
import TokenContext from "./tokenContext";

const TokenState = (props) => {
  const [tok, setTok] = useState("");
  const [isAdmin,setIsAdmin] = useState(false)
  const [empId, setEmpId] = useState();

  const addToken = (data) => {
    setTok(data);
  };

  const addIsAdmin = (data) =>{
    setIsAdmin(data)
  }

  const addEmpId = (payload) => {
    setEmpId(payload);
  }

  return (
    <TokenContext.Provider value={{ tok, addToken, isAdmin, addIsAdmin, empId, setEmpId }}>
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenState;

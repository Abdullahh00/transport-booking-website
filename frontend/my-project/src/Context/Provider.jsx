import React, { useState } from "react";
import AuthContext from "./AuthContext";

const UserProvider = ({ children }) => {
  const [email, setemail] = useState(null);
  const [loggedin, set_loggedin] = useState(false);
  const [name, setname] = useState(null);
  const [user_type, set_usertype] = useState("customer");
  const [_id, set_id] = useState("");
  const [account_balance, set_account_balance] = useState(0);

  return (
    <AuthContext.Provider
      value={{ account_balance,setemail, set_loggedin, setname,set_usertype, email, loggedin, name,user_type,set_id,_id,set_account_balance }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserProvider;

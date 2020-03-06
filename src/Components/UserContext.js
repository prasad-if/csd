import React from "react";

const UserContext = React.createContext({
  username: "",
  lang:""
})

export const UserProvider = UserContext.Provider

export const UserConsumer = UserContext.Consumer

export default UserContext;

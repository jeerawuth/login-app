import React from "react";
const BlogContext = React.createContext();
export const UsersProvider = ({ children }) => {
  return <BlogContext.Provider>{children}</BlogContext.Provider>;
};

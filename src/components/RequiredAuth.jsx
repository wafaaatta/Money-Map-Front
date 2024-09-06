import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const userIsLogged = useSelector((state) => state.auth_store.isAuthenticated);

  
  

  if (!userIsLogged) {
     return <Navigate  to='/signin' replace={true}/>;
  }
  return children;
};


export default RequireAuth
import { Navigate } from "react-router-dom";
import { checkAuthentication } from "../utils/authentication";

const RequireAuth = ({ children }) => {
  // const userIsLogged = useLoginStatus(); // Your hook to get login status
  const userIsLogged = checkAuthentication();

  
  

  if (!userIsLogged) {
     return <Navigate  to='/signin' replace={true}/>;
  }
  return children;
};


export default RequireAuth
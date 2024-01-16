import { Outlet, useLocation, Navigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  phoneNo: string;
}

function ProtectRoutes() {
  const location = useLocation();

  const storedDetails = localStorage.getItem('details');

  // Parse the JSON data or default to null if parsing fails
  const userDetails: User | null = storedDetails ? JSON.parse(storedDetails) : null;
  

   if( (userDetails && userDetails.name && userDetails.email && userDetails.phoneNo)===null ){
    alert("please authenticate yourself first")
   }
  return (
    userDetails && userDetails.name && userDetails.email && userDetails.phoneNo ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace  />
    )
  );
}

export default ProtectRoutes;

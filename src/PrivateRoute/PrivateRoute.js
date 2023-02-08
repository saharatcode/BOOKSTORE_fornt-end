import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import ConfigRoutes from '../config/routes'

function PrivateRoute(props) {
  const role = props.role || "guest";
  const navigate = useNavigate()
  const allowedRoutes = ConfigRoutes[role].allowedRoutes;
  // const adminRoutes = ConfigRoutes[role].allowedRoutes;
  const redirectRoutes = ConfigRoutes[role].redirectRoutes;
  console.log(redirectRoutes)

    // useEffect(()=>{
    //   navigate(redirectRoutes)
    // },[])

  return (
    <Routes>
      {allowedRoutes?.map(route => (
        <Route
          path={route.url}
          key={route.url}
          element={<route.component setRole={props.setRole} />}
        >
        </Route>
      ))}

      {/* <Route index element={<Navigate to={redirectRoutes} />} /> */}
    </Routes>
  )
}

export default PrivateRoute
import {  useNavigate } from "react-router-dom"

 const ProtectedRouteElement =  ({element: Component, ...props}) =>  {
  const navigate = useNavigate();
  return ( 
    props.loggedIn ? <Component {...props} />: navigate('/sign-in') 
  )
}

export default ProtectedRouteElement
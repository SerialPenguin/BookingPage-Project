import { Outlet } from "react-router-dom";
import Header from "./Header"

// Creates an outlet with the type JSX.Element to make the design of the page correct
function Layout():JSX.Element{
return(
<div>
    <Header/>
    <main>
    <Outlet/>
    </main>
    
</div>
)
}

export default Layout;
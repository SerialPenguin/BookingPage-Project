import { Outlet } from "react-router-dom";
import Header from "./Header"

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
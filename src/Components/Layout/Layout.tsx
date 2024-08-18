import React from "react";
import {Outlet} from "react-router-dom";
import {ChatNavbar} from "../ChatNavbar/ChatNavbar";

const Layout:React.FC = () => {
    return(
        <div>
            <header>
                <ChatNavbar/>
            </header>

            <main>
                <Outlet/>
            </main>

        </div>
    )
}
export default Layout
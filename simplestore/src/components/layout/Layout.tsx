import{Outlet} from "react-router-dom";
import Navbar from"./Navbar";
import Footer from"./Footer";

const Layout=()=>(
    <div className="app-shell">
        <Navbar  />
        <main className="main-content">
            <Outlet  />
        </main>
        <Footer  />
        </div>
);
export default Layout;
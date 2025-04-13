import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const LayoutDefault = () => {
    return (
        <div className="flex flex-col h-screen w-full"> 
        <Header />
        <div className="flex flex-row flex-1">
            <Sidebar />
            <Outlet/>
        </div>
        </div>
    );
}
export default LayoutDefault;
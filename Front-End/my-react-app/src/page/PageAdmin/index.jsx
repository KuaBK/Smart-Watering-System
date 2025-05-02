import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const PageAdmin = () => {
    return (
        <div className="flex flex-col h-screen w-full max-h-[100vh] max-w-[100vw]">
            <Header />
            <div className="flex flex-row flex-1 max-w-[100%] max-h-[calc(100vh-91px)] overflow-y-auto ">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}
export default PageAdmin;

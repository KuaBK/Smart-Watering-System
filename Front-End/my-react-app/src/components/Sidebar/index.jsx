import { Link } from 'react-router-dom';
import home from '../../assets/home.svg'
// import thermometer from '../../assets/thermometer.svg'
import droplet from '../../assets/droplet.svg'
import sun from '../../assets/sun.svg'
import pieChart from '../../assets/pie-chart.svg'
import { NavLink } from 'react-router-dom'
const SidebarLink = ({ to, icon, label,sizetext="20px" }) => {
    return (
        <NavLink style={{ gap: sizetext }} className={({ isActive }) =>
            `flex justify-start border-b-[1px] border-[#fff] py-[20px] pl-[20px] 
            ${isActive ? 'bg-[rgba(70,223,177,1)]' : ''}`
        } to={to}>
            <img className='fill-white ' src={icon} alt="" />
            <div className={`font-baloo font-[500] text-[28px] text-white truncate `}>{label}</div>
        </NavLink>
    );
};
const Sidebar = () => {
    // const navigate = useNavigate()
    console.log(localStorage.getItem("ROLE"));
    console.log(localStorage.getItem("jwtToken"));
    var role = localStorage.getItem("ROLE");
    return (
        <div>
            {role === "ROLE_FARMER" &&
                <div className="h-[100%] w-[330px] bg-[rgba(44,135,108,0.78)]  ">
                    <SidebarLink to="overview" icon={home} label="Tổng quan" />
                    <SidebarLink to="soldMoisture" icon={droplet} label="Độ ẩm đất" />
                    <SidebarLink to="light" icon={sun} label="Ánh sáng" />
                    <SidebarLink to="statistic" icon={pieChart} label="Thống kê" />
                </div>}
            {role === "ROLE_ADMIN" &&
                <div className="h-[100%] w-[330px] bg-[rgba(44,135,108,0.78)]  ">
                    <SidebarLink to="garden" icon={home} label="Quản lý khu vườn" sizetext="10px"/>
                    <SidebarLink to="user" icon={droplet} label="Quản lý người dùng" sizetext="10px" />
                </div>}
        </div>

    );
};
export default Sidebar;
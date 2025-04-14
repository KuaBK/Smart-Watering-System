import home from '../../assets/home.svg'
// import thermometer from '../../assets/thermometer.svg'
import droplet from '../../assets/droplet.svg'
import sun from '../../assets/sun.svg'
import pieChart from '../../assets/pie-chart.svg'
import { NavLink} from 'react-router-dom'
const Sidebar = () => {
    // const navigate = useNavigate()
  return (
    <div className="h-[100%] w-[330px] bg-[rgba(44,135,108,0.78)]  ">
        <NavLink className="flex justify-start gap-[20px] border-b-[1px] border-[#fff] py-[20px] px-[20px]" to='overview'>
            <img className='fill-white ' src={home} alt="" />
            <div className='font-baloo font-[500] text-[30px] text-white '>Tổng quan</div>
        </NavLink>
        <NavLink className="flex justify-start gap-[20px] border-b-[1px] border-[#fff] py-[20px] px-[20px]" to='soldMoisture'>
            <img className='fill-white ' src={droplet} alt="" />
            <div className='font-baloo font-[500] text-[30px] text-white '>Độ ẩm đất</div>
        </NavLink>
        <NavLink className="flex justify-start gap-[20px] border-b-[1px] border-[#fff] py-[20px] px-[20px]" to='airHumidity'>
            <img className='fill-white ' src={droplet} alt="" />
            <div className='font-baloo font-[500] text-[30px] text-white '>Độ ẩm không khí</div>
        </NavLink>
        <NavLink className="flex justify-start gap-[20px] border-b-[1px] border-[#fff] py-[20px] px-[20px]" to='light'>
            <img className='fill-white ' src={sun} alt="" />
            <div className='font-baloo font-[500] text-[30px] text-white '>Ánh sáng</div>
        </NavLink>
        <NavLink className="flex justify-start gap-[20px] border-b-[1px] border-[#fff] py-[20px] px-[20px]" to='statistic'>
            <img className='fill-white ' src={pieChart} alt="" />
            <div className='font-baloo font-[500] text-[30px] text-white '>Thống kê</div>
        </NavLink>
    </div>
  );
};
export default Sidebar;
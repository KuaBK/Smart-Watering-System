import { Link } from 'react-router-dom';
import home from '../../assets/home.svg'
import thermometer from '../../assets/thermometer.svg'
import droplet from '../../assets/droplet.svg'
import sun from '../../assets/sun.svg'
import pieChart from '../../assets/pie-chart.svg'
const Sidebar = () => {
    return (
        <div className="h-[100%] w-[20%] bg-[rgba(44,135,108,0.78)]  ">
            <Link to="/user/overview">
                <div className="flex justify-start gap-[20px] border-b-[1px] border-[#fff] py-[20px] px-[20px] hover:bg-[#46DFB1] cursor-pointer">
                    <img className="fill-white" src={home} alt="" />
                    <div className="font-baloo font-[500] text-[30px] text-white">Tổng quan</div>
                </div>
            </Link>

            <div className="flex justify-start gap-[20px] border-b-[1px] border-[#fff] py-[20px] px-[20px]">
                <img className='fill-white ' src={thermometer} alt="" />
                <div className='font-baloo font-[500] text-[30px] text-white '>Nhiệt độ</div>
            </div>
            <div className="flex justify-start gap-[20px] border-b-[1px] border-[#fff] py-[20px] px-[20px]">
                <img className='fill-white ' src={droplet} alt="" />
                <div className='font-baloo font-[500] text-[30px] text-white '>Độ Ẩm</div>
            </div>
            <div className="flex justify-start gap-[20px] border-b-[1px] border-[#fff] py-[20px] px-[20px]">
                <img className='fill-white ' src={sun} alt="" />
                <div className='font-baloo font-[500] text-[30px] text-white '>Ánh sáng</div>
            </div>
            <Link to="/user/statistic">
                <div className="flex justify-start gap-[20px] border-b-[1px] border-[#fff] py-[20px] px-[20px] hover:bg-[#46DFB1] cursor-pointer">
                    <img className="fill-white" src={pieChart} alt="" />
                    <div className="font-baloo font-[500] text-[30px] text-white">Thống kê</div>
                </div>
            </Link>

        </div >
    );
};
export default Sidebar;
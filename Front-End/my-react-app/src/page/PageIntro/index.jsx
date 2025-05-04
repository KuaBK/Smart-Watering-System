import sun from '../../assets/sun.svg'
import droplet from '../../assets/droplet.svg'
import thermometer from '../../assets/thermometer.svg'
import wind from '../../assets/wind.svg'
import garden from '../../assets/garden.jpg'
import "./style.css"
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Garden = ({ name, tem, sold, lig, air, active }) => {
    return (
        <div className="flip-card rounded-[50px]">
            <div className="flip-card-inner rounded-[50px]">
                <div className="flip-card-front relative  rounded-[50px]">
                    <img className='w-full h-full rounded-[50px]' src={garden} alt="" />
                </div>
                {active ? (
                    <div className="flip-card-back bg-[rgba(4,159,45,0.54)] p-[20px]  rounded-[50px]">
                        <h2 className="h-[30%] font-baloo font-[400] text-[40px] text-white ">Garden {name}</h2>
                        <div className="flex flex-col justify-center items-center w-full h-[60%] m-t-[30px]">
                            <div className="flex flex-grow justify-center items-center h-[50%] w-full">
                                <div className="flex items-center justify-center border-r border-b border-white text-white font-baloo px-[10px] font-[400] text-[35px] w-[50%] h-full "><img src={thermometer} alt="" />{tem}°C</div>
                                <div className="flex items-center justify-center border-l border-b border-white text-white font-baloo px-[10px] font-[400] text-[35px] w-[50%] h-full "><img src={droplet} alt="" />{sold}%</div>
                            </div>
                            <div className="flex flex-grow justify-center items-center h-[50%] w-full">
                                <div className="flex items-center justify-center border-r border-t border-white text-white font-baloo px-[10px] font-[400] text-[35px] w-[50%] h-full "><img src={sun} alt="" />{lig}%</div>
                                <div className="flex items-center justify-center border-t border-l border-white text-white font-baloo px-[10px] font-[400] text-[35px] w-[50%] h-full "><img src={wind} alt="" />{air}%</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flip-card-back bg-[rgba(4,159,45,0.54)] p-[20px]  rounded-[50px]">
                        <h2 className="h-[30%] font-baloo font-[400] text-[40px] text-white ">Khu vườn chưa đi vào hoạt động</h2>
                    </div>
                )}
            </div>
        </div>


    );
};
// export Garden;
const PageIntro = () => {
    const name = "1";
    const navigate = useNavigate();
    const selectGarden = (e,active=true) => {
        if (active){
            localStorage.setItem("garden", e);
        navigate('/user');
        } else{
            Swal.fire({
                icon: "error",
                title: "Xin lỗi..",
                text: "Khu vườn chưa đi nào hoạt động!",
              });
        }
        
    }
    const [lastState, setLastState] = useState({});

    useEffect(() => {
        const fetchLastState = async (init) => {

            try {
                if (init) {
                    Swal.fire({
                        title: 'Đang tải trạng thái hệ thống...',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                }
                const response = await axios.get(`${API_CE}/last-state`);
                setLastState(response.data)
                Swal.close();
            } catch (error) {
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi tải trạng thái!',
                    text: 'Không thể kết nối tới máy chủ.',
                });
                console.error("Lỗi gọi API:", error);
            }
        };
        fetchLastState(true);
        const interval = setInterval(() => {
            fetchLastState(false);
        }, 5000); // 5000ms = 5s

        // Clear interval khi component unmount
        return () => clearInterval(interval);
    }, []);
    return (
        <div  className="flex flex-col h-screen w-[100vw] ">
            <Header />
            <div className="flex flex-wrap justify-start items-center max-w-[100vw] overflow-hidden h-[100%] m-[50px]">
                <div onClick={() => selectGarden(name)}>
                    <Garden name={name} tem={lastState.temperatureState} sold={lastState.soilState} lig={lastState.lightLevelState} air={lastState.airState} />
                </div>
            </div>
        </div>
    )
};
export default PageIntro;
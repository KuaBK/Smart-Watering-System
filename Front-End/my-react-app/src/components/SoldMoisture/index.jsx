import React, { useEffect, useRef, useState } from 'react';
import ProgressChart from '../ProgressChart';
import up from '../../assets/chevron-up.svg';
import down from '../../assets/chevron-down.svg'
import Equipment from '../Equipment';
import Pump from '../../assets/pump.svg'
import axios from 'axios';
import Swal from 'sweetalert2';

const SoldMoisture = () => {
    const idUser = localStorage.getItem("UserId");
    const gardenName = localStorage.getItem("garden");
    // const [selectedGarden, setSelectedGarden] = useState(1); // Track the selected garden
    const [mode, setMode] = useState('overTime'); // Track the selected mode
    const [pump1, setPump1] = useState(false); // Machine 1 state
    // const [machine2, setMachine2] = useState(true); // Machine 2 state
    const [startTime, setStartTime] = useState(''); // Start time for "Theo thời gian"
    const [endTime, setEndTime] = useState(''); // End time for "Theo thời gian"
    const [isOpenMode, setisOpenMode] = useState(false);
    const dropdownMode = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownMode.current && !dropdownMode.current.contains(event.target)) {
                setisOpenMode(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
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
                console.log(response.data)
                setLastState(response.data)
                setPump1(response.data.pumpState === "1")
                if (init) {
                    setMode(response.data.modePump === "notAuto" ? "handWork" : "overTime");
                    Swal.close();
                }
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
    const controlPump = async () => {
        const param = pump1 ? "off" : "on";
        Swal.fire({
            title: 'Đang gửi yêu cầu...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        try {
            const response = await axios.get(`${API_CE}/pump/${param}?userId=${idUser}&gardenName=${gardenName}`);
            if (response.status === 200) {
                setPump1(!pump1); // Chỉ thay đổi khi server phản hồi OK
                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Đã ${pump1 ? 'tắt' : 'bật'} máy bơm thành công.`
                });
            } else {
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: `Server trả về trạng thái lỗi: ${response.status}`
                });
            }
        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Không thể kết nối đến máy chủ.'
            });
            console.error("Lỗi gọi API:", error);
        }
    };
    const handleSmartPump = async () =>{
        Swal.fire({
            title: 'Đang gửi yêu cầu...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        console.log(idUser,gardenName,startTime,endTime);
        try {
            const response = await axios.get(`${API_CE}/smart-controller/pump/start?userId=${idUser}&gardenName=${gardenName}&startTime=${startTime}&endTime=${endTime}`);
            if (response.status === 200) {
                setPump1(!pump1); 
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Đã kích hoạt trạng thái bơm nước tự động thành công.`
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: `Server trả về trạng thái lỗi: ${response.status}`
                });
            }
        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Không thể kết nối đến máy chủ.'
            });
            console.error("Lỗi gọi API:", error);
        }
    };


    return (
        <div className="flex flex-col h-[100%] max-w-[calc(100%-333px)] w-[calc(100%-333px)] flex-1 bg-white px-[80px] py-[50px] box-border ">
            {/* Tabs */}
            <div className={`border-b-0 border-black text-[50px] font-baloo font-[600] text-black  border-2 bg-[rgba(70,223,177,1)] }`}>



                Khu vườn {gardenName}
            </div>

            {/* Content */}
            <div className="flex py-[50px] border-2 h-[100%] w-full max-w-full border-black bg-[rgba(192,255,236,1)]">
                {/* Chart Section */}
                <div className="text-center w-[550px] border-r border-black">
                    <ProgressChart value={lastState.soilState} min={40} max={60} />
                </div>

                {/* Controls Section */}
                <div className=' px-[40px]  w-[calc(100%-550px)]'>
                    {/* Mode Selector */}
                    <div className="mb-6 flex gap-[20px]">
                        <label className="block text-start text-[30px] font-semibold mb-2 whitespace-nowrap w-[250px] ">Chế độ hiện tại</label>
                        <div ref={dropdownMode}
                            className="relative border border-black bg-[#89FF9A] px-[20px] cursor-pointer w-[300px] text-start flex items-center h-[50px] text-[25px]"
                            onClick={() => setisOpenMode(!isOpenMode)}
                        >
                            {mode === "handWork" ? "Thủ công" : mode === "overTime" ? "Theo thời gian" : "Theo cảm biến"}

                            <img className='absolute top-3 right-2' src={isOpenMode ? up : down} alt="" />


                            {isOpenMode && (
                                <ul className="z-10 absolute top-[100%] left-0 border border-black bg-white w-[100%] ">
                                    <li className={`px-[20px] h-[50px] flex items-center text-[25px]  hover:bg-[#89FF9A] ${mode == "handWork" && "bg-[#89FF9A]"}`} onClick={() => { setMode("handWork"); setisOpenMode(false); }}>Thủ công</li>
                                    <li className={`px-[20px] h-[50px] flex items-center text-[25px]  hover:bg-[#89FF9A] ${mode == "overTime" && "bg-[#89FF9A]"}`} onClick={() => { setMode("overTime"); setisOpenMode(false); }}>Theo thời gian</li>
                                    <li className={`px-[20px] h-[50px] flex items-center text-[25px]  hover:bg-[#89FF9A] ${mode == "overSensor" && "bg-[#89FF9A]"}`} onClick={() => { setMode("overSensor"); setisOpenMode(false); }}>Theo cảm biến</li>
                                </ul>
                            )}
                        </div>


                    </div>
                    {mode === "handWork" && (
                        <div>
                            <div className='flex justify-center'>
                                <div className='text-[30px] font-[600] mb-[40px] relative w-fit'>Hệ thống tưới hiện tại
                                    <div className='absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-2/3 border-b-2 border-black '></div>
                                </div>

                            </div>
                            <div className="flex gap-[20px] w-full overflow-auto justify-center ">
                                {/* Machine 1 */}
                                {/* <Equipment name={"abc"} img={Pump} status={machine1} setStatus={setMachine1} /> */}
                                <Equipment name={"abc"} img={Pump} status={pump1} setStatus={controlPump} />

                                {/* Machine 2 */}
                            </div>
                        </div>

                    )}
                    {/* Dynamic Controls Based on Mode */}
                    {mode === 'overTime' && (
                        <div className='flex flex-col items-start'>
                            <div className="flex gap-[20px] w-full overflow-auto justify-center ">
                                <Equipment name={"abc"} img={Pump} handle={false} />

                            </div>

                            <div className="my-6 flex justify-between w-full">
                                <div className='flex gap-[20px]'>
                                    <label className="flex text-lg font-semibold whitespace-nowrap items-center">Bắt đầu:</label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)} // Update start time
                                        className="w-[200px] p-2 border border-green-300 bg-[rgba(151,251,166,1)] rounded-[15px]"
                                    />
                                </div>
                                <div className='flex gap-[20px]'>

                                    <label className="flex items-center text-lg font-semibold whitespace-nowrap">Kết thúc:</label>
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)} // Update end time
                                        className="w-[200px] p-2 border border-green-300 bg-[rgba(151,251,166,1)] rounded-[15px]"
                                    />
                                </div>
                            </div>
                            <button onClick={handleSmartPump} className='rounded-[15px] border-[2px] border-[rgba(17,79,60,1)] bg-[rgba(135,255,167,1)] text-[30px] font-[400] font-baloo w-[140px] h-[50px] self-end'>Lưu</button>
                        </div>
                    )}

                    {mode === 'overSensor' && (
                        <div className="mb-6 flex flex-col justify-around w-full h-[80%]">
                            <div className='flex gap-[20px]'>
                                <label className="block text-start text-[30px] font-[400] mb-2 whitespace-nowrap w-[250px] ">Bơm nước khi</label>
                                <div
                                    className="relative border border-black rounded-[15px] flex-1 bg-[#89FF9A] px-[20px] cursor-pointer text-start flex items-center h-[45px] text-[25px]"
                                >
                                    Độ ẩm đất &lt; 30 %
                                </div>
                            </div>

                            <div className='flex gap-[20px]'>
                                <label className="block text-start text-[30px] font-[400] mb-2 whitespace-nowrap w-[250px] ">Ngừng bơm khi</label>
                                <div
                                    className="relative border border-black rounded-[15px] flex-1 bg-[#89FF9A] px-[20px] cursor-pointer text-start flex items-center h-[45px] text-[25px]"
                                >
                                    Độ ẩm đất &gt; 50 %
                                </div>
                            </div>
                            {/* <button className='rounded-[15px] border-[2px] border-[rgba(17,79,60,1)] bg-[rgba(135,255,167,1)] text-[30px] font-[400] font-baloo w-[140px] h-[50px] self-end'>Lưu</button> */}
                        </div>
                    )}

                    {/* Watering System */}

                </div>
            </div>
        </div>
    );
};

export default SoldMoisture;
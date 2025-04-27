import React, { useEffect, useRef, useState } from 'react';
import ProgressChart from '../ProgressChart';
import up from '../../assets/chevron-up.svg'
import down from '../../assets/chevron-down.svg'
import Equipment from '../Equipment';
import Pump from '../../assets/pump.svg'
import axios from 'axios';

const AirHumidity = () => {
    // const [selectedGarden, setSelectedGarden] = useState(1); // Track the selected garden
    const [mode, setMode] = useState('overTime'); // Track the selected mode
    const [machine1, setMachine1] = useState(false); // Machine 1 state
    // const [machine2, setMachine2] = useState(true); // Machine 2 state
    const [startTime, setStartTime] = useState(''); // Start time for "Theo thời gian"
    const [endTime, setEndTime] = useState(''); // End time for "Theo thời gian"
    // const [startThreshold, setStartThreshold] = useState(''); // Start threshold for "Theo cảm biến"
    // const [stopThreshold, setStopThreshold] = useState(''); // Stop threshold for "Theo cảm biến"
    const [isOpenMode, setisOpenMode] = useState(false);
    // const [isOpenStart, setisOpenStart] = useState(false);
    // const [isOpenEnd, setisOpenEnd] = useState(false);
    const dropdownMode = useRef(null)
    const gardens = localStorage.getItem('garden');
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
    useEffect(()=>{
        const fetchLastState = async () => {
            try {
                const response = await axios.get(`${API_CE}/last-state`);
                // console.log(response.data)
                setLastState(response.data)
            } catch (error) {
                console.error("Lỗi gọi API:", error);
            }
        };
        fetchLastState();
        const interval = setInterval(() => {
            fetchLastState();
        }, 5000); // 5000ms = 5s

        // Clear interval khi component unmount
        return () => clearInterval(interval);
    },[]);

    return (
        <div className="flex flex-col h-[100%] max-w-[calc(100%-333px)] w-[calc(100%-333px)] flex-1 bg-[#c8efd0] px-[80px] py-[50px] box-border ">
            {/* Tabs */}
            <div className={`border-b-0 border-black text-[50px] font-baloo font-[600] text-black  border-2 bg-[rgba(70,223,177,1)] }`}>



                Khu vườn {gardens}
            </div>

            {/* Content */}
            <div className="flex py-[50px] border-2 h-[100%] w-full max-w-full border-black bg-[rgba(192,255,236,1)]">
                {/* Chart Section */}
                <div className="text-center w-[550px] border-r border-black">
                    <ProgressChart value={lastState.airState} min={30} max={50} />
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
                                <Equipment name={"abc"} img={Pump} status={machine1} setStatus={setMachine1} />
                                {/* <Equipment name={"abc"} img={Pump} status={machine1} setStatus={setMachine1} /> */}

                                {/* Machine 2 */}
                            </div>
                        </div>

                    )}
                    {/* Dynamic Controls Based on Mode */}
                    {mode === 'overTime' && (
                        <div className='flex flex-col items-start'>
                            <div className="flex gap-[20px] w-full overflow-auto justify-center ">
                                <Equipment name={"abc"} img={Pump} status={machine1} setStatus={setMachine1} />
                                {/* <Equipment name={"abc"} img={Pump} status={machine1} setStatus={setMachine1} /> */}

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
                            <button className='rounded-[15px] border-[2px] border-[rgba(17,79,60,1)] bg-[rgba(135,255,167,1)] text-[30px] font-[400] font-baloo w-[140px] h-[50px] self-end'>Lưu</button>
                        </div>
                    )}

                    {mode === 'overSensor' && (
                        <div className="mb-6 flex flex-col justify-between w-full h-[80%]">
                            <div className='flex gap-[20px]'>
                                <label className="block text-start text-[30px] font-[400] mb-2 whitespace-nowrap w-[250px] ">Bơm nước khi</label>
                                <div
                                    className="relative border border-black rounded-[15px] flex-1 bg-[#89FF9A] px-[20px] cursor-pointer text-start flex items-center h-[45px] text-[25px]"
                                    // onClick={() => setisOpenStart(!isOpenStart)}
                                >
                                    Độ ẩm không khí &lt; 30 %

                                    {/* <img className='absolute top-2.5 right-2' src={isOpenStart ? up : down} alt="" />


                                    {isOpenStart && (
                                        <ul className="z-10 absolute top-[100%] left-0 border border-black bg-white w-[100%] ">
                                            <li className={`px-[20px] h-[45px] flex items-center text-[25px]  hover:bg-[#C8F0D0] ${startThreshold == "10" && "bg-[#C8F0D0]"}`} onClick={() => { setStartThreshold("10"); isOpenStart(false); }}>Độ ẩm không khí &lt; 10%</li>
                                            <li className={`px-[20px] h-[45px] flex items-center text-[25px]  hover:bg-[#C8F0D0] ${startThreshold == "20" && "bg-[#C8F0D0]"}`} onClick={() => { setStartThreshold("20"); isOpenStart(false); }}>Độ ẩm không khí &lt; 20%</li>
                                            <li className={`px-[20px] h-[45px] flex items-center text-[25px]  hover:bg-[#C8F0D0] ${startThreshold == "30" && "bg-[#C8F0D0]"}`} onClick={() => { setStartThreshold("30"); isOpenStart(false); }}>Độ ẩm không khí &lt; 30%</li>
                                        </ul>
                                    )} */}
                                </div>
                            </div>

                            <div className='flex gap-[20px]'>
                                <label className="block text-start text-[30px] font-[400] mb-2 whitespace-nowrap w-[250px] ">Ngừng bơm khi</label>
                                <div
                                    className="relative border border-black rounded-[15px] flex-1 bg-[#89FF9A] px-[20px] cursor-pointer text-start flex items-center h-[45px] text-[25px]"
                                    // onClick={() => setisOpenEnd(!isOpenEnd)}
                                >
                                    Độ ẩm không khí &gt; 50 %

                                    {/* <img className='absolute top-2.5 right-2' src={isOpenEnd ? up : down} alt="" />


                                    {isOpenEnd && (
                                        <ul className="absolute top-[100%] left-0 border border-black bg-white w-[100%] ">
                                            <li className={`px-[20px] h-[45px] flex items-center text-[25px]  hover:bg-[#C8F0D0] ${stopThreshold == "10" && "bg-[#C8F0D0]"}`} onClick={() => { setStopThreshold("10"); isOpenEnd(false); }}>Độ ẩm không khí &gt; 10%</li>
                                            <li className={`px-[20px] h-[45px] flex items-center text-[25px]  hover:bg-[#C8F0D0] ${stopThreshold == "20" && "bg-[#C8F0D0]"}`} onClick={() => { setStopThreshold("20"); isOpenEnd(false); }}>Độ ẩm không khí &gt; 20%</li>
                                            <li className={`px-[20px] h-[45px] flex items-center text-[25px]  hover:bg-[#C8F0D0] ${stopThreshold == "30" && "bg-[#C8F0D0]"}`} onClick={() => { setStopThreshold("30"); isOpenEnd(false); }}>Độ ẩm không khí &gt; 30%</li>
                                        </ul>
                                    )} */}
                                </div>
                            </div>
                            <button className='rounded-[15px] border-[2px] border-[rgba(17,79,60,1)] bg-[rgba(135,255,167,1)] text-[30px] font-[400] font-baloo w-[140px] h-[50px] self-end'>Lưu</button>
                        </div>
                    )}

                    {/* Watering System */}

                </div>
            </div>
        </div>
    );
};

export default AirHumidity;
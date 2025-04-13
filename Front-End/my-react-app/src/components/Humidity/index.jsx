import React, { useEffect, useRef, useState } from 'react';
import ProgressChart from '../ProgressChart';
import up from '../../assets/chevron-up.svg'
import down from '../../assets/chevron-down.svg'
import Equipment from '../Equipment';
import Pump from '../../assets/pump.svg'

const Humidity = () => {
    const [selectedGarden, setSelectedGarden] = useState(1); // Track the selected garden
    const [mode, setMode] = useState('overTime'); // Track the selected mode
    // const [machine1, setMachine1] = useState(false); // Machine 1 state
    const [machine2, setMachine2] = useState(true); // Machine 2 state
    const [startTime, setStartTime] = useState(''); // Start time for "Theo thời gian"
    const [endTime, setEndTime] = useState(''); // End time for "Theo thời gian"
    const [startThreshold, setStartThreshold] = useState(''); // Start threshold for "Theo cảm biến"
    const [stopThreshold, setStopThreshold] = useState(''); // Stop threshold for "Theo cảm biến"
    const [isOpenMode, setisOpenMode] = useState(false);
    const [isOpenStart, setisOpenStart] = useState(false);
    const [isOpenEnd, setisOpenEnd] = useState(false);
    const dropdownMode = useRef(null)
    const dropdownStart = useRef(null)
    const dropdownEnd = useRef(null)
    const gardens = [1, 2, 3, 4, 5, 6]; // List of gardens
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownMode.current && !dropdownMode.current.contains(event.target)) {
                setisOpenMode(false);
            }
            if (dropdownStart.current && !dropdownStart.current.contains(event.target)) {
                setisOpenStart(false);
            }
            if (dropdownEnd.current && !dropdownEnd.current.contains(event.target)) {
                setisOpenEnd(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col h-[100%] w[100%] flex-1 bg-[#c8efd0] px-[80px] py-[50px]">
            {/* Tabs */}
            <div className="flex justify-between">
                {gardens.map((garden) => (
                    <button
                        key={garden}
                        onClick={() => setSelectedGarden(garden)} // Update selected garden
                        className={`flex-grow px-4 py-2 border-b-2 border-black text-[30px] font-baloo font-[600] text-black ${selectedGarden === garden
                            ? 'bg-[rgba(70,223,177,1)] border-2 border-b-0'
                            : 'bg-transparents'
                            }`}
                    >
                        Khu vườn {garden}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className=" flex flex-1 py-[50px] border-2 border-t-0 border-black bg-[rgba(192,255,236,1)]">
                {/* Chart Section */}
                <div className="text-center w-[550px] border-r border-black">
                    <ProgressChart value={50} min={40} max={60} />
                </div>

                {/* Controls Section */}
                <div className='flex-1 px-[40px]'>
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

                    {/* Dynamic Controls Based on Mode */}
                    {mode === 'overTime' && (
                        <div className="mb-6 flex justify-between">
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
                    )}

                    {mode === 'overSensor' && (
                        <div className="mb-6">
                            <div className='flex gap-[20px]'>
                                <label className="block text-start text-[30px] font-[400] mb-2 whitespace-nowrap w-[250px] ">Bơm nước khi</label>
                                <div ref={dropdownStart}
                                    className="relative border border-black rounded-[15px] flex-1 bg-[#89FF9A] px-[20px] cursor-pointer text-start flex items-center h-[45px] text-[25px]"
                                    onClick={() => setisOpenStart(!isOpenStart)}
                                >
                                    Độ ẩm đất &lt; {startThreshold === "10" ? "10" : startThreshold === "20" ? "20" : "30"}

                                    <img className='absolute top-2.5 right-2' src={isOpenStart ? up : down} alt="" />


                                    {isOpenStart && (
                                        <ul className="z-10 absolute top-[100%] left-0 border border-black bg-white w-[100%] ">
                                            <li className={`px-[20px] h-[45px] flex items-center text-[25px]  hover:bg-[#C8F0D0] ${startThreshold == "10" && "bg-[#C8F0D0]"}`} onClick={() => { setStartThreshold("10"); isOpenStart(false); }}>Độ ẩm đất &lt; 10%</li>
                                            <li className={`px-[20px] h-[45px] flex items-center text-[25px]  hover:bg-[#C8F0D0] ${startThreshold == "20" && "bg-[#C8F0D0]"}`} onClick={() => { setStartThreshold("20"); isOpenStart(false); }}>Độ ẩm đất &lt; 20%</li>
                                            <li className={`px-[20px] h-[45px] flex items-center text-[25px]  hover:bg-[#C8F0D0] ${startThreshold == "30" && "bg-[#C8F0D0]"}`} onClick={() => { setStartThreshold("30"); isOpenStart(false); }}>Độ ẩm đất &lt; 30%</li>
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className='flex gap-[20px]'>
                                <label className="block text-start text-[30px] font-[400] mb-2 whitespace-nowrap w-[250px] ">Ngừng bơm khi</label>
                                <div ref={dropdownEnd}
                                    className="relative border border-black rounded-[15px] flex-1 bg-[#89FF9A] px-[20px] cursor-pointer text-start flex items-center h-[45px] text-[25px]"
                                    onClick={() => setisOpenEnd(!isOpenEnd)}
                                >
                                    Độ ẩm đất &gt; {stopThreshold === "10" ? "10" : stopThreshold === "20" ? "20" : "30"}

                                    <img className='absolute top-2.5 right-2' src={isOpenEnd ? up : down} alt="" />


                                    {isOpenEnd && (
                                        <ul className="absolute top-[100%] left-0 border border-black bg-white w-[100%] ">
                                            <li className={`px-[20px] h-[45px] flex items-center text-[25px]  hover:bg-[#C8F0D0] ${stopThreshold == "10" && "bg-[#C8F0D0]"}`} onClick={() => { setStopThreshold("10"); isOpenEnd(false); }}>Độ ẩm đất &gt; 10%</li>
                                            <li className={`px-[20px] h-[45px] flex items-center text-[25px]  hover:bg-[#C8F0D0] ${stopThreshold == "20" && "bg-[#C8F0D0]"}`} onClick={() => { setStopThreshold("20"); isOpenEnd(false); }}>Độ ẩm đất &gt; 20%</li>
                                            <li className={`px-[20px] h-[45px] flex items-center text-[25px]  hover:bg-[#C8F0D0] ${stopThreshold == "30" && "bg-[#C8F0D0]"}`} onClick={() => { setStopThreshold("30"); isOpenEnd(false); }}>Độ ẩm đất &gt; 30%</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Watering System */}
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Machine 1 */}
                            <Equipment name={"abc"} img={Pump}  />

                            {/* Machine 2 */}
                            <div className="flex flex-col items-center bg-green-200 p-4 rounded-lg">
                                <p className="mb-2 font-semibold">Máy 2</p>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={machine2} // Bound to the state
                                        onChange={() => setMachine2(!machine2)} // Toggle state on change
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:bg-green-500"></div>
                                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Humidity;
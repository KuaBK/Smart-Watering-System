
import Swal from "sweetalert2";
import ProgressChart from "../ProgressChart";
import axios from "axios";
import { useEffect, useState } from "react";

const CircularProgress = ({ percentage = 0, label,color }) => {
    const [progress, setProgress] = useState(0); // ban đầu 0%

    useEffect(() => {
        const timeout = setTimeout(() => {
            setProgress(percentage); // animate đến percentage thật
        }, 100); // delay nhẹ để CSS transition bắt kịp
        return () => clearTimeout(timeout);
    }, [percentage]);
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        className="text-green-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="80"
                        cx="50%"
                        cy="50%"
                    />
                    <circle
                        className={`${color}`}
                        strokeWidth="10"
                        strokeDasharray="502"
                        strokeDashoffset={502 - (502 * progress) / 100}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="80"
                        cx="50%"
                        cy="50%"
                        style={{
                            transition: 'stroke-dashoffset 0.5s ease-in-out',
                        }}
                    />

                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                    {percentage}%
                </div>
            </div>
            <span className="mt-2 text-base font-semibold text-center">{label}</span>
        </div>
    );
};
const favrange ={
    minTemp : 20,
    maxTemp: 30,
    minSold: 40,
    maxSold: 60,
    minAir: 40,
    maxAir:60,
    minLight: 30,
    maxLight:40
}
const Overview = () => {
    const [lastState, setLastState] = useState();
    const gardenName = localStorage.getItem("garden");
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
                setLastState(response.data);
                if (init) {
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
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    // const {
    //     temperature = lastState?.temperatureState,
    //     lastState?.soilState = lastState?.soilState,
    //     lastState?.airState = lastState?.airState,
    //     lastState?.lightLevelState = lastState?.lightLevelState
    // };

    const minTemp = 0;
    const maxTemp = 50;
    const optimalStart = 20;
    const optimalEnd = 30;

    const getPercent = (value) => ((value - minTemp) / (maxTemp - minTemp)) * 100;

    return (
        <div className="flex flex-col items-start w-full min-h-full gap-10 px-8 py-10 ">
            <h1 className="mb-10 text-4xl font-bold text-left">Khu vườn {gardenName}</h1>

            <div className="flex flex-col gap-10 mx-auto md:flex-row">
                <div className="flex flex-col items-center flex-1">
                    <div className="w-full max-w-[900px] mb-16">
                        <div className="relative w-full">
                            <div className="h-4 bg-green-200 rounded-full" />
                            <div
                                className="absolute top-0 h-4 bg-green-600 rounded-full"
                                style={{
                                    left: `${getPercent(optimalStart)}%`,
                                    width: `${getPercent(optimalEnd) - getPercent(optimalStart)}%`
                                }}
                            />
                            <div
                                className="absolute transform -translate-x-1/2"
                                style={{ left: `${getPercent(lastState?.temperatureState)}%`, bottom: '-0.25rem' }}
                            >
                                <div className={`mt-1 text-sm font-bold text-center ${lastState?.temperatureState >= favrange.minTemp && lastState?.temperatureState <= favrange.maxTemp ? 'text-[#208F30]' : 'text-[#E50000]'}`}>
                                    {lastState?.temperatureState}°C
                                </div>
                                <div className="w-0.5 h-6 bg-green-600 mx-auto" />
                            </div>
                            <div className="absolute left-0 w-full mt-4 text-sm font-semibold top-full">
                                <div className="relative w-full">
                                    <span className="absolute left-0 -translate-x-1/2">0</span>
                                    <span
                                        className="absolute text-red-500 -translate-x-1/2"
                                        style={{ left: `${getPercent(optimalStart)}%` }}
                                    >
                                        {optimalStart}
                                    </span>
                                    <span
                                        className="absolute text-red-500 -translate-x-1/2"
                                        style={{ left: `${getPercent(optimalEnd)}%` }}
                                    >
                                        {optimalEnd}
                                    </span>
                                    <span className="absolute -translate-x-1/2 left-full">50</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-16 md:flex-row">
                        <CircularProgress percentage={lastState?.soilState} label="Độ ẩm đất" color={ lastState?.soilState > favrange.minSold && lastState?.soilState < favrange.maxSold ? 'text-[#208F30]' : 'text-[#E50000]'}/>
                        <CircularProgress percentage={lastState?.airState} label="Độ ẩm không khí" color={ lastState?.airState > favrange.minAir && lastState?.airState < favrange.maxAir ? 'text-[#208F30]' : 'text-[#E50000]'} />
                        <CircularProgress percentage={lastState?.lightLevelState} label="Cường độ ánh sáng" color={ lastState?.lightLevelState > favrange.minLight && lastState?.lightLevelState < favrange.maxLight ? 'text-[#208F30]' : 'text-[#E50000]'} />
                    </div>

                    {/* <div className="flex justify-center mt-20">
                        <button className="px-12 py-4 text-lg font-bold text-black transition bg-green-400 rounded-full hover:bg-green-500">
                            Điều chỉnh
                        </button>
                    </div> */}
                </div>
                <div className="flex flex-col self-start w-full gap-10 -mt-12 text-base md:w-1/3 md:ml-20">
                    <div>
                        <h2 className="mb-4 text-xl font-bold text-center">Khoảng thuận lợi</h2>
                        <div className="grid grid-cols-2 overflow-hidden text-sm font-semibold text-center shadow-md rounded-2xl">
                            <div className="p-6 bg-green-100">
                                <div className="relative font-bold">
                                    <span className="relative z-10 font-[600] text-[18px]">Nhiệt độ</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className="mt-2 text-lg font-bold">{favrange.minTemp}°C - {favrange.maxTemp}°C</div>
                            </div>
                            <div className="p-6 bg-green-200">
                                <div className="relative font-bold">
                                    <span className="relative z-10 font-[600] text-[18px]">Độ ẩm đất</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className="mt-2 text-lg font-bold">{favrange.minSold}% - {favrange.maxSold}%</div>
                            </div>
                            <div className="p-6 bg-green-200">
                                <div className="relative font-bold">
                                    <span className="relative z-10 font-[600] text-[18px]">Độ ẩm không khí</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className="mt-2 text-lg font-bold">{favrange.minAir}% - {favrange.maxAir}%</div>
                            </div>
                            <div className="p-6 bg-green-300">
                                <div className="relative font-bold">
                                    <span className="relative z-10 font-[600] text-[18px]">Cường độ ánh sáng</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className="mt-2 text-lg font-bold">{favrange.minLight}% - {favrange.maxLight}%</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-4 text-xl font-bold text-center text-green-700">Trạng thái hiện tại</h2>
                        <div className="grid grid-cols-2 overflow-hidden text-sm font-semibold text-center shadow-md rounded-2xl">
                            <div className="p-6 bg-cyan-100">
                                <div className="relative font-bold">
                                    <span className="relative z-10 font-[600] text-[18px]">Nhiệt độ</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className={`mt-2 text-lg font-bold ${lastState?.temperatureState >= favrange.minTemp && lastState?.temperatureState <= favrange.maxTemp ? 'text-[#208F30]' : 'text-[#E50000]'}`}>{lastState?.temperatureState}°C</div>
                            </div>
                            <div className="p-6 bg-cyan-200">
                                <div className="relative font-bold">
                                    <span className="relative z-10 font-[600] text-[18px]">Độ ẩm đất</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className={`mt-2 text-lg font-bold ${lastState?.soilState >= favrange.minSold && lastState?.soilState <= favrange.maxSold ? 'text-[#208F30]' : 'text-[#E50000]'}`}>
                                    {lastState?.soilState}%
                                </div>
                            </div>
                            <div className="p-6 bg-cyan-200">
                                <div className="relative font-bold">
                                    <span className="relative z-10 font-[600] text-[18px]">Độ ẩm không khí</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className={`mt-2 text-lg font-bold ${lastState?.airState >= favrange.minAir && lastState?.airState <= favrange.maxAir ? 'text-[#208F30]' : 'text-[#E50000]'}`}>{lastState?.airState}%</div>
                            </div>
                            <div className="p-6 bg-cyan-300">
                                <div className="relative font-bold">
                                    <span className="relative z-10 font-[600] text-[18px]">Cường độ ánh sáng</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className={`mt-2 text-lg font-bold ${lastState?.lightLevelState >= favrange.minLight && lastState?.lightLevelState <= favrange.maxLight ? 'text-[#208F30]' : 'text-[#E50000]'}`}>{lastState?.lightLevelState}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;

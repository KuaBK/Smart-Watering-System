import Swal from "sweetalert2";
import ProgressChart from "../ProgressChart";
import axios from "axios";
import { useEffect, useState } from "react";

const CircularProgress = ({ percentage, label, color }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-[150px] h-[150px] md:w-[222px] md:h-[222px]">
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
                        className={`text-${color}`}
                        strokeWidth="10"
                        strokeDasharray="502"
                        strokeDashoffset={502 - (502 * percentage) / 100}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="80"
                        cx="50%"
                        cy="50%"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">
                    {percentage}%
                </div>
            </div>
            <span className="mt-2 font-semibold text-center">{label}</span>
        </div>
    );
};

const Overview = ({ data }) => {
    const [lastState,setLastState] = useState();
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
        }, 5000); // 5000ms = 5s

        // Clear interval khi component unmount
        return () => clearInterval(interval);
    }, []);
    const {
        temperature = lastState?.temperatureState,
        soilMoisture = lastState?.soilState,
        airHumidity = lastState?.airState,
        lightIntensity = lastState?.lightLevelState
    } = data || {};

    const minTemp = 0;
    const maxTemp = 50;
    const optimalStart = 20;
    const optimalEnd = 30;

    const getPercent = (value) => ((value - minTemp) / (maxTemp - minTemp)) * 100;

    return (
        <div className="min-h-screen p-6 flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-left mb-4">Khu vườn 1</h1>

            <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 flex flex-col items-center">
                    <div className="w-full max-w-[750px] mb-12">
                        <div className="relative w-full">
                            <div className="h-2 bg-green-200 rounded-full" />
                            <div
                                className="absolute top-0 h-2 bg-green-600 rounded-full"
                                style={{
                                    left: `${getPercent(optimalStart)}%`,
                                    width: `${getPercent(optimalEnd) - getPercent(optimalStart)}%`
                                }}
                            />
                            <div
                                className="absolute transform -translate-x-1/2"
                                style={{ left: `${getPercent(temperature)}%`,bottom: '-0.25rem' }}
                            >
                                <div className="text-green-700 font-bold text-sm mt-1 text-center">
                                    {temperature}°C
                                </div>
                                <div className="w-0.5 h-4 bg-green-600 mx-auto" />
                            </div>
                            <div className="absolute top-full left-0 w-full mt-2 text-sm font-semibold">
                                <div className="relative w-full">
                                    <span className="absolute left-0 -translate-x-1/2">0</span>
                                    <span
                                        className="absolute -translate-x-1/2 text-red-500"
                                        style={{ left: `${getPercent(optimalStart)}%` }}
                                    >
                                        {optimalStart}
                                    </span>
                                    <span
                                        className="absolute -translate-x-1/2 text-red-500"
                                        style={{ left: `${getPercent(optimalEnd)}%` }}
                                    >
                                        {optimalEnd}
                                    </span>
                                    <span className="absolute left-full -translate-x-1/2">50</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                        <CircularProgress percentage={soilMoisture} label="Độ ẩm đất" color="red-500" />
                        <CircularProgress percentage={airHumidity} label="Độ ẩm không khí" color="green-700" />
                        <CircularProgress percentage={lightIntensity} label="Cường độ ánh sáng" color="green-700" />
                    </div>

                    <div className="flex justify-center mt-[112px]">
                        <button className="bg-green-400 text-black font-bold py-3 px-8 rounded-full hover:bg-green-500 transition">
                            Điều chỉnh
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-8 w-full md:w-1/3">
                    <div>
                        <h2 className="text-center text-xl font-bold mb-2">Khoảng thuận lợi</h2>
                        <div className="grid grid-cols-2 text-center text-sm font-semibold rounded-2xl overflow-hidden shadow-md">
                            <div className="bg-green-100 p-4">
                                <div className="font-bold relative">
                                    <span className="relative z-10">Nhiệt độ</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className="mt-1 text-lg font-bold">20°C - 30°C</div>
                            </div>
                            <div className="bg-green-200 p-4">
                                <div className="font-bold relative">
                                    <span className="relative z-10">Độ ẩm đất</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className="mt-1 text-lg font-bold">40% - 60%</div>
                            </div>
                            <div className="bg-green-200 p-4">
                                <div className="font-bold relative">
                                    <span className="relative z-10">Độ ẩm không khí</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className="mt-1 text-lg font-bold">40% - 60%</div>
                            </div>
                            <div className="bg-green-300 p-4">
                                <div className="font-bold relative">
                                    <span className="relative z-10">Cường độ ánh sáng</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className="mt-1 text-lg font-bold">30% - 40%</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-center text-xl font-bold mb-2 text-green-700">Trạng thái hiện tại</h2>
                        <div className="grid grid-cols-2 text-center text-sm font-semibold rounded-2xl overflow-hidden shadow-md">
                            <div className="bg-cyan-100 p-4">
                                <div className="font-bold relative">
                                    <span className="relative z-10">Nhiệt độ</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className="mt-1 text-lg font-bold">{temperature}°C</div>
                            </div>
                            <div className="bg-cyan-200 p-4">
                                <div className="font-bold relative">
                                    <span className="relative z-10">Độ ẩm đất</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className={`mt-1 text-lg font-bold ${soilMoisture > 60 ? 'text-red-500' : ''}`}>
                                    {soilMoisture}%
                                </div>
                            </div>
                            <div className="bg-cyan-200 p-4">
                                <div className="font-bold relative">
                                    <span className="relative z-10">Độ ẩm không khí</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className="mt-1 text-lg font-bold">{airHumidity}%</div>
                            </div>
                            <div className="bg-cyan-300 p-4">
                                <div className="font-bold relative">
                                    <span className="relative z-10">Cường độ ánh sáng</span>
                                    <span className="absolute left-0 right-0 bottom-[-3px] h-[1.5px] bg-black"></span>
                                </div>
                                <div className="mt-1 text-lg font-bold">{lightIntensity}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;

import React, { useEffect, useState } from "react";
import ProgressChart from "../ProgressChart";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import mqtt from 'mqtt';
const iokey = import.meta.env.VITE_ADAFRUIT_IO_KEY;
const iouser = import.meta.env.VITE_ADAFRUIT_IO_USER;

const Statistic = () => {






    const [client, setClient] = useState(null);

    const AIO_USERNAME = 'sonwoang';           // 🔁 Đổi thành username của bạn
    const AIO_KEY = iokey;     // 🔁 Đổi thành AIO Key
    const FEED_NAME = iouser;

    useEffect(() => {
        const options = {
            clientId: `react_mqtt_${Math.random().toString(16).substr(2, 8)}`,
            username: AIO_USERNAME,
            password: AIO_KEY,
            connectTimeout: 4000,
            reconnectPeriod: 1000,
        };

        const mqttUrl = 'wss://io.adafruit.com:443/mqtt';
        const mqttClient = mqtt.connect(mqttUrl, options);

        //   mqttClient.on('connect', () => {
        //     console.log('✅ Kết nối Adafruit MQTT thành công');

        //     // Sub để lắng nghe phản hồi (nếu cần)
        //     mqttClient.subscribe(`${AIO_USERNAME}/feeds/${FEED_NAME}`);
        //   });

        //   mqttClient.on('error', (err) => {
        //     console.error('❌ MQTT lỗi:', err);
        //   });

        //   mqttClient.on('message', (topic, message) => {
        //     console.log('📥 Nhận từ Adafruit:', topic, message.toString());
        //     setStatus(parseInt(message.toString()));
        //   });

        setClient(mqttClient);

        return () => {
            mqttClient.end();
        };
    }, []);
    //  qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq




    const handleToggleBumb = () => {
        var newValue;
        if (bumb === "1") {
            newValue = 0
        }
        else {
            newValue = 1
        }


        // if (newValue) {
        //     newValue = 1
        //     setBumb(String(newValue));
        //     console.log("bumb", bumb,newValue,String(newValue));
        // }
        // else {
        //     newValue = 0
        //     setBumb(String(newValue));
        //     console.log("bumb", bumb,newValue,String(newValue));
        // }
        if (client) {
            client.publish(`${AIO_USERNAME}/feeds/${FEED_NAME}`, String(newValue));
            setBumb(String(newValue));
            console.log('📤 Đã gửi bumb:', newValue);
        }
        // setBumb(String(newValue));

    };

    const handleToggleLed = () => {
        var newValue;
        if (led === "1") {
            newValue = 0
        }
        else {
            newValue = 1
        }
        if (client) {
            client.publish(`${AIO_USERNAME}/feeds/V11`, String(newValue));
            setLed(String(newValue));
            console.log('📤 Đã gửi:', newValue);
        }
        // setLed(!led);
    };
    const [light, setLight] = useState(0);
    const [sold, setSold] = useState(0);
    const [air, setAir] = useState(0);
    const [tem, setTem] = useState(0);
    const [led, setLed] = useState(0);
    const [bumb, setBumb] = useState(0);
    useEffect(() => {
        const fetchLight = async () => {
            try {
                const response = await axios.get("https://io.adafruit.com/api/v2/sonwoang/feeds/v4");
                setLight(response.data.last_value)
            } catch (error) {
                console.error("Lỗi gọi API:", error);
            }
        };

        fetchLight();
        const fetchSold = async () => {
            try {
                const response = await axios.get("https://io.adafruit.com/api/v2/sonwoang/feeds/v3");
                setSold(response.data.last_value)
            } catch (error) {
                console.error("Lỗi gọi API:", error);
            }
        };

        fetchSold();
        const fetchAir = async () => {
            try {
                const response = await axios.get("https://io.adafruit.com/api/v2/sonwoang/feeds/v2");
                setAir(response.data.last_value)
            } catch (error) {
                console.error("Lỗi gọi API:", error);
            }
        };

        fetchAir();
        const fetchTem = async () => {
            try {
                const response = await axios.get("https://io.adafruit.com/api/v2/sonwoang/feeds/v1");
                setTem(response.data.last_value)
            } catch (error) {
                console.error("Lỗi gọi API:", error);
            }
        };

        fetchTem();
        const fetchLed = async () => {
            try {
                const response = await axios.get("https://io.adafruit.com/api/v2/sonwoang/feeds/v11");
                setLed(response.data.last_value)
            } catch (error) {
                console.error("Lỗi gọi API:", error);
            }
        };

        fetchLed();
        const fetchBumb = async () => {
            try {
                const response = await axios.get("https://io.adafruit.com/api/v2/sonwoang/feeds/v10");
                setBumb(response.data.last_value)
            } catch (error) {
                console.error("Lỗi gọi API:", error);
            }
        };

        fetchBumb();

        // Gọi sau mỗi 60 giây
        const interval = setInterval(() => {
            fetchAir();
            fetchBumb();
            fetchLed();
            fetchLight();
            fetchSold();
            fetchTem();
        }, 5000); // 10000ms = 10s
        // 60000ms = 60s

        // Clear interval khi component unmount
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex justify-around items-center flex-1 h-[100%] max-w-[calc(100%-333px)] w-[calc(100%-333px)]">
            <div className="flex flex-col justify-center items-center w-[90%] h-full p-[20px] gap-[100px]">
                <div className="flex justify-center w-full h-[30%] gap-[50px]">
                    <div className="text-center flex flex-col items-center justify-center text-white bg-[#4FC3F7] p-5 rounded-lg w-[500px] ">
                        <h3 className="text-[40px] font-semibold">Nhiệt độ</h3>
                        <p className="text-[40px] font-bold">{tem}°C</p>
                    </div>
                    <div className="text-center flex flex-col items-center justify-center text-white bg-[#FFB74D] p-5 rounded-lg w-[500px]">
                        <h3 className="text-[40px] font-semibold">Độ ẩm</h3>
                        <p className="text-[40px] font-bold">{air} %</p>
                    </div>
                    <div className="text-center flex flex-col items-center justify-center text-white bg-[#455A64] p-5 rounded-lg w-[500px]">
                        <h3 className="text-lg font-semibold">Máy Bơm</h3>
                        <label
                            class="group relative inline-flex cursor-pointer flex-col items-center"
                        >
                            <input class="peer sr-only" type="checkbox" checked={bumb === "1"} onChange={handleToggleBumb} />
                            <div
                                class="relative h-12 w-24 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] transition-all duration-500 after:absolute after:left-1 after:top-1 after:h-10 after:w-10 after:rounded-full after:bg-gradient-to-br after:from-gray-100 after:to-gray-300 after:shadow-[2px_2px_8px_rgba(0,0,0,0.3)] after:transition-all after:duration-500 peer-checked:bg-gradient-to-r peer-checked:from-white peer-checked:to-white peer-checked:after:translate-x-12 peer-checked:after:from-white peer-checked:after:to-gray-100 hover:after:scale-95 active:after:scale-90"
                            >
                                <span
                                    class="absolute inset-1 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent"
                                ></span>

                                <span
                                    class="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 peer-checked:animate-glow peer-checked:opacity-100 [box-shadow:0_0_15px_rgba(167,139,250,0.5)]"
                                ></span>
                            </div>

                        </label>
                    </div>
                </div>
                <div className="flex justify-center w-full h-[30%] gap-[50px]">
                    <div className="text-center flex flex-col items-center justify-center text-white bg-[#f56161] p-5 rounded-lg w-[500px]">
                        <h3 className="text-[40px] font-semibold">Ánh sáng</h3>
                        <p className="text-[40px] font-bold">{light} %</p>
                    </div>
                    <div className="text-center flex flex-col items-center justify-center text-white bg-[#81C784] p-5 rounded-lg w-[500px]">
                        <h3 className="text-[40px] font-semibold">Độ ẩm đất</h3>
                        <p className="text-[40px] font-bold">{sold}%</p>
                    </div>
                    <div className="text-center flex flex-col items-center justify-center text-white bg-[#7986CB] p-5 rounded-lg w-[500px]">
                        <h3 className="text-lg font-semibold">Đèn led</h3>
                        <label
                            class="group relative inline-flex cursor-pointer flex-col items-center"
                        >
                            <input className="peer sr-only" type="checkbox" checked={led === "1"} onChange={handleToggleLed} />
                            <div
                                class="relative h-12 w-24 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] transition-all duration-500 after:absolute after:left-1 after:top-1 after:h-10 after:w-10 after:rounded-full after:bg-gradient-to-br after:from-gray-100 after:to-gray-300 after:shadow-[2px_2px_8px_rgba(0,0,0,0.3)] after:transition-all after:duration-500 peer-checked:bg-gradient-to-r peer-checked:from-white peer-checked:to-white peer-checked:after:translate-x-12 peer-checked:after:from-white peer-checked:after:to-gray-100 hover:after:scale-95 active:after:scale-90"
                            >
                                <span
                                    class="absolute inset-1 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent"
                                ></span>

                                <span
                                    class="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 peer-checked:animate-glow peer-checked:opacity-100 [box-shadow:0_0_15px_rgba(167,139,250,0.5)]"
                                ></span>
                            </div>

                        </label>
                    </div>
                </div>
            </div>


            {/* <label style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                    <input type="checkbox" checked={isOn} onChange={handleToggle} />
                    <span>{isOn ? "BẬT" : "TẮT"}</span>
                </label> */}




        </div>
    );
};

export default Statistic;
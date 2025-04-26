import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from 'recharts';

const temperatureData = [
    { date: '8/3', temperature: 26 },
    { date: '9/3', temperature: 35 },
    { date: '10/3', temperature: 22 },
    { date: '11/3', temperature: 38 },
    { date: '12/3', temperature: 25 },
    { date: '13/3', temperature: 32 },
    { date: '14/3', temperature: 28 },
];

const humidityLightData = [
    { date: '8/3', humidity: 50, soilMoisture: 45, lightIntensity: 55 },
    { date: '9/3', humidity: 60, soilMoisture: 50, lightIntensity: 70 },
    { date: '10/3', humidity: 55, soilMoisture: 48, lightIntensity: 65 },
    { date: '11/3', humidity: 62, soilMoisture: 52, lightIntensity: 72 },
    { date: '12/3', humidity: 58, soilMoisture: 47, lightIntensity: 67 },
    { date: '13/3', humidity: 65, soilMoisture: 55, lightIntensity: 80 },
    { date: '14/3', humidity: 60, soilMoisture: 50, lightIntensity: 68 },
];

const Statistic = () => {
    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl w-full min-w-[900px] max-w-[1400px] mx-auto">
            {/* Biểu đồ nhiệt độ */}
            <div className="flex-1 bg-green-50 rounded-xl p-4 shadow-md relative">
                {/* Tiêu đề */}
                <div className="mb-4 flex items-center justify-center relative">
                    <h2 className="text-lg font-bold text-green-700 text-center">
                        NHIỆT ĐỘ (°C)
                    </h2>
                    <span className="absolute right-0 text-sm text-green-400">2025</span>
                </div>

                {/* Biểu đồ */}
                <ResponsiveContainer width="100%" height={600}>
                    <LineChart data={temperatureData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#c6f6d5" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="linear"
                            dataKey="temperature"
                            stroke="#047857"
                            strokeWidth={3}
                            dot={{ r: 4, stroke: '#047857', strokeWidth: 2, fill: '#bbf7d0' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Biểu đồ độ ẩm & ánh sáng */}
            <div className="flex-1 bg-green-50 rounded-xl p-4 shadow-md relative">
                {/* Tiêu đề */}
                <div className="mb-4 flex items-center justify-center relative">
                    <h2 className="text-lg font-bold text-green-700 text-center">
                        ĐỘ ẨM KHÔNG KHÍ, ĐẤT, CƯỜNG ĐỘ ÁNH SÁNG
                    </h2>
                    <span className="absolute right-0 text-sm text-green-400">2025</span>
                </div>

                {/* Biểu đồ */}
                <ResponsiveContainer width="100%" height={600}>
                    <BarChart
                        data={humidityLightData}
                        barGap={0}
                        barCategoryGap="5%"
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#c6f6d5" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="humidity" fill="#047857" name="Không khí" />
                        <Bar dataKey="soilMoisture" fill="#10b981" name="Đất" />
                        <Bar dataKey="lightIntensity" fill="#6ee7b7" name="Ánh sáng" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Statistic;

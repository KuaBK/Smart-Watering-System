

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
const Card = ({ name }) => {
    return (
        <div className="bg-white py-[5px] px-[10px] w-fit text-[30px] font-[400] border border-black ">
            {name}
        </div>
    )
}
const CardOption = ({ name, active, onClick }) => {
    return (
        <div
            className={`bg-white py-[5px] px-[10px] w-fit text-[30px] font-[400] border border-black ${active ? 'border-[#72f588] ' : ''}`}
            onClick={() => onClick(name)}
        >
            {name}
        </div>
    );
};
const FarmDetail = () => {
    const { idGarden } = useParams();
    const navigate = useNavigate();
    const handleNaviOver = () => {

        navigate('/admin/garden/overview');
    }
    const [listEmpOut,setListEmpOut] = useState([]);
    const [employeeSelect, setEmploySelect] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState(listEmpOut);
    const [infoGarden,setInfoGarden] = useState();

    // Tạo một hàm để handle việc thay đổi tìm kiếm
    const handleSearchChange = (e) => {
        setEmploySelect(e.target.value);
        setSearchQuery(e.target.value);
    };

    // Hàm onClick cho việc thay đổi nhân viên đã chọn
    const handleEmployeeSelect = (name) => {
        setEmploySelect(name);
    };
    const handleAddEmployee = async () => {
        // try {
        //     const response = await axios.post(`${API_BE}/farm/${idGarden}/add/${idEmp}`, {
        //         headers: { Authorization: `Bearer ${token}` },
        //     });
        //     // Cập nhật lại danh sách nhân viên
        //     setInfoGarden(prev => ({
        //         ...prev,
        //         employee: [...prev.employee, { employeeName: employeeSelect }]
        //     }));
        //     setEmploySelect('');
        // } catch (error) {
        //     console.error("Lỗi thêm nhân viên:", error);
        // }
        console.log(employeeSelect)
    };
    
    useEffect(() => {
        // Chỉ thực hiện tìm kiếm sau 10s khi người dùng ngừng gõ
        const timer = setTimeout(() => {
            if (searchQuery) {
                const filtered = listEmpOut.filter((item) =>
                    item.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilteredEmployees(filtered);
            } else {
                setFilteredEmployees(listEmpOut);
            }
        }, 300); // 0.3 giây debounce

        // Cleanup function để clear timeout nếu người dùng nhập thêm
        return () => clearTimeout(timer);
    }, [searchQuery]);
    const token = localStorage.getItem("jwtToken");
    useEffect(() => {
        const fetchGarden = async () => {
            try {
                const response = await axios.get(`${API_BE}/farm/${idGarden}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setInfoGarden(response.data.result)
            } catch (error) {
                console.error("Lỗi gọi API:", error);
            }
        };
        fetchGarden();
        const fetchListEmp = async () => {
            try {
                const response = await axios.get(`${API_BE}/farm/${idGarden}/outsiders`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response);
                setListEmpOut(response.data.result)
            } catch (error) {
                console.error("Lỗi gọi API:", error);
            }
        };
        fetchListEmp();
    }, []);
    useEffect(() => {
        setFilteredEmployees(listEmpOut);
    }, [listEmpOut]);
    
    return (
        <div className="bg-white flex-1 px-[40px] py-[30px] box-border max-h-[100%] overflow-y-auto w-[100%] ">
            <div className="h-[100%] flex flex-col">
                <h1 className="text-[50px] font-bold mb-4 text-start ">Khu vườn {infoGarden?.name}</h1>
                <div className="flex-1 flex flex-wrap gap-8">
                    {/* Left Section */}
                    <div className="basis-[100%] md:basis-[calc(70%-1rem)] bg-green-100 py-[35px] px-[30px] rounded-lg flex flex-col items-start ">
                        <h2 className="font-bold text-[30px] mb-2">Khu vườn {infoGarden?.name}</h2>
                        <p className="text-[30px] font-[400] text-start">
                            {infoGarden?.location}
                        </p>
                        <div className="mt-4">
                            <h2 className="font-bold text-[30px] mb-2 text-start">Nhân viên quản lý</h2>
                            <div className="flex gap-[10px] flex-wrap ">
                                {infoGarden?.employee?.map((item, index) => (
                                    <div key={index}>
                                        <Card name={item.employeeName} />

                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 w-full">
                            <h2 className="font-bold text-[30px] mb-2 text-start">Thêm nhân viên quản lý</h2>
                            <div className="flex gap-[20px] mb-6">
                                <div className="flex-1">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            onChange={handleSearchChange}
                                            value={employeeSelect}
                                            placeholder="Tìm kiếm nhân viên"
                                            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                        <svg
                                            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-4.35-4.35M16.65 10.35a6.3 6.3 0 11-12.6 0 6.3 6.3 0 0112.6 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <button onClick={handleAddEmployee} className="bg-green-500 text-white px-6 py-auto rounded-md hover:bg-green-600 transition h-[42px] ">
                                    Thêm nhân viên
                                </button>

                            </div>
                            <div className="flex gap-[10px] flex-wrap h-[180px] overflow-auto">
                                {filteredEmployees?.map((item, index) => (
                                    <div key={index}>
                                        <CardOption name={item} active={item === employeeSelect} onClick={handleEmployeeSelect} />

                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Section */}
                    <div className="basis-full md:basis-[calc(30%-1rem)] flex flex-col gap-8">
                        <div className="bg-green-100 p-6 rounded-lg md:basis-[calc(60%-1rem)]">
                            <h2 className="font-bold text-[30px] text-start mb-2">Chủ khu vườn</h2>
                            <p className="font-[400] text-[30px] text-start ">{infoGarden?.ownerName}</p>
                            <p className="font-[400] text-[30px] text-start ">{infoGarden?.ownerAddress}</p>
                            <p className="font-[400] text-[30px] text-start ">{infoGarden?.ownerPhoneNumber}</p>
                        </div>
                        <div className="bg-green-100 p-6 rounded-lg md:basis-[calc(40%-1rem)]">
                            <h2 className="font-bold text-[30px] text-start mb-2">Thời gian bắt đầu quản lý</h2>
                            <p className="font-[400] text-[30px] text-start ">{dayjs((infoGarden?.startDate), "HH:mm:ss DD-MM-YYYY").format("HH[h] ngày DD/MM/YYYY")}</p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center mt-6 space-x-10">
                    <button className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition">
                        Xóa
                    </button>
                    <button onClick={handleNaviOver} className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition">
                        Trở lại
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FarmDetail;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CardOption = ({ name, active, onName, onId }) => {
    return (
        <div
            onClick={() => {
                onName(name.email);
                onId(name.id);
            }}
            className={`px-4 py-2 border rounded-md cursor-pointer ${active ? 'bg-green-300' : 'bg-white'}`}
        >
            {name.email}
        </div>
    );
};


const AddGarden = () => {
    const navigate = useNavigate();
    const [nameGarden, setNameGarden] = useState();
    const [locationGarden, setLocationGarden] = useState();
    const [listEmpOut, setListEmpOut] = useState([]);
    const [employeeSelect, setEmploySelect] = useState('');
    const [employeeSelectId, setEmploySelectId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState(listEmpOut);

    // Tạo một hàm để handle việc thay đổi tìm kiếm
    const handleSearchChange = (e) => {
        setEmploySelect(e.target.value);
        setSearchQuery(e.target.value);
    };

    // Hàm onClick cho việc thay đổi nhân viên đã chọn
    const handleEmployeeSelect = (name) => {
        setEmploySelect(name);
    };
    const handleEmployeeSelectId = (name) => {
        setEmploySelectId(name);
    };

    const handleNaviOver = () => {
        navigate('/admin/garden/overview');
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery) {
                const filtered = listEmpOut.filter((item) =>
                    item.email.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setFilteredEmployees(filtered);
            } else {
                setFilteredEmployees(listEmpOut);
            }
        }, 300); // 0.3 giây debounce

        // Cleanup function để clear timeout nếu người dùng nhập thêm
        return () => clearTimeout(timer);
    }, [searchQuery]);
    useEffect(() => {
        setFilteredEmployees(listEmpOut);
    }, [listEmpOut]);
    const token = localStorage.getItem("jwtToken");
    useEffect(() => {
        const fetchListEmp = async () => {
            try {
                const response = await axios.get(`${API_BE}/account`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setListEmpOut(response.data.result)
            } catch (error) {
                console.error("Lỗi gọi API:", error);
            }
        };
        fetchListEmp();
    }, []);
    const handleAddFarm = async () => {
        const data = {
            name: nameGarden,
            location: locationGarden,
            ownerId: employeeSelectId
        }
        console.log(data);
        try {
            Swal.fire({
                title: 'Đang thêm nhân viên...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            const response = await axios.post(`${API_BE}/farm`, data , {
                headers: { Authorization: `Bearer ${token}` },
            });

            Swal.fire({
                icon: 'success',
                title: 'Đã thêm khu vườn thành công!',
                showConfirmButton: false,
                timer: 1500
            });
            handleNaviOver();


        } catch (error) {
            console.error("Lỗi thêm nhân viên:", error);

            Swal.fire({
                icon: 'error',
                title: 'Lỗi khi thêm khu vườn!',
                text: error?.response?.data?.message || 'Đã có lỗi xảy ra',
            });
        }
    };
    return (
        <div className="bg-white flex-1 px-[80px] pt-[40px] box-border max-h-[100%] overflow-y-auto ">
            <div className="text-[32px] text-start font-bold mb-6">Thêm khu vườn mới</div>
            <div className="grid grid-cols-1 gap-6">
                {/* Basic Information */}
                <div className=" bg-green-100 p-6 rounded-lg">
                    <h2 className="font-bold text-[30px] text-start mb-4">Thông tin cơ bản</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="col-span-2">
                            <label className="block font-[600] text-[25px] text-start ">Tên khu vườn</label>
                            <input
                                type="text"
                                onChange={(e) => setNameGarden(e.target.value)}
                                value={nameGarden}
                                placeholder="Nhập tên khu vườn"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block font-[600] text-[25px] text-start ">Địa chỉ</label>
                            <input
                                type="text"
                                onChange={(e) => setLocationGarden(e.target.value)}
                                value={locationGarden}
                                placeholder="Nhập địa chỉ cụ thể"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                </div>


                {/* Owner Information */}
                <div className="bg-green-100 py-4 px-6 rounded-lg">
                    <h2 className="font-bold text-[30px] mb-2 text-start">Chủ khu vườn</h2>
                    <div className="flex gap-[20px] mb-6">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleSearchChange}
                                    value={employeeSelect}
                                    placeholder="Tìm kiếm ..."
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
                        {/* <button onClick={handleAddEmployee} className="bg-green-500 text-white px-6 py-auto rounded-md hover:bg-green-600 transition h-[42px] ">
                            Chọn
                        </button> */}

                    </div>
                    <div className="flex gap-[10px] flex-wrap h-[150px] overflow-auto">
                        {filteredEmployees?.map((item) => (
                            <div key={item.id}>
                                <CardOption name={item} active={item.email === employeeSelect} onName={handleEmployeeSelect} onId={handleEmployeeSelectId} />

                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between mt-6">
                <button onClick={handleNaviOver} className="bg-green-500 text-[20px] font-[400] text-white px-6 py-3 rounded-md hover:bg-green-600 transition">
                    Trở về
                </button>
                <button onClick={handleAddFarm} className="bg-green-500 text-[20px] font-[400] text-white px-6 py-3 rounded-md hover:bg-green-600 transition">
                    Thêm
                </button>
            </div>
        </div>
    );
};

export default AddGarden;
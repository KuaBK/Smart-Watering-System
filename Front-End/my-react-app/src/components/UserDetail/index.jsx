import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const garden = [
    { id: 1, name: "Khu vườn Ánh Dương", startDate: "2023-03-15" },
    { id: 2, name: "Khu vườn Bình Minh", startDate: "2023-05-20" },
];
const UserDetail = () => {
    const [gardens, setGarden] = useState(garden);
    const [info, setInfo] = useState({
        id: "0f7a89ea-75ac-4381-b42a-fb201862c193",
        email: "test@gmail.com",
        firstName: "A",
        lastName: "Nguyễn Văn",
        phoneNumber: "0944102241",
        picture: null,
        role: "FARMER"
    });

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const { iduser } = useParams();
    const navigate = useNavigate();
    const handleNaviOver = () => {

        navigate('/admin/user/overview');
    }
    const [isEditing, setIsEditing] = useState(false);
    const toggleEditMode = () => {
        if (isEditing) {
            updateInfoUser();
        }
        setIsEditing(!isEditing);
    };
    const token = localStorage.getItem("jwtToken");
    useEffect(() => {
        const fecthFarmer = async () => {
            try {
                const response = await axios.get(`${API_BE}/account/${iduser}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setInfo(response.data.result);
                setName(response.data.result.lastName + " " + response.data.result.firstName);
                setPhone(response.data.result.phoneNumber);
                setEmail(response.data.result.email);
                setAddress(response.data.result.address);
                // setAddress(response.data.result.address);
            } catch (error) {
                console.error("Lỗi gọi API:", error);
            }
        };
        fecthFarmer();
        const fetchListGarden = async () => {
            try {
              const response = await axios.get(`${API_BE}/account/employee/${iduser}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              setGarden(response.data)
            } catch (error) {
              console.error("Lỗi gọi API:", error);
            }
          };
          fetchListGarden();
    }, []);
    function splitFullName(fullName) {
        if (!fullName || typeof fullName !== 'string') {
            return { firstName: '', lastName: '' };
        }

        const parts = fullName.trim().split(/\s+/); // Tách bằng khoảng trắng
        const firstName = parts.pop();              // Tên là phần cuối
        const lastName = parts.join(' ');           // Họ và tên đệm là phần còn lại

        return { firstName, lastName };
    }
    const updateInfoUser = async () => {
        const { firstName, lastName } = splitFullName(name);
        const data = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phone,
            email: email,
            address: address
        };
        try {
            const response = await axios.patch(`${API_BE}/account/${iduser}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công',
                text: 'Thông tin người dùng đã được cập nhật!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    }



    return (
        <div className="bg-white flex-1 px-[80px] pt-[40px] box-border max-h-[calc(100vh-91px)] overflow-y-auto">
            <div className="text-[32px] text-start font-bold mb-6">{name}</div>
            <div className="flex flex-col gap-6 flex-1">
                {/* Basic Information */}
                <div className=" bg-green-100 p-6 rounded-lg">
                    <div className="flex justify-between">
                        <h2 className="font-bold text-[30px] text-start mb-4">Thông tin cá nhân</h2>

                        <button onClick={toggleEditMode} className="bg-transparent h-[45px] text-black px-4 py-2 border border-black text-[15px] font-[600] hover:bg-green-300">
                            Chỉnh sửa
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-[600] text-[25px] text-start ">Họ và tên</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isEditing}
                                placeholder="Nhập tên nhân viên"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block font-[600] text-[25px] text-start ">Số điện thoại</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={!isEditing}
                                placeholder="Nhập số điện thoại"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block font-[600] text-[25px] text-start ">Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!isEditing}
                                placeholder="Nhập email"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="col-span-3">
                            <label className="block font-[600] text-[25px] text-start ">Địa chỉ</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                disabled={!isEditing}
                                placeholder="Nhập địa chỉ cụ thể"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                </div>


                {/* Owner Information */}
                <div className="h-[300px] overflow-y-auto bg-green-100  px-[10px] rounded-lg">
                    <table className="w-full ">
                        <thead className="sticky top-0 bg-green-100 h-[60px] border-b-2 border-black ">
                            <tr>
                                <th className="font-[700] text-[30px] ">Khu vườn đang quản lý</th>
                                <th className="font-[700] text-[30px] ">Thời gian bắt đầu quản lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gardens?.map((item,index) => (
                                <tr key={index} className="h-[50px] border-b border-black " >
                                    <td className="text-[25px] font[400] ">{item.farmName}</td>
                                    <td className="text-[25px] font[400] ">{item.startWorkingDate}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start my-[20px]">
                <button onClick={handleNaviOver} className="bg-green-500 text-[20px] font-[400] text-white px-6 py-3 rounded-md hover:bg-green-600 transition">
                    Trở về
                </button>
                {/* <button className="bg-green-500 text-[20px] font-[400] text-white px-6 py-3 rounded-md hover:bg-green-600 transition">
                    Thêm
                </button> */}
            </div>
        </div>
    );
};

export default UserDetail;
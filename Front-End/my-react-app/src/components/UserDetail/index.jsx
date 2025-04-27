import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetail = () => {
    const navigate = useNavigate();
    const handleNaviOver = () => {

        navigate('/admin/user/overview');
    }
    const [isEditing, setIsEditing] = useState(false);
    const toggleEditMode = () => {

        setIsEditing(!isEditing);
    };
    const gardens = [
        { id: 1, name: "Khu vườn Ánh Dương", startDate: "2023-03-15" },
        { id: 2, name: "Khu vườn Bình Minh", startDate: "2023-05-20" },
        { id: 3, name: "Khu vườn Hương Quê", startDate: "2023-07-10" },
        { id: 4, name: "Khu vườn Mùa Thu", startDate: "2023-09-05" },
        { id: 5, name: "Khu vườn Trăng Rằm", startDate: "2023-11-12" },
        { id: 6, name: "Khu vườn Gió Mát", startDate: "2024-01-01" },
        { id: 7, name: "Khu vườn Mặt Trời", startDate: "2024-03-08" },
        { id: 8, name: "Khu vườn Sương Sớm", startDate: "2024-05-17" },
        { id: 9, name: "Khu vườn Bình Yên", startDate: "2024-07-22" },
        { id: 10, name: "Khu vườn Xanh Mát", startDate: "2024-09-30" }
      ];
      
    return (
        <div className="bg-white flex-1 px-[80px] pt-[40px] box-border max-h-[calc(100vh-91px)] overflow-y-auto">
            <div className="text-[32px] text-start font-bold mb-6">Quốc Á Võ</div>
            <div className="flex flex-col gap-6 flex-1">
                {/* Basic Information */}
                <div className=" bg-green-100 p-6 rounded-lg">
                    <div className="flex justify-between">
                        <h2 className="font-bold text-[30px] text-start mb-4">Thông tin cá nhân</h2>

                        <button onClick={toggleEditMode} className="bg-transparent h-[45px] text-black px-4 py-2 border border-black text-[15px] font-[600] hover:bg-green-600">
                            Chỉnh sửa
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-[600] text-[25px] text-start ">Họ và tên</label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                placeholder="Nhập tên khu vườn"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block font-[600] text-[25px] text-start ">Số điện thoại</label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                placeholder="Nhập số điện thoại"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block font-[600] text-[25px] text-start ">Email</label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                placeholder="Nhập email"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="col-span-3">
                            <label className="block font-[600] text-[25px] text-start ">Địa chỉ</label>
                            <input
                                type="text"
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
                            {gardens.map((item)=>(
                                <tr key={item.id} className="h-[50px] border-b border-black " >
                                    <td className="text-[25px] font[400] ">{item.name}</td>
                                    <td className="text-[25px] font[400] ">{item.startDate}</td>
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
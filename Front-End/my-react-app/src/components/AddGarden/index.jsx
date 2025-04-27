import React from "react";
import { useNavigate } from "react-router-dom";

const AddGarden = () => {
    const navigate = useNavigate();
    const handleNaviOver = () =>{

        navigate('/admin/garden/overview');
    }
    return (
        <div className="bg-white flex-1 px-[80px] pt-[40px] box-border max-h-[100%] overflow-y-auto ">
            <div className="text-[32px] text-start font-bold mb-6">Thêm khu vườn mới</div>
            <div className="grid grid-cols-1 gap-6">
                {/* Basic Information */}
                <div className=" bg-green-100 p-6 rounded-lg">
                    <h2 className="font-bold text-[30px] text-start mb-4">Thông tin cơ bản</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block font-[600] text-[25px] text-start ">Tên khu vườn</label>
                            <input
                                type="text"
                                placeholder="Nhập tên khu vườn"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block font-[600] text-[25px] text-start ">Địa chỉ</label>
                            <input
                                type="text"
                                placeholder="Nhập địa chỉ cụ thể"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                </div>


                {/* Owner Information */}
                <div className=" bg-green-100 p-6 rounded-lg">
                    <h2 className="font-bold text-[30px] text-start mb-4">Thông tin chủ khu vườn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-[600] text-[25px] text-start ">Họ và tên</label>
                            <input
                                type="text"
                                placeholder="Nhập họ và tên"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block font-[600] text-[25px] text-start ">Gmail</label>
                            <input
                                type="email"
                                placeholder="Nhập gmail"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block font-[600] text-[25px] text-start ">Số điện thoại</label>
                            <input
                                type="text"
                                placeholder="Nhập số điện thoại"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block font-[600] text-[25px] text-start ">Địa chỉ</label>
                            <input
                                type="text"
                                placeholder="Nhập địa chỉ cụ thể"
                                className="w-full p-2 border border-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between mt-6">
                <button onClick={handleNaviOver} className="bg-green-500 text-[20px] font-[400] text-white px-6 py-3 rounded-md hover:bg-green-600 transition">
                    Trở về
                </button>
                <button className="bg-green-500 text-[20px] font-[400] text-white px-6 py-3 rounded-md hover:bg-green-600 transition">
                    Thêm
                </button>
            </div>
        </div>
    );
};

export default AddGarden;
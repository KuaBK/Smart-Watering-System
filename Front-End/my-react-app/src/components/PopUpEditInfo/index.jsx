import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditProfileModal({ id, isOpen, onClose }) {

    const [user, setUser] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };
    const [edit,setEdit] = useState(false);

    const token = localStorage.getItem('jwtToken');
    const handleSave = async () => {
        const body = {
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            email: user.email
        }
        try {
            Swal.fire({
                title: 'Đang tải trạng thái hệ thống...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            const response = await axios.patch(`${API_BE}/account/${id}`, body, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.status)
            if (response.status === 200) {
            console.log(response.status)
                Swal.close();
                Swal.fire({
                    title: "Thay đổi thông tin thành công!",
                    icon: "success",
                });
            } else {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Thay đổi thông tin thất bại!"
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi tải trạng thái!',
                text: 'Không thể kết nối tới máy chủ.',
            });
            console.error("Lỗi gọi API:", error);
        }
        setEdit(false);
        onClose();
    };
    const onClosea = ()=>{
        setEdit(false);
        onClose();
    }
    useEffect(() => {
        const fetchListFarm = async () => {
            try {
                const response = await axios.get(`${API_BE}/account/myInfo`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data.result);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi tải trạng thái!',
                    text: 'Không thể kết nối tới máy chủ.',
                });
                console.error("Lỗi gọi API:", error);
            }
        };
        fetchListFarm();
    }, [])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="w-full max-w-[70%] p-6 bg-[rgb(223,239,226)] shadow-xl rounded-2xl">
                <h2 className="mb-4 text-xl font-bold">{edit?'Chỉnh sửa thông tin cá nhân':'Thông tin cá nhân'}</h2>

                <div className="grid gap-4 text-start">
                    <div className="flex gap-4">
                        <div className="w-[50%]">
                            <label className="block font-medium">Họ</label>
                            <input
                                type="text"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                                disabled = {!edit}
                                className="w-full p-2 border border-black rounded-md"
                            />
                        </div>
                        <div className="w-[50%]">
                            <label className="block font-medium">Tên</label>
                            <input
                                type="text"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                                disabled = {!edit}
                                className="w-full p-2 border border-black rounded-md"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            disabled= {true}
                            className="w-full p-2 border border-black rounded-md"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="w-[50%]">
                            <label className="block font-medium">Số điện thoại</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={user.phoneNumber}
                                onChange={handleChange}
                                disabled = {!edit}
                                className="w-full p-2 border border-black rounded-md"
                            />
                        </div>
                        <div className="w-[50%]">
                            <label className="block font-medium">Vai trò</label>
                            <input
                                type="text"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                disabled= {true}
                                className="w-full p-2 border border-black rounded-md"
                            />
                        </div>

                    </div>
                    <div>
                        <label className="block font-medium">Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            disabled = {!edit}
                            className="w-full p-2 border border-black rounded-md"
                        />
                    </div>
                </div>

                <div className="flex justify-between gap-2 mt-6">
                    <button onClick={onClosea} className="px-4 py-2 bg-[#87FFA7] text-[20px] font-[500] rounded-md">Hủy</button>
                    {edit && <button onClick={handleSave} className="px-4 py-2 text-black bg-[#87FFA7] text-[20px] font-[500] rounded-md">Lưu</button>}
                    {!edit && <button onClick={()=>setEdit(true)} className="px-4 py-2 text-black bg-[#87FFA7] text-[20px] font-[500] rounded-md">Chỉnh sửa</button>}
                </div>
            </div>
        </div>
    );
}

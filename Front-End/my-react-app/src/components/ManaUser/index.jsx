import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManaUser = () => {
  const navigate = useNavigate();
  const NaviDetail = (id) => {
    navigate(`/admin/user/userdetail/${id}`);
  };  
  const [farmers, setFarmer] = useState([]);
  const [filteredFarmers, setfilteredFarmers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const token = localStorage.getItem('jwtToken');

  // Cập nhật input tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Gọi API lấy danh sách farm 1 lần khi load
  useEffect(() => {
    const fetchListGarden = async () => {
      try {
        const response = await axios.get(`${API_BE}/account`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFarmer(response.data.result);
        setfilteredFarmers(response.data.result); // Khởi tạo luôn
      } catch (error) {
        console.error("Lỗi gọi API:", error);
      }
    };
    fetchListGarden();
  }, []);

  // Lọc sau khi user dừng gõ 10 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        const filtered = farmers.filter((item) =>
          (item.lastName + " "+ item.firstName).toLowerCase().includes(searchQuery.toLowerCase())
        );
        setfilteredFarmers(filtered);
      } else {
        setfilteredFarmers(farmers);
      }
    }, 1000); // 10 giây debounce

    return () => clearTimeout(timer); // Clear nếu user tiếp tục gõ
  }, [searchQuery, farmers]);

  return (
    <div className="bg-white flex-1 px-[80px] py-[50px] box-border max-h-[100%] overflow-hidden ">
      <div className="bg-[rgba(218,255,224,1)] p-6 rounded-lg shadow-md h-[100%] flex flex-col">
        <div className="flex justify-between items-center mb-6 relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-black after:mt-2 after:absolute after:bottom-[-15px] ">
          <h1 className="text-2xl font-bold">Tất cả người dùng</h1>
        </div>
        <div className="mb-6 mt-[10px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm khu vườn"
              value={searchQuery}
              onChange={handleSearchChange}
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
        <div className=" flex-1 overflow-y-auto">
          <table className="w-full">
            <thead className=" sticky top-0 bg-[rgba(218,255,224,1)]">
              <tr className="text-[20px] border-b-2 border-black">
                <th className="font-[600] px-4 py-2">STT</th>
                <th className="font-[600] px-4 py-2">Tên người dùng</th>
                <th className="font-[600] px-4 py-2">Email</th>
                <th className="font-[600] px-4 py-2">Điện thoại</th>
                <th className="font-[600] px-4 py-2">Số vườn quản lý</th>
              </tr>

            </thead>
            <tbody className="">
              {filteredFarmers.map((user, index) => (
                <tr key={index} className="text-center border-b border-black h-[80px] " onClick={()=>NaviDetail(user.id)}>
                  <td className=" px-4 py-2">{index + 1}</td>
                  <td className=" px-4 py-2">{user.lastName} {user.firstName}</td>
                  <td className=" px-4 py-2">{user.email}</td>
                  <td className=" px-4 py-2">{user.phoneNumber}</td>
                  <td className=" px-4 py-2">{user.totalGardens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ManaUser;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ManaGarden = () => {

  const navigate = useNavigate();

  const NaviDetail = (id) => {
    navigate(`/admin/garden/farmdetail/${id}`);
  };
  const NaviAddFarm = () => {
    navigate(`/admin/garden/addFarm`);
  };
  const [gardens, setGardens] = useState([]);
  const [filteredGardens, setFilteredGardens] = useState([]);
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
        const response = await axios.get(`${API_BE}/farm`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGardens(response.data.result);
        setFilteredGardens(response.data.result); // Khởi tạo luôn
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
        const filtered = gardens.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredGardens(filtered);
      } else {
        setFilteredGardens(gardens);
      }
    }, 1000); // 10 giây debounce

    return () => clearTimeout(timer); // Clear nếu user tiếp tục gõ
  }, [searchQuery, gardens]);




  return (
    <div className="bg-white flex-1 px-[80px] py-[50px] box-border max-h-[100%] overflow-hidden ">
      <div className="bg-[rgba(218,255,224,1)] p-6 rounded-lg shadow-md h-[100%] flex flex-col">
        <div className="flex justify-between items-center mb-6 relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-black after:mt-2 after:absolute after:bottom-[-15px] ">
          <h1 className="text-2xl font-bold">Tất cả khu vườn</h1>
          <button onClick={NaviAddFarm} className="bg-transparent text-black px-4 py-2 border border-black text-[15px] font-[600] hover:bg-green-600">
            Thêm vườn
          </button>
        </div>
        <div className="mb-6 mt-[10px]">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Tìm kiếm khu vườn"
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
            <thead>
              <tr className="text-[20px] border-b-2 border-black sticky top-0 bg-[rgba(218,255,224,1)]">
                <th className=" font-[600] px-4 py-2">STT</th>
                <th className=" font-[600] px-4 py-2">Tên khu vườn</th>
                <th className=" font-[600] px-4 py-2">Chủ khu vườn</th>
                <th className=" font-[600] px-4 py-2">Thời gian bắt đầu</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredGardens.map((garden) => (
                <tr key={garden.id} className="text-center border-b border-black h-[80px] " onClick={() => NaviDetail(garden.id)}>
                  <td className=" px-4 py-2">{garden.id}</td>
                  <td className=" px-4 py-2">{garden.name}</td>
                  <td className=" px-4 py-2">{garden.ownerName}</td>
                  <td className=" px-4 py-2">{garden.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
};

export default ManaGarden;
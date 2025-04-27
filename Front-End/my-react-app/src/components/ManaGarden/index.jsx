import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ManaGarden = () => {
  const gardens = [
    { id: "1", name: "Khu vườn 1", manager: "abc", startDate: "25/05/2025" },
    { id: "2", name: "Khu vườn 2", manager: "abc", startDate: "25/05/2025" },
    { id: "3", name: "Khu vườn 3", manager: "abc", startDate: "25/05/2025" },
    { id: "4", name: "Khu vườn 4", manager: "abc", startDate: "25/05/2025" },
    { id: "5", name: "Khu vườn 5", manager: "abc", startDate: "25/05/2025" },
    { id: "6", name: "Khu vườn 6", manager: "abc", startDate: "25/05/2025" },
    { id: "7", name: "Khu vườn 6", manager: "abc", startDate: "25/05/2025" },
    { id: "8", name: "Khu vườn 6", manager: "abc", startDate: "25/05/2025" },
    { id: "9", name: "Khu vườn 6", manager: "abc", startDate: "25/05/2025" },
    { id: "10", name: "Khu vườn 6", manager: "abc", startDate: "25/05/2025" },
  ];
  const navigate = useNavigate();

  const NaviDetail = (id) => {
    navigate(`/admin/garden/farmdetail/${id}`);
  };
  const NaviAddFarm = () => {
    navigate(`/admin/garden/addFarm`);
  };
  const [gardenSelect,setGardenSelect] =useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGardens, setFilteredGardens] = useState(gardens);
  const handleSearchChange = (e) => {
      setGardenSelect(e.target.value);
      setSearchQuery(e.target.value);
  };
  useEffect(() => {
    // Chỉ thực hiện tìm kiếm sau 10s khi người dùng ngừng gõ
    const timer = setTimeout(() => {
      if (searchQuery) {
        const filtered = gardens.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredGardens(filtered);
      } else {
        setFilteredGardens(gardens);
      }
    }, 3000); // 10 giây debounce

    // Cleanup function để clear timeout nếu người dùng nhập thêm
    return () => clearTimeout(timer);
  }, [searchQuery])



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
              onChange={handleSearchChange}
              value={gardenSelect}
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
                <th className=" font-[600] px-4 py-2">Mã</th>
                <th className=" font-[600] px-4 py-2">Tên khu vườn</th>
                <th className=" font-[600] px-4 py-2">Người quản lý</th>
                <th className=" font-[600] px-4 py-2">Thời gian bắt đầu</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredGardens.map((garden, index) => (
                <tr key={index} className="text-center border-b border-black h-[80px] " onClick={() => NaviDetail(garden.id)}>
                  <td className=" px-4 py-2">{index + 1}</td>
                  <td className=" px-4 py-2">{garden.id}</td>
                  <td className=" px-4 py-2">{garden.name}</td>
                  <td className=" px-4 py-2">{garden.manager}</td>
                  <td className=" px-4 py-2">{garden.startDate}</td>
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
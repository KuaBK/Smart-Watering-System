import React from "react";
import { useNavigate } from "react-router-dom";

const ManaUser = () => {
  const users = [
    { id: "KH01", name: "Nguyễn Văn A", email: "a@example.com", phone: "0123456789", totalGardens: 5 },
    { id: "KH02", name: "Trần Thị B", email: "b@example.com", phone: "0987654321", totalGardens: 3 },
    { id: "KH03", name: "Lê Văn C", email: "c@example.com", phone: "0912345678", totalGardens: 7 },
    { id: "KH04", name: "Phạm Thị D", email: "d@example.com", phone: "0908765432", totalGardens: 2 },
    { id: "KH05", name: "Hoàng Văn E", email: "e@example.com", phone: "0932123456", totalGardens: 4 },
    { id: "KH06", name: "Đặng Thị F", email: "f@example.com", phone: "0967890123", totalGardens: 6 },
    { id: "KH07", name: "Vũ Văn G", email: "g@example.com", phone: "0978901234", totalGardens: 8 },
    { id: "KH08", name: "Ngô Thị H", email: "h@example.com", phone: "0956789012", totalGardens: 1 },
    { id: "KH09", name: "Đỗ Văn I", email: "i@example.com", phone: "0945678901", totalGardens: 9 },
    { id: "KH10", name: "Bùi Thị K", email: "k@example.com", phone: "0923456789", totalGardens: 5 },
  ];
  const navigate = useNavigate();
  const NaviDetail = (id) => {
    navigate(`/admin/user/userdetail/${id}`);
  };

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
                <th className="font-[600] px-4 py-2">Mã</th>
                <th className="font-[600] px-4 py-2">Tên người dùng</th>
                <th className="font-[600] px-4 py-2">Email</th>
                <th className="font-[600] px-4 py-2">Điện thoại</th>
                <th className="font-[600] px-4 py-2">Số vườn quản lý</th>
              </tr>

            </thead>
            <tbody className="">
              {users.map((user, index) => (
                <tr key={index} className="text-center border-b border-black h-[80px] " onClick={NaviDetail}>
                  <td className=" px-4 py-2">{index + 1}</td>
                  <td className=" px-4 py-2">{user.id}</td>
                  <td className=" px-4 py-2">{user.name}</td>
                  <td className=" px-4 py-2">{user.email}</td>
                  <td className=" px-4 py-2">{user.phone}</td>
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
import { useState } from "react";

const datatemp = [
    {
      name: "Vườn Hoa Lan",
      address: "123 Đường Hoa, TP.HCM",
      createdAt: "2024-01-01",
      owner: "Nguyễn Văn A",
    },
    {
      name: "Vườn Cây Cảnh",
      address: "456 Đường Cây, Hà Nội",
      createdAt: "2024-03-15",
      owner: "Trần Thị B",
    },
    {
      name: "Vườn Rau Sạch",
      address: "789 Đường Rau, Đà Nẵng",
      createdAt: "2024-04-10",
      owner: "Lê Văn C",
    },
  ];
const PageAdmin = () => {

    const [data,setData] = useState(datatemp);
    const handleDelete = (index) => {
        alert(`Bạn muốn xóa hàng số ${index + 1}`);
      };
    return (
        <div>
            <table border="1">
      <thead>
        <tr>
          <th>Tên</th>
          <th>Địa chỉ</th>
          <th>Ngày tạo</th>
          <th>Chủ Vườn</th>
          <th>Xóa</th>
        </tr>
      </thead>
      <tbody>
        {data.map((garden, index) => (
          <tr key={index}>
            <td>{garden.name}</td>
            <td>{garden.address}</td>
            <td>{garden.createdAt}</td>
            <td>{garden.owner}</td>
            <td>
              <button onClick={() => handleDelete(index)}>Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </div>
    );
};
 export default PageAdmin;   

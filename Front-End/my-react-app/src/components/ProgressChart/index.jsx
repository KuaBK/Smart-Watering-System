import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({value,min,max}) => {
    // const value = 40; // Giá trị đầu vào duy nhất (phần chính)

    const data = {
      datasets: [
        {
          data: [value, 100-value], // Phần chính và phần còn lại
          backgroundColor: [value > min && value < max ? '#167b47' : 'rgba(229,0,0,1)', '#6ee7b7'], // Màu phần chính + nền
          borderWidth: 0, // Loại bỏ đường viền để mượt hơn
          borderRadius: [20, -20], // Bo góc chỉ cho phần chính
          cutout: '80%', // Làm Doughnut
        },
      ],
    };
    const options = {
        responsive: true, // Biểu đồ tự động co giãn theo kích thước
        maintainAspectRatio: false, // Không giữ tỷ lệ cố định
        rotation: -90, // ✅ Bắt đầu từ bên trái
        plugins: {
          tooltip: { enabled: true }, // Hiển thị tooltip khi hover
        },
      };
      
    

  return (
    <div className="flex flex-col items-center bg-transparent w-[100%] h-[100%] ">
      <div className="relative w-[342px] h-[342px] ">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-[30px]">
          {value}%
        </div>
      </div>
      <p className="text-black font-semibold text-[30px] my-[20px]">Khoảng thuận lợi</p>
      <div className="flex justify-center items-center mt-2 bg-[rgba(135,255,167,1)] text-[rgba(11,115,34,1)] font-[600] text-[50px] rounded-[30px] w-[320px] h-[90px] ">
        {min}% - {max}%
      </div>
    </div>
  );


}
export default ProgressChart;

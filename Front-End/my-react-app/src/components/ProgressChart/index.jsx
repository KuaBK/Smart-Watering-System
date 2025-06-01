
// import { useEffect, useState } from 'react';


// const ProgressChart = ({ percentage = 0, min, max }) => {

//   const [progress, setProgress] = useState(0); // ban đầu 0%
//   const color = percentage >= min && percentage <= max ? 'text-[#208F30]' : 'text-[#E50000]';
//   const RADIUS = 80;
//   const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setProgress(percentage); // animate đến percentage thật
//     }, 100); // delay nhẹ để CSS transition bắt kịp
//     return () => clearTimeout(timeout);
//   }, [percentage]);
//   return (
//     <div className="flex flex-col items-center">
//       <div className="relative w-[200px] h-[200px] md:w-[342px] md:h-[342px]">
//         <svg className="w-full h-full transform -rotate-90">
//           <circle
//             className="text-green-200"
//             strokeWidth="10"
//             stroke="currentColor"
//             fill="transparent"
//             r={RADIUS}
//             cx="50%"
//             cy="50%"
//           />
//           <circle
//             className={`${color}`}
//             strokeWidth="10"
//             strokeDasharray={CIRCUMFERENCE}
//             strokeDashoffset={CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100}
//             strokeLinecap="round"
//             stroke="currentColor"
//             fill="transparent"
//             r={RADIUS}
//             cx="50%"
//             cy="50%"
//             style={{
//               transition: 'stroke-dashoffset 0.5s ease-in-out',
//             }}
//           />

//         </svg>
//         <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
//           {percentage}%
//         </div>
//       </div>
//       <p className="text-black font-semibold text-[30px] my-[20px]">Khoảng thuận lợi</p>
//       <div className="flex justify-center items-center mt-2 bg-[rgba(135,255,167,1)] text-[rgba(11,115,34,1)] font-[600] text-[50px] rounded-[30px] w-[320px] h-[90px] ">
//         {min}% - {max}%
//       </div>
//     </div>
//   );


// }
// export default ProgressChart;

import { useEffect, useState, useRef } from 'react';

const ProgressChart = ({ percentage = 0, min, max }) => {
  const [progress, setProgress] = useState(0);
  const [radius, setRadius] = useState(80); // default
  const containerRef = useRef(null);

  const color = percentage >= min && percentage <= max ? 'text-[#208F30]' : 'text-[#E50000]';
  const CIRCUMFERENCE = 2 * Math.PI * radius;

  useEffect(() => {
    // Animate percentage
    const timeout = setTimeout(() => {
      setProgress(percentage);
    }, 100);
    return () => clearTimeout(timeout);
  }, [percentage]);

  useEffect(() => {
    // Tính radius theo chiều cao container
    const updateRadius = () => {
      if (containerRef.current) {
        const height = containerRef.current.offsetHeight;
        const newRadius = (height *0.8) / 2; // 40% chiều cao, rồi chia 2 vì radius chỉ là nửa đường kính
        setRadius(newRadius);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div ref={containerRef} className="relative w-[200px] h-[200px] md:w-[342px] md:h-[342px]">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-green-200"
            strokeWidth="25"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <circle
            className={`${color}`}
            strokeWidth="25"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {percentage}%
        </div>
      </div>
      <p className="text-black font-semibold text-[30px] my-[20px]">Khoảng thuận lợi</p>
      <div className="flex justify-center items-center mt-2 bg-[rgba(135,255,167,1)] text-[rgba(11,115,34,1)] font-[600] text-[50px] rounded-[30px] w-[320px] h-[90px] ">
        {min}% - {max}%
      </div>
    </div>
  );
};

export default ProgressChart;

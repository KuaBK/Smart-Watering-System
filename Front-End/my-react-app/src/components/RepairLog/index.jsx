import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const RepairLog = () => {
    const gardenName = localStorage.getItem("garden");
    const [log, setLog] = useState([]);
    function formatDateTime(isoString) {
    const date = new Date(isoString);

    const timeStr = date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const dateStr = date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return { timeStr, dateStr };
}

    useEffect(() => {
        // const token = localStorage.getItem("TOKEN");
        const fetchLog = async () => {
            try {
            Swal.fire({
                title: 'Đang tải dữ liệu hệ thống...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            const response = await axios.get(`${API_CE}/action/${gardenName}`);
            console.log(response)
            if (response.status === 200) {
            
                Swal.close();
                setLog(response.data)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi tải trạng thái!',
                text: 'Không thể kết nối tới máy chủ.',
            });
            console.error("Lỗi gọi API:", error);
        }
        };
        fetchLog();
    }, [])
    const renderTypeLabel = (list) => {
        switch (list.action) {
            case 0:
                return (<div className='bg-blue-500 text-white px-[10px] py-[5px] font-semibold'>NOT AUTO</div>)
            case 1:
                return (<div className='bg-blue-500 text-white px-[10px] py-[5px] font-semibold'>NOT AUTO</div>)
            case 2:
                return (<div className='bg-blue-500 text-white px-[10px] py-[5px] font-semibold'>NOT AUTO</div>)
            case 3:
                return (<div className='bg-blue-500 text-white px-[10px] py-[5px] font-semibold'>NOT AUTO</div>)
            case 6:
                return (<div className='bg-green-500 text-white px-[10px] py-[5px] font-semibold'>AUTO</div>)
            case 7:
                return (<div className='bg-green-500 text-white px-[10px] py-[5px] font-semibold'>AUTO</div>)
            case 8:
                return (<div className='bg-green-500 text-white px-[10px] py-[5px] font-semibold'>AUTO</div>)
            case 9:
                return (<div className='bg-green-500 text-white px-[10px] py-[5px] font-semibold'>AUTO</div>)
        }
    }
    const renderTypeContent = (list) => {
        switch (list.action) {
            case 0:
                return "Bật máy bơm thủ công";
            case 1:
                return "Tắt máy bơm thủ công";
            case 2:
                return "Bật đèn thủ công";
            case 3:
                return "Tắt đèn thủ công";
            case 6:
                return `Đặt máy bơm tự động bật từ ${formatTimeToHHhmm(list.startTime)} tới ${formatTimeToHHhmm(list.endTime)} hằng ngày`  ;
            case 7:
                return "Tắt máy bơm tự động";
            case 8:
                return `Đặt đèn tự động bật từ ${formatTimeToHHhmm(list.startTime)} tới ${formatTimeToHHhmm(list.endTime)} hằng ngày`;
            case 9:
                return "Tắt đèn tự động";
        }
    }
    function formatTimeToHHhmm(timeStr) {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":");
    return `${hour}h${minute}`;
}

    return (
        <div className="m-auto w-full min-h-full h-[calc(100vh-96px)] bg-white py-[20px] px-[3%]">
            <div className='text-[32px] font-bold text-black mb-5'>Lịch sử hoạt động</div>
            <div className='overflow-y-auto h-[80%] flex flex-col gap-[10px] p-[10px] m-auto'>
                {log?.slice().reverse().map((list,id) => (
                    <div key={id} className='pb-2 border-b border-black'>
                        <div className="font-bold text-[#0388B4] text-start text-[20px] ">{formatDateTime(list.time).dateStr}</div>
                        <div className="flex items-center gap-[5px] justify-between">
                            <div className="opacity-[60%]">{formatDateTime(list.time).timeStr}</div>
                            <div className='w-[10%]'>{renderTypeLabel(list)}</div>

                            {/* <div className='w-[50%] '>
                                <div className='text-[25px] truncate text-black  font-semibold'>{formatText(list.assetType)} - {list.assetSeries}</div>
                                <div className='truncate opacity-70'>{list.action}</div>
                            </div> */}
                            <div className='w-[50%] text-[25px] truncate text-black text-start  font-semibold'>{renderTypeContent(list)}</div>
                            <div className='w-[30%] truncate text-end'>{list.userId}</div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}
export default RepairLog;
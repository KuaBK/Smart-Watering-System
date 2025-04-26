
const Help = () => {
    return (
        <div className="flex flex-col md:flex-row gap-8 p-10 bg-gray-100 flex-1">
            <div className="flex-1">
                <h2 className="text-3xl font-bold mt-9 mb-[80px] font-baloo">THÔNG TIN LIÊN HỆ</h2>
                <div className="text-lg">
                    <div className="flex items-center gap-4 mb-[45px]">
                        <span>📞</span> <span>+84 548565917</span>
                    </div>
                    <div className="flex items-center gap-4 mb-[45px]">
                        <span>✉️</span> <span>abc@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>📍</span> <span>215 A, B, Thành phố Hồ Chí Minh</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white p-8 rounded-[31.5px] shadow-md border border-black">
                <h2 className="text-2xl font-bold text-center mb-2 font-baloo">BẠN CẦN HỖ TRỢ?</h2>
                <div className="text-center text-black-600 text-sm space-y-1 mb-6">
                    <p>Hãy để lại thông tin cho chúng tôi nhé!</p>
                    <p>Yêu cầu của bạn sẽ được xử lý và phản hồi trong thời gian sớm nhất.</p>
                </div>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Họ và tên *" className="p-3 rounded-[31.5px] bg-[#9ED37E] w-full placeholder-black" />
                        <input type="text" placeholder="Số điện thoại *" className="p-3 rounded-[31.5px] bg-[#9ED37E] w-full placeholder-black" />
                    </div>
                    <input type="email" placeholder="Email *" className="p-3 rounded-[31.5px] bg-[#9ED37E] w-full placeholder-black" />
                    <input type="text" placeholder="Địa chỉ *" className="p-3 rounded-[31.5px] bg-[#9ED37E] w-full placeholder-black" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="date" className="p-3 rounded-[31.5px] bg-[#9ED37E] w-full placeholder-black" />
                        <input type="time" className="p-3 rounded-[31.5px] bg-[#9ED37E] w-full placeholder-black" />
                    </div>
                    <textarea placeholder="Nội dung hỗ trợ..." className="p-3 rounded-[31.5px] bg-[#D0E6B7] w-full h-32 placeholder-black" />
                    <div className="text-center">
                        <button type="submit" className="bg-[#87FFA7] hover:bg-green-600 text-black font-bold py-2 px-8 rounded-[31.5px]">
                            Gửi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Help;

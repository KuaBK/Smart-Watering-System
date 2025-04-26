

const Equipment = ({ name, img,status,setStatus }) => {
    console.log(status);
    return (
        <div className={`flex flex-col items-center w-[310px] h-[300px] px-[50px] py-[20px] rounded-[50px] border-[3px] border-[rgba(44,135,108,0.78)] ${status ? 'bg-[rgba(225,255,229,1)]' : 'bg-transparent'} 
       transition-all`}>
            <div className="flex justify-between w-full mb-[10px]">
                <p className="mb-2 font-[500] text-[30px] ">{name}</p>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={status}
                        onChange={() => setStatus(!status)}
                        className="sr-only peer"
                    />
                    <div className="w-[70px] h-[40px] bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:bg-green-500"></div>
                    <span className="absolute left-1 top-[12px] w-[30px] h-[30px] bg-white rounded-full transition-transform peer-checked:translate-x-8"></span>
                </label>
            </div>
            <img src={img} alt="" />
            
        </div>
    );
}
export default Equipment;
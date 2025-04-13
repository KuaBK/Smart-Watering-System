import { useState } from "react";

const Equipment = ({name,img}) => {
    const [machine1, setMachine1] = useState(false);
    return (
        <div className="flex flex-col items-center bg-green-200 w-[310px] h-[300px] p-[5px] rounded-[15px]">
            <div className="flex justify-around">
                <p className="mb-2 font-semibold">{name}</p>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={machine1}
                        onChange={() => setMachine1(!machine1)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:bg-green-500"></div>
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                </label>
            </div>
            <img src={img} alt="" />

        </div>
    );
}
export default Equipment;
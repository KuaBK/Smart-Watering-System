import logo from '../../assets/logo.svg';
import info from '../../assets/help-circle.svg';
import bell from '../../assets/bell.svg';
import usercurrent from '../../assets/user.svg';
import userActive from '../../assets/userActive.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
// import { i } from 'framer-motion/client';
const Header = () => {
    const navigate = useNavigate();
    const divRef = useRef(null);
    const avtRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const handle = () => {
        setIsOpen(!isOpen);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && (!divRef.current.contains(event.target) && !avtRef.current.contains(event.target))) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleLogout = () => {
        navigate('/signin');
        localStorage.removeItem('jwtToken');
    }
    const handleChangePW = () => {
        navigate('/changepassword');
    }
    return (
        <div className="h-[96px] w-full bg-[rgba(44,135,108,1)] flex justify-between items-center px-[20px] shadow-[0px_5px_4px_0px_rgba(0,0,0,0.25)] ">
            <div className='flex gap-[20px] ml-[20px]'>
                <img src={logo} alt="" />
                <div className='font-baloo font-normal text-[50px] text-white '>ABC</div>
            </div>
            <div className='flex gap-[20px]'>
                {/* <img className="w-10 h-10 invert brightness-0 sepia saturate-200 hue-rotate-[20deg] contrast-150" src="/icon.svg" alt="icon" /> */}
                <img className='fill-white' src={info} alt="" />
                <img className='fill-white' src={bell} alt="" />
                <div className='group relative flex justify-center items-center'>
                    {/* <img className='brightness-100 sepia saturate-[500%] hue-rotate-[10deg] contrast-[120%] opacity-80' src={user} alt="" /> */}
                    <img ref={avtRef} className='transition-all duration-300' src={isOpen ? userActive : usercurrent} alt="" onClick={handle} />
                    {isOpen && (
                        <div ref={divRef} className='h-fit absolute top-full right-[50%] w-fit bg-white border-[2px] border-[rgba(70,223,177,0.8)] rounded-b-[15px] rounded-tl-[15px]'>

                            <div className=' h-[50px] whitespace-nowrap text-[rgba(70,223,177,0.8)] text-[20px] font-[600]  text-black hover:bg-[rgba(70,223,177,0.8)] hover:text-white flex items-center px-[5px]  rounded-tl-[10px]' onClick={handleLogout}>Đăng xuất</div>
                            <div className=' h-[50px] whitespace-nowrap text-[rgba(70,223,177,0.8)] text-[20px] font-[600]  text-black hover:bg-[rgba(70,223,177,0.8)] hover:text-white flex items-center px-[5px]  rounded-b-[10px]' onClick={handleChangePW}>Thay đổi mật khẩu</div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Header;
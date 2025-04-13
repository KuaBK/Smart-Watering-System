import logo from '../../assets/logo.svg';
import info from '../../assets/help-circle.svg';
import bell from '../../assets/bell.svg';
import usercurrent from '../../assets/user.svg';
import userActive from '../../assets/userActive.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(usercurrent);
    const handleLogout = () => {
        navigate('/signin');
        localStorage.removeItem('jwtToken');
    }
    return (
        <div className="h-[120px] w-full bg-[rgba(44,135,108,1)] flex justify-between items-center px-[20px] shadow-[0px_5px_4px_0px_rgba(0,0,0,0.25)] ">
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
                <img className='transition-all duration-300' src={user} alt="" onMouseEnter={() => setUser(userActive)} onMouseLeave={() => setUser(usercurrent)}/>
                    <div className='w-[100px] h-[30px] rounded-tl-[15px] rounded-bl-[15px] bg-white text-black rounded-br-[15px] absolute top-full right-[50%] hover:bg-[rgba(70,223,177,0.8)] hover:text-white hidden group-hover:block' onClick={handleLogout}>Log out</div>
                </div>
            </div>
        </div>
    );
}
export default Header;
import imgPlant from '../../image/img-plant.png';
import mailsvg from '../../assets/mail.svg';
import locksvg from '../../assets/lock.svg';
import usersvg from '../../assets/user.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const naviSignIn = () => {
    navigate('/signin');
  }
  return (
    <div className="flex justify-center items-center h-screen w-full bg-[linear-gradient(180deg,rgba(59,252,88,0.42)_40%,rgba(106,198,120,0.42)_62.5%,rgba(69,177,85,0.42)_91.5%)] backdrop-blur-md">
      <div className="h-[620px] w-[1000px] relative bg-[rgba(245,245,245,0.5)] rounded-[50px] border border-black">
        <img className="h-[780px] w-[530px] bouder-[50px] absolute right-[-100px] top-[-70px] animate-slideOut z-10" src={imgPlant} alt="Plant" />
        <div className='float-left flex flex-col justify-around items-center h-full px-[50px] py-[30px] animate-slideIndiv'>
          <h2 className='font-baloo font-bold text-[65px] '>SIGN UP</h2>
          <div className='flex flex-row justify-around border-b-2 border-black w-[450px] h-[50px] relative'>
            <input
              className="peer flex-1 bg-transparent !bg-transparent outline-none placeholder-black placeholder:font-bold font-bold px-[10px] pt-[10px] pb-[5px]"
              placeholder=""
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className={`absolute left-[10px] top-[15px] text-black transition-all ${username ? "top-0 text-sm font-semibold text-black peer-valid:top-0 peer-valid:text-sm peer-valid:font-semibold peer-valid:text-black" : "peer-placeholder-shown:top-[15px] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black"}`}>User name</span>
            <img src={usersvg} alt="" />
          </div>
          <div className='flex flex-row justify-around border-b-2 border-black w-[450px] h-[50px] relative'>
            <input
              className="peer flex-1 bg-transparent !bg-transparent outline-none placeholder-black placeholder:font-bold font-bold px-[10px] pt-[10px] pb-[5px]"
              placeholder=""
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className={`absolute left-[10px] top-[15px] text-black transition-all ${email ? "top-0 text-sm font-semibold text-black peer-valid:top-0 peer-valid:text-sm peer-valid:font-semibold peer-valid:text-black" : "peer-placeholder-shown:top-[15px] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black"}`}>Email</span>
            <img src={mailsvg} alt="" />
          </div>
          <div className='flex flex-row justify-around border-b-2 border-black w-[450px] h-[50px] relative'>
            <input
              className="peer flex-1 bg-transparent !bg-transparent outline-none placeholder-black placeholder:font-bold font-bold px-[10px] pt-[10px] pb-[5px]"
              placeholder=""
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={`absolute left-[10px] top-[15px] text-black transition-all ${password ? "top-0 text-sm font-semibold text-black peer-valid:top-0 peer-valid:text-sm peer-valid:font-semibold peer-valid:text-black" : "peer-placeholder-shown:top-[15px] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black"}`}>Password</span>
            <img onClick={handleShowPassword} src={locksvg} alt="" />
          </div>
          <button className='w-[450px] h-[75px] bg-[rgba(71,225,112,0.8)] rounded-[30px] font-baloo font-bold text-[32px]  ' onClick={naviSignIn} >Sign Up</button>
          <div className='flex justify-end w-[450px]'>
            <div className='font-baloo font-bold text-[20px] ' onClick={naviSignIn}>Already have an account ?</div>
          </div>
        </div>
      </div>
    </div>
  );


}
export default Register;
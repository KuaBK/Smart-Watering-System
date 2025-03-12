import imgPlant from '../../image/img-plant.png';
import mailsvg from '../../assets/mail.svg';
import locksvg from '../../assets/lock.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignIn() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const naviSignUp = () => {
    navigate('/register');
  }
  return (
    <div className="flex justify-center items-center h-screen w-full bg-[linear-gradient(180deg,rgba(59,252,88,0.42)_40%,rgba(106,198,120,0.42)_62.5%,rgba(69,177,85,0.42)_91.5%)] backdrop-blur-md">
      <div className="h-[620px] w-[1000px] relative bg-[rgba(245,245,245,0.5)] rounded-[50px] border border-black">
        {/* <motion.img
          initial={{ x: -300, opacity: 0 }} // Bắt đầu ở ngoài màn hình bên trái
          animate={{ x: 0, opacity: 1 }} // Trượt vào vị trí ban đầu
          transition={{ duration: 1, ease: "easeOut" }} // Hiệu ứng mượt
          className="h-[780px] w-[530px] bouder-[50px] absolute left-[-100px] top-[-70px]"
          src={imgPlant}
          alt="Plant"
        /> */}
        <img className="h-[780px] w-[530px] bouder-[50px] absolute left-[-100px] top-[-70px] animate-slideIn z-10" src={imgPlant} alt="Plant" />
        <div className='float-right flex flex-col justify-around items-center h-full px-[50px] py-[50px] animate-slideOutdiv'>
          <h2 className='font-baloo font-bold text-[65px] '>LOGIN</h2>
          <div className='flex flex-row justify-around border-b-2 border-black w-[450px] p-[10px]'>
            <input
              className="flex-1 bg-transparent outline-none placeholder-black placeholder:font-bold font-bold"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <img src={mailsvg} alt="" />
          </div>
          <div className='flex flex-row justify-around border-b-2 border-black w-[450px] p-[10px]'>
            <input
              className="flex-1 bg-transparent !bg-transparent outline-none placeholder-black placeholder:font-bold font-bold"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img onClick={handleShowPassword} src={locksvg} alt="" />
          </div>
          <button className='w-[450px] h-[75px] bg-[rgba(71,225,112,0.8)] rounded-[30px] font-baloo font-bold text-[32px]  ' >Login</button>
          <div className='flex justify-between w-[450px]'>
            <div className='font-baloo font-bold text-[20px] ' onClick={naviSignUp}>Create an account</div>
            <div className='font-baloo font-bold text-[20px] '>Forget password ?</div>
          </div>
        </div>
      </div>
    </div>
  );


}
export default SignIn;
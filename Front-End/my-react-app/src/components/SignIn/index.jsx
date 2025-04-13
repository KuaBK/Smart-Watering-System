import imgPlant from '../../image/img-plant.png';
import mailsvg from '../../assets/mail.svg';
import locksvg from '../../assets/lock.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

// import { em, text } from 'framer-motion/client';
const account = 
  [
  {
    "id": 1,
    email: "Duong@gmail.com",
    password: "123456"
  },
  {
    "id": 2,
    email: "abc@gmail.com",
    password: "123456"
  }
  ];
function SignIn() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const naviSignUp = () => {
    navigate('/register');
  }
  // const handleSubmit = async () => {
  //   e.preventDefault();

  //   const formData = new FormData(e.target);
  //   const data = {};
  //   formData.forEach((value, key) => {
  //       data[key] = value;
  //   });


  //   try {
      // const response = await api.post('/auth/public/signin', data);
      // const decodedToken = jwtDecode(response.data.jwtToken);
      // if (response.status === 200 && response.data.jwtToken) {
      //   setJwtToken(response.data.jwtToken);
      //   handleSuccessfulLogin(response.data.jwtToken, decodedToken);
      // } else {
      //   toast.error("Đã xảy ra lỗi! Vui lòng thử lại sau.", {
      //     position: "top-right",
      //     autoClose: 3000,
      //   });
      // }

  //   }
  //   catch(error){
  //     toast.error("Đã xảy ra lỗi! Vui lòng thử lại sau.", {
  //       position: "top-right", // Vị trí hiển thị
  //       autoClose: 3000, // Tự động đóng sau 3 giây
  //       hideProgressBar: false, // Hiển thị thanh tiến trình
  //       closeOnClick: true, // Cho phép đóng khi click
  //       pauseOnHover: true, // Tạm dừng khi hover vào
  //       draggable: true, // Kéo thả được
  //       progress: undefined, // Hiển thị tiến trình mặc định
  //       theme: "colored", // Chủ đề: "light", "dark", "colored"
  //     });
  //   }
  // }
  const handleSubmit = () => {
    console.log("abcc");
    const check = account.find((acc) => acc.email === email && acc.password === password);
    if (check) {
      navigate('/user');
    }
    else {
      Swal.fire({
        title: "Thất bại!",
        text: "Tài khoản hoặc mật khẩu chưa đúng vui lòng thử lại.",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000
      });
    }
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
          {/* <ToastContainer /> */}
          <button className='w-[450px] h-[75px] bg-[rgba(71,225,112,0.8)] rounded-[30px] font-baloo font-bold text-[32px]  ' onClick={handleSubmit} >Login</button>
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
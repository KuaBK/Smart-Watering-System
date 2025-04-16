import imgPlant from '../../image/img-plant.png';
import locksvg from '../../assets/lock.svg';
import mailsvg from '../../assets/mail.svg';
// import user from '../../assets/usericon.svg';
// import phoneicon from '../../assets/phone.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
function ForgotPW() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPW, setConfirmPW] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPW, setShowConfirmPW] = useState(false);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleShowConfirmPW = () => {
        setShowConfirmPW(!showConfirmPW);
    }
    const naviSignin = () => {
        navigate('/signin');
    }
    const handleGetOTP = async () => {

        if (email === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập đầy đủ thông tin!',
            })
            return;
        }


        try {
            const response = await axios.post(`http://localhost:8080/account/forgot-password?email=${email}`);
            console.log(response);
            if (response.status === 200) {
                // setCVProfile(response.data.data)
                Swal.fire({
                    title: "Thành công!",
                    text: `"OTP đã được gửi về email, vui lòng kiểm tra gmail."`,
                    showConfirmButton: false,
                    icon: "success",
                    timer: 3000
                });
                setStep2(true);
            }
        } catch {
            Swal.fire({
                title: "Thất bại!",
                text: `"Đã xảy ra lỗi, vui lòng thử lại."`,
                showConfirmButton: false,
                icon: "warning",
                timer: 3000
            });
        }
    }
    const handleConfirmOTP = async () => {

        if (email === '' || otp === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập đầy đủ thông tin!',
            })
            return;
        }


        try {
            const response = await axios.post(`http://localhost:8080/account/confirm-otp?email=${email}&otp=${otp}`);
            console.log(response);
            if (response.status === 200) {
                // setCVProfile(response.data.data)
                Swal.fire({
                    title: "Thành công!",
                    text: `"OTP chính xác, vui lòng đặt mật khẩu mới."`,
                    showConfirmButton: false,
                    icon: "success",
                    timer: 3000
                });
                setStep2(false);
                setStep3(true);
            }
        } catch {
            Swal.fire({
                title: "Thất bại!",
                text: `"Đã xảy ra lỗi, vui lòng thử lại."`,
                showConfirmButton: false,
                icon: "warning",
                timer: 3000
            });
        }
    }
    const handleForgotPW = async () => {

        if (newPassword !== confirmPW) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mật khẩu không khớp!',
            })
            return;
        }
        if (email === '' || newPassword === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập đầy đủ thông tin!',
            })
            return;
        }
        const data = {
            email: email,
            newPassword: newPassword,
            confirmPassword: confirmPW,
        };
        console.log(data);


        try {
            const response = await axios.post(`http://localhost:8080/account/reset-password`,data,{
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            if (response.status === 200) {
                // setCVProfile(response.data.data)
                Swal.fire({
                    title: "Thành công!",
                    text: `"Cập nhật mật khẩu mới thành công, vui lòng đăng nhập."`,
                    showConfirmButton: false,
                    icon: "success",
                    timer: 3000
                });
                navigate('/signin');
            }
        } catch (error){
            Swal.fire({
                title: "Thất bại!",
                text: `"Đã xảy ra lỗi, vui lòng thử lại." ${error}`,
                showConfirmButton: false,
                icon: "warning",
                timer: 3000
            });
        }
    }
    return (
        <div className="flex justify-center items-center h-screen w-full bg-[linear-gradient(180deg,rgba(59,252,88,0.42)_40%,rgba(106,198,120,0.42)_62.5%,rgba(69,177,85,0.42)_91.5%)] backdrop-blur-md">
            <div className="h-[620px] w-[1000px] relative bg-[rgba(245,245,245,0.5)] rounded-[50px] border border-black">
                <img className="h-[780px] w-[530px] bouder-[50px] absolute right-[-100px] top-[-70px] animate-slideOut z-10" src={imgPlant} alt="Plant" />
                <div className='float-left flex flex-col justify-around items-center h-full px-[50px] py-[30px] animate-slideIndiv'>
                    <h2 className='font-baloo font-bold text-[65px] '>Quên mật khẩu</h2>
                    <div className='flex flex-row justify-around border-b-2 border-black w-[450px] h-[50px] relative'>
                        <input
                            className="peer flex-1 bg-transparent outline-none placeholder-black placeholder:font-bold font-bold px-[10px] pt-[10px]"
                            placeholder=""
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className={`absolute left-[10px] top-[15px] text-black transition-all ${email ? "top-0 text-sm font-semibold text-black peer-valid:top-0 peer-valid:text-sm peer-valid:font-semibold peer-valid:text-black" : "peer-placeholder-shown:top-[15px] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black"}`}>Email</span>
                        <img src={mailsvg} alt="" />
                    </div>
                    {step2 && (
                        <div className='flex flex-row justify-around border-b-2 border-black w-[450px] h-[50px] relative'>
                            <input
                                className="peer flex-1 bg-transparent outline-none placeholder-black placeholder:font-bold font-bold px-[10px] pt-[10px]"
                                placeholder=""
                                type="number"
                                value={otp}
                                onChange={(e) => setOTP(e.target.value)}
                            />
                            <span className={`absolute left-[10px] top-[15px] text-black transition-all ${otp ? "top-0 text-sm font-semibold text-black peer-valid:top-0 peer-valid:text-sm peer-valid:font-semibold peer-valid:text-black" : "peer-placeholder-shown:top-[15px] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black"}`}>OTP</span>
                            <img src={mailsvg} alt="" />
                        </div>
                    )}
                    {step3 && (
                            <div div className='flex flex-row justify-around border-b-2 border-black w-[450px] h-[50px] relative'>
                                <input
                                    className="peer flex-1 bg-transparent outline-none placeholder-black placeholder:font-bold font-bold px-[10px] pt-[10px]"
                                    placeholder=""
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <span className={`absolute left-[10px] top-[15px] text-black transition-all ${newPassword ? "top-0 text-sm font-semibold text-black peer-valid:top-0 peer-valid:text-sm peer-valid:font-semibold peer-valid:text-black" : "peer-placeholder-shown:top-[15px] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black"}`}>Mật khẩu mới</span>
                                <img onClick={handleShowPassword} src={locksvg} alt="" />
                            </div>)}
                    {step3 &&(
                            <div className='flex flex-row justify-around border-b-2 border-black w-[450px] h-[50px] relative'>
                                <input
                                    className="peer flex-1 bg-transparent  outline-none placeholder-black placeholder:font-bold font-bold px-[10px] pt-[10px]"
                                    placeholder=""
                                    type={showConfirmPW ? "text" : "password"}
                                    value={confirmPW}
                                    onChange={(e) => setConfirmPW(e.target.value)}
                                />
                                <span className={`absolute left-[10px] top-[15px] text-black transition-all ${confirmPW ? "top-0 text-sm font-semibold text-black peer-valid:top-0 peer-valid:text-sm peer-valid:font-semibold peer-valid:text-black" : "peer-placeholder-shown:top-[15px] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black"}`}>Nhập lại mật khẩu</span>
                                <img onClick={handleShowConfirmPW} src={locksvg} alt="" />
                            </div>
                    )}
                    {!step2 && !step3 && (
                        <button className='w-[450px] h-[75px] bg-[rgba(71,225,112,0.8)] rounded-[30px] font-bold text-[32px]  ' onClick={handleGetOTP} >Gửi OTP</button>
                    )}
                    {step2 && (
                        <button className='w-[450px] h-[75px] bg-[rgba(71,225,112,0.8)] rounded-[30px] font-bold text-[32px]  ' onClick={handleConfirmOTP} >Xác nhận OTP</button>
                    )}
                    {step3 && (
                        <button className='w-[450px] h-[75px] bg-[rgba(71,225,112,0.8)] rounded-[30px] font-bold text-[32px]  ' onClick={handleForgotPW} >Đặt mật khẩu mới</button>
                    )}
                    {/* <button className='w-[450px] h-[75px] bg-[rgba(71,225,112,0.8)] rounded-[30px] font-bold text-[32px]  ' onClick={handleForgotPW} >Đổi mật khẩu</button> */}
                    <div className='flex justify-end w-[450px]'>
                        <div className=' font-bold text-[20px] ' onClick={naviSignin}>Đăng nhập</div>
                    </div>
                </div>
            </div>
        </div >
    );


}
export default ForgotPW;
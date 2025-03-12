import "./style.css"
import { useNavigate } from "react-router-dom"; 
function Wellcome() {
    const navigate = useNavigate();
    const naviSignIn = ()=> {
        navigate('/signin');
    }
    const naviSignUp = ()=> {
        navigate('/register');
    }
    return (
        <div className="relative h-screen w-full bg-cover bg-center container">
            <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white blur-none">
                <h1 className="text-[100px] font-sister font-normal">WELCOME TO ABCD</h1>

                <button onClick={naviSignIn} className="font-baloo text-[65px] w-[700px] h-[120px] bg-white bg-opacity-20 px-10 py-3 font-semibold rounded-[20px] shadow-md hover:bg-opacity-30 transition mt-10">
                    SIGN IN
                </button>

                <p onClick={naviSignUp} className="mt-4 h-[60px] text-[38px] font-baloo font-normal">Create an account</p>
            </div>
        </div>
    );
}
export default Wellcome;
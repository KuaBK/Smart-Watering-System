import sun from '../../assets/sun.svg'
import droplet from '../../assets/droplet.svg'
import thermometer from '../../assets/thermometer.svg'
import wind from '../../assets/wind.svg'
import garden from '../../assets/garden.jpg'
import "./style.css"
import Header from '../../components/Header'

const Garden = ({ name, tem, sold, lig, air }) => {
    return (
        <div className="flip-card rounded-[50px]">
            <div className="flip-card-inner rounded-[50px]">
                <div className="flip-card-front relative  rounded-[50px]">
                    <img className='w-full h-full rounded-[50px]' src={garden} alt="" />
                </div>
                <div className="flip-card-back bg-[rgba(4,159,45,0.54)] p-[20px]  rounded-[50px]">
                    <h2 className="h-[30%] font-baloo font-[400] text-[40px] text-white ">{name}</h2>
                    <div className="flex flex-col justify-center items-center w-full h-[60%] m-t-[30px]">
                        <div className="flex flex-grow justify-center items-center h-[50%] w-full">
                            <div className="flex items-center justify-center border-r border-b border-white text-white font-baloo px-[10px] font-[400] text-[35px] w-[50%] h-full "><img src={thermometer} alt="" />{tem}°C</div>
                            <div className="flex items-center justify-center border-l border-b border-white text-white font-baloo px-[10px] font-[400] text-[35px] w-[50%] h-full "><img src={droplet} alt="" />{sold}%</div>
                        </div>
                        <div className="flex flex-grow justify-center items-center h-[50%] w-full">
                            <div className="flex items-center justify-center border-r border-t border-white text-white font-baloo px-[10px] font-[400] text-[35px] w-[50%] h-full "><img src={sun} alt="" />{lig}%</div>
                            <div className="flex items-center justify-center border-t border-l border-white text-white font-baloo px-[10px] font-[400] text-[35px] w-[50%] h-full "><img src={wind} alt="" />{air}%</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="h-[333px] w-[333px]  bg-[rgba(4,159,45,0.54)] p-[20px]">
             <h2 className="h-[30%] font-baloo font-[400] text-[40px] text-white ">{name}</h2>
            <div className="flex flex-col justify-center items-center w-full h-[60%] m-t-[30px]">
                <div className="flex flex-grow justify-center items-center h-[50%] w-full">
                    <div className="flex items-center justify-center border-r border-b border-white text-white font-baloo px-[10px] font-[400] text-[35px] w-[50%] h-full "><img src={thermometer} alt="" />{tem}°C</div>
                    <div className="flex items-center justify-center border-l border-b border-white text-white font-baloo px-[10px] font-[400] text-[35px] w-[50%] h-full "><img src={droplet} alt="" />{sold}%</div>
                </div>
                <div className="flex flex-grow justify-center items-center h-[50%] w-full">
                    <div className="flex items-center justify-center border-r border-t border-white text-white font-baloo px-[10px] font-[400] text-[35px] w-[50%] h-full "><img src={sun} alt="" />{lig}%</div>
                    <div className="flex items-center justify-center border-t border-l border-white text-white font-baloo px-[10px] font-[400] text-[35px] w-[50%] h-full "><img src={wind} alt="" />{air}%</div>
                </div>
            </div> 
            </div>*/}
        </div>


    );
};
// export Garden;
const PageIntro = () => {
    return (
        <>
            <Header />
            <div className="flex flex-wrap justify-center items-center w-full h-[100%] m-[50px]">
                <Garden name="Garden 1" tem={25} sold={50} lig={75} air={100} />
            </div>
        </>
    )
};
export default PageIntro;
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { IoCreate, IoSettingsOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { PiSignInBold } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";
import humberger from "../../assets/humberger.png"
import Navbar from "../NavBar/Navbar";

const SideBar = () => {
    const [hideText, setHideText] = useState('');
    const [sidebarWidth, setSidebarWidth] = useState('');
    const [changeLogo, setChangeLogo] = useState(true);
    const location = useLocation();

    const removeSideBar = () => {
        setHideText('hidden');
        setSidebarWidth('w-[96px]');
        setChangeLogo(false);
    };

    const showSideBar = () => {
        setHideText('');
        setSidebarWidth('w-[264px]');
        setChangeLogo(true);
    };

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="drawer md:drawer-open">
            {/* Drawer content */}
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content dark:bg-[#201f1f] bg-[#f2f2f28a] pt-2">
                {/* Hamburger icon for mobile */}
                <label htmlFor="my-drawer-2" className="md:hidden">
                    <img onClick={showSideBar} className={`w-10 m-2`} src={humberger} alt="" />
                </label>
                <Navbar />
                <Outlet />
            </div>
            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className={`menu ${sidebarWidth} w-[264px] min-h-full bg-[#fff] dark:bg-[#000] text-base-content  space-y-10`}>
                    <div className="flex justify-between gap-8 mx-auto mt-2">
                        {changeLogo ?
                            <div className="flex items-center gap-4 text-[24px] font-bold">
                                <div className="dark:hidden"><img src={logoDark} className="w-32" alt="logo" /></div>
                                <div className="hidden dark:block"><img src={logoLight} className="w-32" alt="logo" /></div>
                            </div> :
                            <img onClick={showSideBar} className={`w-10 mx-auto bg-none`} src={humberger} alt="" />
                        }
                        <img onClick={removeSideBar} className={`w-[40px] ${hideText}`} src="https://i.ibb.co/sm3WYmD/Icon-Side-Arrow-round.png" alt="" />
                    </div>
                    {/* Sidebar content */}
                    <p className={`text-[16px]  dark:text-white mt-[60px] font-mono ${changeLogo ? '' : 'mx-auto'}`}>
                        <Link to="/" style={{display: "flex", alignItems: "center", gap: 7, padding: "0px 20px"}} className={isActiveLink("/") ? "text-[#5369F8]" : "" }>
                            <GoHome className="text-[32px]" />
                            <span className={`${hideText}`}>Home</span>
                        </Link>
                    </p>
                    <p className={`text-[16px] dark:text-white mt-5 font-mono ${changeLogo ? '' : 'mx-auto'}`}>
                        <Link to="/allemployee" style={{display: "flex", alignItems: "center", gap: 7, padding: "0px 20px"}} className={isActiveLink("/allemployee") ? "text-[#5369F8]" : ""}>
                            <GoPerson className="text-[32px]" />
                            <span className={`${hideText}`}>All Employee</span>
                        </Link>
                    </p>
                    <p className={`text-[16px] dark:text-white mt-5 font-mono ${changeLogo ? '' : 'mx-auto'}`}>
                        <Link to="/createEmployee" style={{display: "flex", alignItems: "center", gap: 7, padding: "0px 20px"}} className={isActiveLink("/createEmployee") ? "text-[#5369F8]" : ""}>
                            <IoPersonAddOutline className="text-[32px]" />
                            <span className={`${hideText}`}>Create Employee</span>
                        </Link>
                    </p>
                    <p className={`text-[16px] dark:text-white mt-5 font-mono ${changeLogo ? '' : 'mx-auto'}`}>
                        <Link to="/updateEmployee" style={{display: "flex", alignItems: "center", gap: 7, padding: "0px 20px"}} className={isActiveLink("/updateEmployee") ? "text-[#5369F8]" : ""}><IoCreate className="text-[32px]" /><span className={`${hideText}`}>Update Employee</span></Link>
                    </p>
                    <p className={`text-[16px] dark:text-white mt-5 font-mono ${changeLogo ? '' : 'mx-auto'}`}>
                        <Link to="/employeeValidation" style={{display: "flex", alignItems: "center", gap: 7, padding: "0px 20px"}} className={isActiveLink("/employeeValidation") ? "text-[#5369F8]" : ""}><FaHistory className="text-[32px]" /><span className={`${hideText}`}>User Validation</span></Link>
                    </p>
                    <p className={`text-[16px] dark:text-white mt-5 font-mono ${changeLogo ? '' : 'mx-auto'}`}>
                        <a style={{display: "flex", alignItems: "center", gap: 7, padding: "0px 20px"}}><IoSettingsOutline className="text-[32px]" /><span className={`${hideText}`}>Settings</span></a>
                    </p>
                    <p className={`text-[16px] dark:text-white mt-5 font-mono ${changeLogo ? '' : 'mx-auto'}`}>
                        <Link to='/signin' style={{display: "flex", alignItems: "center", gap: 7, padding: "0px 20px"}}><PiSignInBold className="text-[32px]" /><span className={`${hideText}`}>Sign In</span></Link>
                    </p>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;

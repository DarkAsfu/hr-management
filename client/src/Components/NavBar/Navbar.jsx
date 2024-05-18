import { useEffect, useState } from 'react';
import './NavBar.css'
const Navbar = () => {
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        if(theme === 'dark'){
            document.documentElement.classList.add("dark");
        }else{
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);
    // setTheme('light')
    const toogleDarkMode = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    };
    return (
        <div className="w-[80%] ml-[20%] mt-[-17%] md:mt-[1%] lg:w-[100%] md:ml-[5%] md:w-[90%] lg:ml-[0] lg:mt-0 navbar md:pl-[45px] md:pr-[22px] nav-bg ">
            <div className="flex-1">
                <h1 className="font-semibold text-[24px] text-[#646F75] dark:text-white">Logo</h1>
            </div>
            <div className="flex-none gap-3">
                <label className="cursor-pointer grid place-items-center">
                    <input type="checkbox" onClick={toogleDarkMode}  className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2 border-2 w-14 h-8 border-[#5369F8]" style={{background: '#5369F8'}} />
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-12 rounded-full">
                            <img alt="profile" src="https://st.depositphotos.com/1038117/5140/i/450/depositphotos_51406415-stock-photo-blue-sky-and-sun.jpg" />
                        </div>

                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
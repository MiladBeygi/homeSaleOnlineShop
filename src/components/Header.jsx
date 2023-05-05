import { Navbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

const Header = (props) => {
    const { backGround } = props;
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, isDarkTheme, setIsDarkTheme } = useContext(UserContext);
    useEffect(() => {
        if (sessionStorage.getItem("ACCESS_TOKEN")) {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn])
    const logOutHandler = (event) => {
        sessionStorage.removeItem("ACCESS_TOKEN");
        setIsLoggedIn(false);
    }
    const themeChangeHandler = () => {
        if (!isDarkTheme) {
            setIsDarkTheme(true);
            sessionStorage.setItem("IS_DARK_THEME", JSON.stringify(true))
        } else {
            setIsDarkTheme(false);
            sessionStorage.removeItem("IS_DARK_THEME");
        }
    }
    return <>
        <div className={`flex justify-center items-center px-5  ${backGround ? "bg-slate-800 text-slate-100" : ""} `} dir="rtl">
            <div className="w-1/4 flex">
                <Link to='/'>
                    <img className="w-[50px] " src="img/logo.png" alt="logo" />
                </Link>
                <Button onClick={themeChangeHandler} classes='bg-sky-600'>{"تغییر رنگ تم"}</Button>
            </div>
            <div className="flex items-center justify-start w-2/4">

                {isLoggedIn && <Link className='m-2' to='/add-advertisement'>افزودن آگهی </Link>}
                <Link className='m-2' to='/advertises'>
                    آگهی‌ها
                </Link>
            </div>
            <div className="justify-end w-2/4 sm:flex">
                {!isLoggedIn && <Button onClick={() => navigate("../../../registration")} classes='m-2'>
                    ثبت نام
                </Button>}
                {!isLoggedIn && <Button onClick={() => navigate("../../../login")} classes='m-2'>
                    ورود
                </Button>}
                {isLoggedIn && <Button classes='bg-red-500 m-2' onClick={logOutHandler}>خروج</Button>}
            </div>
        </div>
        <hr />
    </>
}
export default Header;
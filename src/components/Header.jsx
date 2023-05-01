import { Navbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

const Header = (props) => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    useEffect(() => {
        if (sessionStorage.getItem("ACCESS_TOKEN")) {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn])
    const logOutHandler = (event) => {
        sessionStorage.removeItem("ACCESS_TOKEN");
        setIsLoggedIn(false);
    }
    return <>
        <div className="flex justify-center items-center mx-5 " dir="rtl">
            <div className="w-1/4">
                <Link to='/'>
                    <img className="w-[50px] " src="img/logo.png" />
                </Link>
            </div>
            <div className="flex items-center justify-start w-2/4">

                <Link className='m-2' to='/add-adverstiement'>افزودن آگهی </Link>
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
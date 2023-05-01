import { Navbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";

const Header = (props) => {
    const navigate = useNavigate();
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
                <Button onClick={() => navigate("../../../registration")} classes='m-2'>
                    ثبت نام
                </Button>
                <Button onClick={() => navigate("../../../login")} classes='m-2'>
                    ورود
                </Button>
            </div>
        </div>
        <hr />
    </>
}
export default Header;
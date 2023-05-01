import { useContext, useEffect } from "react";
import Header from "../components/Header";
import { UserContext } from "../App";
import Footer from "../components/Footer";

const MainLayout = (props) => {
    const { isDarkTheme, setIsDarkTheme } = useContext(UserContext)
    useEffect(() => {

    }, [isDarkTheme])

    const { children } = props;
    return <>
        <Header backGround={isDarkTheme} />
        <div className={`${isDarkTheme ? "bg-slate-800 text-slate-100" : ""} min-h-[500px]`}>
            {children}
        </div >
        <Footer backGround={isDarkTheme} />

    </>
}
export default MainLayout;
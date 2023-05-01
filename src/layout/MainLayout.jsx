import { useContext, useEffect } from "react";
import Header from "../components/Header";
import { UserContext } from "../App";

const MainLayout = (props) => {

    const { children } = props;
    return <>
        <Header />
        <div>
            {children}
        </div>
    </>
}
export default MainLayout;
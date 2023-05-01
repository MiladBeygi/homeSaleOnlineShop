import Header from "../components/Header";

const MainLayout = (props) => {
    const { children } = props;
    return <>
        <Header />
        {children}
    </>
}
export default MainLayout;
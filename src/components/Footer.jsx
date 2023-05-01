const Footer = (props) => {
    const { backGround } = props;
    return <>
        <hr />
        <div className={`text-center py-5 ${backGround ? "bg-slate-800 text-slate-100" : ""}`}>
            Implemented By <a className="underline" href="https://github.com/MiladBeygi">Milad Beygi</a>
        </div>
    </>
}
export default Footer;
const Button = (props) => {
    const { children, classes, onClick, type } = props;
    return <>
        <div className="m-1">
            <button {...props} type={type} onClick={onClick} className={`bg-green-500 text-2xl px-5 py-1 rounded-xl text-slate-100 hover:bg-slate-300 hover:text-green-500 w-full disabled:bg-slate-500 disabled:text-slate-100 ${classes}`}>
                {children}
            </button>
        </div>
    </>
}
export default Button;
import React from "react";

const Button = React.forwardRef((props, ref) => {
    const { children, classes, onClick, type, className } = props;
    return <>
        <div ref={ref} className={`m-1 ${className}`}>
            <button {...props} type={type} onClick={onClick} className={`bg-green-500 pb-3 text-md px-5 py-1 rounded-xl text-slate-100 hover:bg-slate-300 hover:text-green-500 w-full disabled:bg-slate-500 disabled:text-slate-100 ${classes}`}>
                {children}
            </button>
        </div>
    </>
})
export default Button;
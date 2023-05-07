import { useContext } from "react";
import { UserContext } from "../App";

const Input = (props) => {
    const { isDarkTheme } = useContext(UserContext);
    const { placeholder, classes, value, onChange, id, label, onBlur, className } = props;
    return <>
        <div className={`flex flex-col justify-center items-start h-[100px] mx-2 ${className}`} dir="rtl">
            <label className="text-xl my-2 mx-5 " htmlFor={id}>{label}</label>
            <input {...props} onBlur={onBlur} id={id} className={`w-full rounded-2xl text-sky-800 font-bold ${classes} `} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    </>
}
export default Input;
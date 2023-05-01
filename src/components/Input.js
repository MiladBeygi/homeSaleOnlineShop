const Input = (props) => {
    const { placeholder, classes, value, onChange, id, label, onBlur } = props;
    return <>
        <div className="flex flex-col justify-center items-start" dir="rtl">
            <label className="text-xl my-2 mx-5 " htmlFor={id}>{label}</label>
            <input onBlur={onBlur} id={id} className={`w-full rounded-2xl ${classes}`} type="text" placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    </>
}
export default Input;
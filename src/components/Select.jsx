const Select = (props) => {
    const { id, name, classes, onChange, label } = props;
    return <>
        <div className="">
            <label htmlFor={id}>
                {label}
            </label>
            <select onChange={onChange} className={`text-sky-800 font-bold rounded-2xl m-2 ${classes}`} id={id} name={name}>
                <option value={true}>دارد</option>
                <option value={false} >ندارد</option>
            </select>
        </div>
    </>
}
export default Select;
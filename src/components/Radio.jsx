const Radio = (props) => {
    const { firstId, secondId, legend, firstLabel, secondLabel, radioName, firstValue, secondValue, firstValueOnchange, secondValueOnChange } = props;
    return <>
        <div className="flex m-5">
            <div className="mx-5" htmlFor="parking">{legend}</div>
            <div className="mx-5">
                <label className="mx-2" htmlFor={firstId}>{firstLabel}</label>
                <input onChange={firstValueOnchange} id={firstId} type="radio" name={radioName} value={firstValue} />
            </div>
            <div className="mx-5">
                <label className="mx-2" htmlFor={secondId}>{secondLabel}</label>
                <input onChange={secondValueOnChange} id={secondId} type="radio" name={radioName} value={secondValue} />
            </div>
        </div>
    </>
}
export default Radio;
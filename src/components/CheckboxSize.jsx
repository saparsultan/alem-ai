const CheckboxSize = ({ children, value, onChange, checked = "9x16" }) => {
    return (
        <label className="checkboxSize" htmlFor={value}>
            <input type="radio" id={value} value={value} name="artwork-size" onChange={onChange} checked={checked === value} style={{display: "none"}} />
            <div className="checkboxSizeContent">
                <div className="checkboxSizeContentWrap" style={checked === value ? {borderColor: "#d7c9fc"} : {}}>
                    {children}
                </div>
                <span>{value}</span>
            </div>
        </label>
    );
};
export default CheckboxSize
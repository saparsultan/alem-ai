const CheckboxSize = ({ children, value, onChange, checked = "9x16" }) => {
    return (
        <label className="checkboxSize" htmlFor={value}>
            <input type="radio" id={value} value={value} name="artwork-size" onChange={onChange} checked={checked === value} style={{display: "none"}} />
            <div className={`checkboxSizeContent checkboxSizeContent-${value}`} style={checked === value ? {backgroundColor: "#d7c9fc"} : {}}>
                <span style={checked === value ? {color: "#1c1c2a"} : {}}>{value}</span>
            </div>
        </label>
    );
};
export default CheckboxSize
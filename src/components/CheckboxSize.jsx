const CheckboxSize = ({ value, onChange, checked = "9x16", loading }) => {
    return (
        <label className="checkboxSize" htmlFor={value}>
            <input type="radio" id={value} value={value} name="artwork-size" onChange={onChange} checked={checked === value} style={{display: "none"}} disabled={loading} />
            <div className={loading ? `checkboxSizeContent checkboxSizeContent-${value} notAllowed` : `checkboxSizeContent checkboxSizeContent-${value}`} style={checked === value ? {backgroundColor: "#e2b0ff"} : {}}>
                <span style={checked === value ? {color: "#1c1c2a"} : {}}>{value}</span>
            </div>
        </label>
    );
};
export default CheckboxSize
import StylesLoader from "./StylesLoader";

const SettingStyles = ({data, handleChangeStyles, value, loading}) => {
    const accentBorder = {borderColor: `#e2b0ff`, opacity: "1"}
    const arrayLoader = Array.from({length: 8}, (_, index) => index + 1)

    return (
        <div className="setting-styles__wrap">
            {
                data.length > 0 ?
                    data.map(({id, name, photo_url}) => (
                        <div className="styles-item" key={id + name}>
                            <label className={loading ? "styles-item__img notAllowed" : "styles-item__img"} htmlFor={id}
                                   style={value === id ? accentBorder : {}}>
                                <img className="styles-item__" src={photo_url} alt={name} width="100px"
                                     height="100px"
                                     loading="lazy"/>
                            </label>
                            <input type="radio" id={id} value={id} name="artwork-styles"
                                   onChange={handleChangeStyles}
                                   checked={value === id} style={{display: "none"}} disabled={loading}/>
                            <div className="styles-item__desc">
                                {name}
                            </div>
                        </div>
                    ))
                    :
                    arrayLoader.map((item) => (
                        <StylesLoader className="styles-loader" key={item}/>
                    ))
            }
        </div>
    )
}
export default SettingStyles
import React, {useEffect, useState} from "react";

const SettingStyles = ({data, handleChangeStyles, value}) => {
    const accentBorder = {borderColor: `var(--accent-color)`, opacity: "1"}
    const [slicedFirstStylesData, setSlicedFirstStylesData] = useState([])
    const [slicedSecondStylesData, setSlicedSecondStylesData] = useState([])

    useEffect(() => {
        const splitIndex = Math.floor(data?.length / 2);
        setSlicedFirstStylesData(data.slice(0, splitIndex))
        setSlicedSecondStylesData(data.slice(splitIndex, data?.length))
    }, [data])

    return (
        <div className="setting-styles__wrap">
            <div className="setting-styles__row">
                {
                    slicedFirstStylesData.map(({id, name, photo_url}) => (
                        <div className="styles-item" key={id + name}>
                            <label className="styles-item__img" htmlFor={id} style={value === id ? accentBorder : {}}>
                                <img className="styles-item__" src={photo_url} alt={name} width="100px" height="100px"
                                     loading="lazy"/>
                            </label>
                            <input type="radio" id={id} value={id} name="artwork-styles" onChange={handleChangeStyles}
                                   checked={value === id} style={{display: "none"}}/>
                            <div className="styles-item__desc">
                                {name}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="setting-styles__row">
                {
                    slicedSecondStylesData.map(({id, name, photo_url}) => (
                        <div className="styles-item" key={id + name}>
                            <label className="styles-item__img" htmlFor={id} style={value === id ? accentBorder : {}}>
                                <img className="styles-item__" src={photo_url} alt={name} width="100px" height="100px"
                                     loading="lazy"/>
                            </label>
                            <input type="radio" id={id} value={id} name="artwork-styles" onChange={handleChangeStyles}
                                   checked={value === id} style={{display: "none"}}/>
                            <div className="styles-item__desc">
                                {name}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SettingStyles
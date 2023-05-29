import React, {useState, useEffect, CSSProperties} from "react";
import {HashLoader} from 'react-spinners';
import CheckboxSize from "./CheckboxSize";
import SettingStyles from "./SettingStyles";
import emptyImg from "../assets/images/gradient.jpg"
import downloadSvg from "../assets/images/download.svg"
import size1 from "../assets/images/9x16.svg"
import size2 from "../assets/images/1x1.svg"
import size3 from "../assets/images/16x9.svg"
import size4 from "../assets/images/4x3.svg"
import size5 from "../assets/images/3x4.svg"

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const BaseImage = () => {
    const HTTP_GENERATE = "https://api.amadao.network/api/dream/generate";
    const HTTP_STYLES = "https://api.amadao.network/api/dream/styles";
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(27);
    const [size, setSize] = useState("9x16");
    const [prompt, setPrompt] = useState("");
    const [stylesData, setStylesData] = useState([]);
    const [imageGenerate, setImageGenerate] = useState(null);

    useEffect(() => {
        fetchStyles().then(r => {
            console.log("styles", r)
            setStylesData(r)
        }).catch(e => console.error(e))
    }, [])

    async function fetchStyles() {
        const res = await fetch(`${HTTP_STYLES}`)
        return await res.json()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        fetch(`${HTTP_GENERATE}`, {
            method: "POST",
            headers: {},
            body: JSON.stringify({description: prompt, style: value, ratio: size})
        }).then((res) => res.json()).then((resJson) => {
            console.log("resJson", resJson)
            setImageGenerate(resJson)
        }).catch((e) => {
            console.error(e);
        }).finally(() => setLoading(false));
    };

    const handleChange = (e) => {
        setSize(e.target.value);
    };
    const handlePrompt = (e) => {
        setPrompt(e.target.value);
    };

    const handleChangeStyles = (e) => {
        setValue(+e.target.value);
    };
    const handleDownload = (imageUrl, e) => {
        e.preventDefault()
        const link = document.createElement('a');
        if (imageUrl) {
            link.href = imageUrl;
            link.download = imageUrl;
            link.click();
        }
    };

    return (
        <div className="base base--create-image">
            <div className="create-image">
                <h2>Создать произведений искусства</h2>
                <div className="artwork-grid">
                    <div className="artwork-setting">
                        <div className="artwork-item artwork-setting__size">
                            <h3 className="artwork-title">Размер произведения</h3>
                            <div className="setting-size">
                                <CheckboxSize value="9x16" onChange={handleChange} checked={size}>
                                    <img src={size1} alt="9x16"/>
                                </CheckboxSize>
                                <CheckboxSize value="1x1" onChange={handleChange} checked={size}>
                                    <img src={size2} alt="1x1"/>
                                </CheckboxSize>
                                <CheckboxSize value="16x9" onChange={handleChange} checked={size}>
                                    <img src={size3} alt="16x9"/>
                                </CheckboxSize>
                                <CheckboxSize value="4x3" onChange={handleChange} checked={size}>
                                    <img src={size4} alt="4x3"/>
                                </CheckboxSize>
                                <CheckboxSize value="3x4" onChange={handleChange} checked={size}>
                                    <img src={size5} alt="3x4"/>
                                </CheckboxSize>
                            </div>
                        </div>
                        <div className="artwork-item artwork-setting__prompt setting-prompt">
                            <div className="artwork-title setting-prompt__caption">Введите подсказку</div>
                            <input type="text" className="setting-prompt__input" placeholder="Напишите что-нибудь"
                                   value={prompt} onChange={handlePrompt}/>
                        </div>
                        <div className="artwork-title setting-prompt__caption">Выберите стиль произведения</div>
                        <div className="artwork-item artwork-setting__styles setting-styles">
                            <SettingStyles data={stylesData} value={value} handleChangeStyles={handleChangeStyles}/>
                        </div>
                        <button className="setting-submit" onClick={handleSubmit} disabled={prompt === ""}>Создать
                        </button>
                    </div>
                    <div className="artwork-result">
                        <h3 className="artwork-title artwork-result__title">Результат произведения</h3>
                        <div className="artwork-result__image">
                            {
                                loading && <div className="artwork-result__loader result-loader">
                                    <HashLoader
                                        color="#a47af9"
                                        cssOverride={override}
                                        size={50}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                    <div className="result-loader__title">Создание...</div>
                                </div>
                            }
                            {
                                imageGenerate ? <img src={imageGenerate?.result} alt={imageGenerate?.model?.name}/> :
                                    <img src={emptyImg} alt="empty img"/>
                            }
                            {
                                imageGenerate?.result &&
                                <button onClick={(e) => handleDownload(imageGenerate?.result, e)}
                                        className="artwork-result__download">
                                    <img src={downloadSvg} alt="Download image"/>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseImage;

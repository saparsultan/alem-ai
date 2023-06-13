import React, {useState, useEffect} from "react";
import {HashLoader} from 'react-spinners';
import CheckboxSize from "./CheckboxSize";
import SettingStyles from "./SettingStyles";
import ModalEdit from "./ModalEdit";
import downloadSvg from "../assets/images/download.svg"
import expandSvg from "../assets/images/expand.svg"
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
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(27);
    const [size, setSize] = useState("9x16");
    const [prompt, setPrompt] = useState("");
    const [stylesData, setStylesData] = useState([]);
    const [imageGenerate, setImageGenerate] = useState(null);

    const [open, setOpen] = useState(false);
    const [isPreview, setIsPreview] = useState(false);

    useEffect(() => {
        fetchStyles().then(r => {
            setStylesData(r)
        }).catch(e => console.error(e))
    }, [])

    async function fetchStyles() {
        const res = await fetch(process.env.REACT_APP_HTTP_STYLES || "https://api.amadao.network/api/dream/styles")
        return await res.json()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        fetch(process.env.REACT_APP_HTTP_GENERATE || "https://api.amadao.network/api/dream/generate", {
            method: "POST",
            headers: {},
            body: JSON.stringify({style: value, description: prompt, ratio: size})
        }).then((res) => res.json()).then((resJson) => {
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

    const handleOpenModal = (e) => {
        e.preventDefault()
        setIsPreview(false)
        setOpen(!open)
    }

    const handleOpenModalPreview = (e) => {
        e.preventDefault()
        setIsPreview(!isPreview)
        setOpen(!open)
    }

    const isNotAllowed = loading ? {cursor: "not-allowed"} : {}

    return (
        <>
            <div className="base base--create-image">
                <div className="create-image">
                    {/*<h2>Создать произведений искусства</h2>*/}
                    <div className="artwork-grid">
                        <form className="artwork-setting" style={isNotAllowed} onSubmit={handleSubmit}>
                            <div className="artwork-item artwork-setting__size">
                                <h3 className="artwork-title">Размер произведения</h3>
                                <div className="setting-size">
                                    <CheckboxSize value="9x16" onChange={handleChange} checked={size} loading={loading}>
                                        <img src={size1} alt="9x16"/>
                                    </CheckboxSize>
                                    <CheckboxSize value="1x1" onChange={handleChange} checked={size} loading={loading}>
                                        <img src={size2} alt="1x1"/>
                                    </CheckboxSize>
                                    <CheckboxSize value="16x9" onChange={handleChange} checked={size} loading={loading}>
                                        <img src={size3} alt="16x9"/>
                                    </CheckboxSize>
                                    <CheckboxSize value="4x3" onChange={handleChange} checked={size} loading={loading}>
                                        <img src={size4} alt="4x3"/>
                                    </CheckboxSize>
                                    <CheckboxSize value="3x4" onChange={handleChange} checked={size} loading={loading}>
                                        <img src={size5} alt="3x4"/>
                                    </CheckboxSize>
                                </div>
                            </div>
                            <div className="artwork-item artwork-setting__prompt setting-prompt">
                                <div className="artwork-title setting-prompt__caption">Введите подсказку</div>
                                <input type="text" className="setting-prompt__input" placeholder="Напишите что-нибудь"
                                       value={prompt} onChange={handlePrompt} style={isNotAllowed} disabled={loading} />
                            </div>
                            <div className="artwork-title setting-prompt__caption">Выберите стиль произведения</div>
                            <div className="artwork-item artwork-setting__styles setting-styles">
                                <SettingStyles data={stylesData} value={value} handleChangeStyles={handleChangeStyles} loading={loading}/>
                            </div>
                            <button className="setting-submit" type="submit" disabled={prompt === "" || loading}>Создать
                            </button>
                        </form>
                        <div className="artwork-result">
                            <div className="artwork-result__header">
                                <h3 className="artwork-title artwork-result__title">Результат произведения</h3>
                                <button className="artwork-result__download btn-action"
                                        onClick={handleOpenModalPreview} disabled={!imageGenerate?.result || loading}>
                                    <img src={expandSvg} alt="Expand"/>
                                </button>
                            </div>
                            <div className="artwork-result__wrapper">
                                <div className="artwork-result__image">
                                    {
                                        loading && <div className="artwork-result__loader result-loader">
                                            <HashLoader
                                                color="#e2b0ff"
                                                cssOverride={override}
                                                size={42}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                            <div className="result-loader__title">Создание...</div>
                                        </div>
                                    }
                                    {
                                        (imageGenerate && !loading) && <img src={imageGenerate?.result} alt={imageGenerate?.model?.name}/>
                                    }
                                </div>
                                <div className="artwork-result__footer">
                                    <button className="artwork-result__edit btn-action"
                                             onClick={handleOpenModal} title="В разработке..." disabled>Изменить
                                    </button>
                                    <button onClick={(e) => handleDownload(imageGenerate?.result, e)}
                                            className="artwork-result__download btn-action"
                                            disabled={!imageGenerate?.result || loading}>
                                        <img src={downloadSvg} alt="Download"/>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {
                open && <ModalEdit open={open} isPreview={isPreview} handleOpen={handleOpenModal} data={imageGenerate} description={prompt} style={value} ratio={size} idImg={imageGenerate?.id} />
            }
        </>
    );
};

export default BaseImage;

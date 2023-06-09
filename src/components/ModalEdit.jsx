import React, {useEffect, useState} from "react";
import downloadSvg from "../assets/images/download.svg";
const ModalEdit = ({open,isPreview, handleOpen, data, style, ratio, idImg}) => {
    const [editText, setEditText] = useState("")
    const [sumEditText, setSumEditText] = useState(0)
    const [sumSubmit, setSumSubmit] = useState(0)
    const [modifyData, setModifyData] = useState(new Map())
    const [result, setResult] = useState(null)
    const [keyCurrentMap, setKeyCurrentMap] = useState(0)

    useEffect(() => {
        setModifyData(new Map(modifyData.set(0, data)))
    }, [data])

    const onChangeHandle = (e) => {
        const {value} = e.target
        setSumEditText(value.length)
        setEditText(value)
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_HTTP_GENERATE || "https://api.amadao.network/api/dream/generate", {
            method: "POST",
            headers: {},
            body: JSON.stringify({taskId: idImg, style: style, description: editText, ratio: ratio })
        }).then((res) => res.json()).then((resJson) => {
            console.log("-----", resJson)
            const newKey = keyCurrentMap+1
            setKeyCurrentMap(newKey)
            setModifyData(new Map(modifyData.set(newKey, resJson)))
            setSumSubmit(sumSubmit + 1)
        }).catch((e) => {
            console.error(e);
        });

    }

    const funcSumSubmit = () => {
        const sumObject = {
            color: "rgba(255, 255, 255, 0.4)"
        }
        if (sumSubmit > 0 && sumSubmit < 2) {
            sumObject.color = "orange"
        } else if (sumSubmit > 1) {
            sumObject.color = "red"
        }
        return sumObject
    }

    useEffect(() => {
        setResult(modifyData.get(keyCurrentMap))
    }, [keyCurrentMap, modifyData])

    const handlePrevResult = (e) => {
        e.preventDefault()
        setKeyCurrentMap(keyCurrentMap-1)
    }
    const handleNextResult = (e) => {
        e.preventDefault()
        setKeyCurrentMap(keyCurrentMap+1)
    }

    return (
        <div className={open ? 'modal__overlay modal__overlay--visible' : 'modal__overlay'}>
            <div className="modal__container">
                <div className="modal" style={isPreview ? {justifyContent: "center"} : {}}>
                    <div className="modal-image" style={isPreview ? {maxWidth: "350px"} : {}}>
                        <div className={isPreview ? "modal-image__container modal-image__container--preview" : "modal-image__container"} style={isPreview ? {width: "min(100%,calc(calc(calc(calc(9.290000000000001px * 100) - 64px) - (2 * 35px) - 34px - 24px) * 0.6122448979591837))"} : {}}>
                            <div className="modal-image__inner">
                                <div className="modal-image__image">
                                    <img src={result?.result} alt={result?.input_spec?.prompt}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        !isPreview && <div className="modal-content">
                            <div className="modal-content__desc">
                                Опишите изменение, которое вы хотели бы видеть на своем изображении (максимум 450 символов).
                                Эти изменения будут применены к выбранному изображению.
                            </div>
                            <div className="modal-content__edit content-edit">

                                <div className="content-edit__text">
                                    <div className="content-edit__textarea">
                                    <textarea rows="3" placeholder="Например: добавь ко всему огня" value={editText}
                                              onChange={onChangeHandle}></textarea>
                                        <button className="content-edit__button" onClick={handleSubmitEdit}
                                                style={editText === "" || sumSubmit > 2 ? {opacity: ".2", cursor: "not-allowed"} : {}}
                                                disabled={editText === ""}>
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                                 viewBox="0 0 512 512"
                                                 height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="content-edit__actions edit-actions">
                                    <div className="edit-actions__number"
                                         style={editText === "" ? {color: "rgba(255, 255, 255, 0.4)"} : {}}>
                                        {sumEditText}/450
                                    </div>
                                    <div className="edit-actions__slide">
                                        <button className="slide-btn slide-undo" onClick={handlePrevResult} disabled={keyCurrentMap === 0 || modifyData.size === 1}>
                                            Отменить
                                            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24"
                                                 height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M5.33929 4.46777H7.33929V7.02487C8.52931 6.08978 10.0299 5.53207 11.6607 5.53207C15.5267 5.53207 18.6607 8.66608 18.6607 12.5321C18.6607 16.3981 15.5267 19.5321 11.6607 19.5321C9.51025 19.5321 7.58625 18.5623 6.30219 17.0363L7.92151 15.8515C8.83741 16.8825 10.1732 17.5321 11.6607 17.5321C14.4222 17.5321 16.6607 15.2935 16.6607 12.5321C16.6607 9.77065 14.4222 7.53207 11.6607 7.53207C10.5739 7.53207 9.56805 7.87884 8.74779 8.46777L11.3393 8.46777V10.4678H5.33929V4.46777Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </button>
                                        <button className="slide-btn slide-redo" onClick={handleNextResult} disabled={keyCurrentMap === 2 || modifyData.size === 1}>
                                            Продолжить
                                            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24"
                                                 height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M13.1459 11.0499L12.9716 9.05752L15.3462 8.84977C14.4471 7.98322 13.2242 7.4503 11.8769 7.4503C9.11547 7.4503 6.87689 9.68888 6.87689 12.4503C6.87689 15.2117 9.11547 17.4503 11.8769 17.4503C13.6977 17.4503 15.2911 16.4771 16.1654 15.0224L18.1682 15.5231C17.0301 17.8487 14.6405 19.4503 11.8769 19.4503C8.0109 19.4503 4.87689 16.3163 4.87689 12.4503C4.87689 8.58431 8.0109 5.4503 11.8769 5.4503C13.8233 5.4503 15.5842 6.24474 16.853 7.52706L16.6078 4.72412L18.6002 4.5498L19.1231 10.527L13.1459 11.0499Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="edit-actions__limit" style={funcSumSubmit()}>
                                        {sumSubmit}/2 правок
                                    </div>
                                </div>

                                <div className="content-edit__finish edit-finish">
                                    <button className="artwork-result__download btn-action" style={{ background: "rgba(255, 255, 255, 0.1)", width: "40px", height: "38px"}}>
                                        <img src={downloadSvg} alt="Download"/>
                                    </button>
                                    <div className="edit-finish__btn">
                                        <button
                                            className="save-btn">Сохранить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <button className="modal__close" onClick={handleOpen}>
                    <div className="modal__close--svg">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0.5" viewBox="0 0 512 512"
                             height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default ModalEdit;
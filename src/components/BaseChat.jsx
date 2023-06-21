import React, {Fragment, useEffect, useState} from "react";
import ReactLoading from "react-loading";
import cx from "classnames";
import userSvg from "../assets/images/person.svg";
import logo from "../assets/images/logo.png";

const BaseChat = () => {
    const [message, setMessage] = useState("");
    const [dialogue, setDialogue] = useState([]);
    const [question, setQuestion] = useState(null);
    const [mp3, setMp3] = useState("");

    const [changeQuery, setChangeQuery] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const changeMessage = (e) => {
        const {value} = e.target;
        setMessage(value);
        setQuestion(value);
    };

    const handleClearMessage = (e) => {
        e.preventDefault();
        setDialogue([]);
    };

    async function postData(e) {
        dialogue.push({role: "user", content: question});
        setChangeQuery(true);
        setLoaded(true);
        setMessage("");
        e.preventDefault();
        await fetch("https://api.amadao.network/api/openai/dialogue", {
            method: "POST",
            body: JSON.stringify({dialogue: dialogue}),
        })
            .then((res) => res.json())
            .then((res) => {
                setDialogue([...dialogue, res.text]);
                setMp3(res.audio["audioData"]);
            })
            .catch((err) => console.error(err));
        setLoaded(false);
    }

    useEffect(() => {
        if (dialogue.length <= 0) {
            setChangeQuery(false);
        }
    }, [dialogue]);

    return (
        <div className="base">
            <div className="chats">
                <div className="content">
                    {changeQuery ? (
                        <div className="text-grid">
                            {(
                                dialogue.length > 0 &&
                                dialogue.map(({role, content}, i) => {
                                    return (
                                        <Fragment key={i}>
                                            <div
                                                className={cx("message", {
                                                    "message--user": role === "user",
                                                    "message--ai": role === "assistant",
                                                })}
                                            >
                                                <div
                                                    className={cx("message__avatar", {
                                                        "message__avatar--user": role === "user",
                                                    })}
                                                >
                                                    <img
                                                        src={role === "user" ? userSvg : logo}
                                                        alt={role}
                                                    />
                                                </div>
                                                <div className="message__text">
                                                    <p>{content}</p>
                                                </div>
                                            </div>
                                        </Fragment>
                                    );
                                })
                            )}
                            <div className="message__audio" style={{display: "none"}}>
                                <audio
                                    src={`data:audio/wav;base64,${mp3}`}
                                    controls
                                    autoPlay
                                ></audio>
                            </div>
                        </div>
                    ) : (
                        <div className="content__empty">
                            <h1>Чат бот AISHA AI</h1>
                            <p>Получите ответ на ваш вопрос</p>
                        </div>
                    )}
                </div>
            </div>

            {dialogue.length > 0 && (
                <div
                    className="clear-message"
                    onClick={handleClearMessage}
                    title="Очистить историю чата"
                >
                    <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.49805 21.6882C6.94805 21.6882 6.47721 21.4924 6.08555 21.1007C5.69388 20.7091 5.49805 20.2382 5.49805 19.6882V6.68823C5.21471 6.68823 4.97721 6.5924 4.78555 6.40073C4.59388 6.20907 4.49805 5.97157 4.49805 5.68823C4.49805 5.4049 4.59388 5.1674 4.78555 4.97573C4.97721 4.78407 5.21471 4.68823 5.49805 4.68823H9.49805C9.49805 4.4049 9.59388 4.1674 9.78555 3.97573C9.97721 3.78407 10.2147 3.68823 10.498 3.68823H14.498C14.7814 3.68823 15.0189 3.78407 15.2105 3.97573C15.4022 4.1674 15.498 4.4049 15.498 4.68823H19.498C19.7814 4.68823 20.0189 4.78407 20.2105 4.97573C20.4022 5.1674 20.498 5.4049 20.498 5.68823C20.498 5.97157 20.4022 6.20907 20.2105 6.40073C20.0189 6.5924 19.7814 6.68823 19.498 6.68823V19.6882C19.498 20.2382 19.3022 20.7091 18.9105 21.1007C18.5189 21.4924 18.048 21.6882 17.498 21.6882H7.49805ZM7.49805 6.68823V19.6882H17.498V6.68823H7.49805ZM9.49805 16.6882C9.49805 16.9716 9.59388 17.2091 9.78555 17.4007C9.97721 17.5924 10.2147 17.6882 10.498 17.6882C10.7814 17.6882 11.0189 17.5924 11.2105 17.4007C11.4022 17.2091 11.498 16.9716 11.498 16.6882V9.68823C11.498 9.4049 11.4022 9.1674 11.2105 8.97573C11.0189 8.78407 10.7814 8.68823 10.498 8.68823C10.2147 8.68823 9.97721 8.78407 9.78555 8.97573C9.59388 9.1674 9.49805 9.4049 9.49805 9.68823V16.6882ZM13.498 16.6882C13.498 16.9716 13.5939 17.2091 13.7855 17.4007C13.9772 17.5924 14.2147 17.6882 14.498 17.6882C14.7814 17.6882 15.0189 17.5924 15.2105 17.4007C15.4022 17.2091 15.498 16.9716 15.498 16.6882V9.68823C15.498 9.4049 15.4022 9.1674 15.2105 8.97573C15.0189 8.78407 14.7814 8.68823 14.498 8.68823C14.2147 8.68823 13.9772 8.78407 13.7855 8.97573C13.5939 9.1674 13.498 9.4049 13.498 9.68823V16.6882Z"
                            fill="currentColor"
                        />
                    </svg>
                    <span>Очистить историю</span>
                </div>
            )}

            <form className="form" onSubmit={postData}>
                <div className="form__content">
                    <input
                        className="form__input"
                        placeholder="Ваш вопрос..."
                        required
                        type="text"
                        value={message}
                        onChange={changeMessage}
                    />
                    {
                        !loaded ? <button className={message === "" ? "form__btn" : "form__btn form__btn--active"} type="submit" disabled={message === ""}>
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.96445 19.9517C4.63112 20.085 4.31445 20.0557 4.01445 19.8637C3.71445 19.6723 3.56445 19.3933 3.56445 19.0267V15.3017C3.56445 15.0683 3.63112 14.86 3.76445 14.6767C3.89779 14.4933 4.08112 14.3767 4.31445 14.3267L11.5645 12.5267L4.31445 10.7267C4.08112 10.6767 3.89779 10.56 3.76445 10.3767C3.63112 10.1933 3.56445 9.985 3.56445 9.75167V6.02667C3.56445 5.66 3.71445 5.38067 4.01445 5.18867C4.31445 4.99733 4.63112 4.96833 4.96445 5.10167L20.3645 11.6017C20.7811 11.785 20.9895 12.0933 20.9895 12.5267C20.9895 12.96 20.7811 13.2683 20.3645 13.4517L4.96445 19.9517Z"/>
                            </svg>
                        </button> : <ReactLoading
                            className="form__btn text-grid__typing"
                            type="bubbles"
                            color="#fff"
                        />
                    }
                </div>
            </form>
        </div>
    );
};

export default BaseChat;

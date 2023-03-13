import React, { Fragment, useEffect, useState } from "react";
import userSvg from "../assets/images/person.svg"
import logo from "../assets/images/logo.png"

const BaseChat = () => {
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([
    {
      question: "Сәлем",
      answer: "Сәлеметсізбе, хәлініз қалай?",
    }
  ]);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");

  
  const [messageClick, setMessageClick] = useState("");

  const changeMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
    const data = {
      question: value,
    };
    setQuestion(data);
  };

  console.log("messageArray", messageArray)

  async function postData() {
    // Default options are marked with *
    setMessageClick(message)
    await fetch("https://api.amadao.network/api/openai/", {
      method: "POST",

      body: JSON.stringify(question),
    })
      .then((res) => res.json())
      .then((res) => setAnswer(res?.answer))
      .catch((err) => console.log(err));
    // parses JSON response into native JavaScript objects
  }

  useEffect(() => {
    const data = {
      question: messageClick,
      answer: answer,
    };
    if(messageClick !== "" && answer !== "") {
      setMessageArray((pre) => [...pre, data]);
    }
    setAnswer("")
  }, [messageClick, answer])

  return (
    <div className="base">
      <div className="chats">
        <div className="content">
          {messageArray.length > 0 ?
            messageArray.map((item, i) => (
              <Fragment key={i+item?.question}>
                <div className="message message--user">
                  <div className="message__avatar message__avatar--user">
                    <img
                      src={userSvg}
                      alt=""
                    />
                  </div>
                  <div className="message__text">
                    <p>{item?.question}</p>
                  </div>
                </div>

                <div className="message message--ai">
                  <div className="message__avatar">
                    <img
                      src={logo}
                      alt=""
                    />
                  </div>
                  <div className="message__text">
                    <p>{item?.answer}</p>
                  </div>
                </div>
              </Fragment>
            )) : <div className="content__empty"><h1>Введите ваш вопрос</h1></div> }
        </div>
      </div>
      
      <div className="form">
          <input
            className="form__input"
            placeholder="Ваш вопрос..."
            required
            type="text"
            value={message}
            onChange={changeMessage}
          />
          <button className="form__btn" onClick={postData}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.96445 19.9517C4.63112 20.085 4.31445 20.0557 4.01445 19.8637C3.71445 19.6723 3.56445 19.3933 3.56445 19.0267V15.3017C3.56445 15.0683 3.63112 14.86 3.76445 14.6767C3.89779 14.4933 4.08112 14.3767 4.31445 14.3267L11.5645 12.5267L4.31445 10.7267C4.08112 10.6767 3.89779 10.56 3.76445 10.3767C3.63112 10.1933 3.56445 9.985 3.56445 9.75167V6.02667C3.56445 5.66 3.71445 5.38067 4.01445 5.18867C4.31445 4.99733 4.63112 4.96833 4.96445 5.10167L20.3645 11.6017C20.7811 11.785 20.9895 12.0933 20.9895 12.5267C20.9895 12.96 20.7811 13.2683 20.3645 13.4517L4.96445 19.9517Z"
              />
            </svg>
          </button>
        </div>
    </div>
  );
};

export default BaseChat;

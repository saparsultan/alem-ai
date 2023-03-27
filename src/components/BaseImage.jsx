import React, { useState } from "react";
import ImageLoader from "./ImageLoader";

const BaseImage = () => {
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [size, setSize] = useState("256");
  const [count, setCount] = useState(6);
  const [data, setData] = useState(null);
  const [changeQuery, setChangeQuery] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const HTTP = "https://api.amadao.network/api/openai/image";
  // const HTTP = "http://192.168.1.172:3000/api/openai/image";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChangeQuery(true);
    setLoaded(false);
    setSearch("");

    await fetch(`${HTTP}`, {
      method: "POST",
      body: JSON.stringify({ description: message, size, count }),
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
    setSearch(message);
    setMessage("");
  };

  const changeMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="base">
      <div className="chats">
        <div className="content">
          {changeQuery ? (
            <div className="images">
              <div className="images-result">
                Картинки по запросу {search && `«${search}»`}
              </div>
              <div className="images-grid">
                {loaded
                  ? data?.map(({ url }, i) => (
                      <div className="images-grid__item" key={i}>
                        <img src={url} alt="Alem AI generate images item" />
                      </div>
                    ))
                  : Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <ImageLoader key={index} title="Загрузка..." />
                      ))}
              </div>
            </div>
          ) : (
            <div className="content__empty">
              <h1>Генерация изображений</h1>
              <p>
                Будет сгенерировано 6 случайные изображения по вашему запросу
              </p>
            </div>
          )}
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__content">
          <input
            className="form__input"
            placeholder="Ваш вопрос..."
            required
            type="text"
            value={message}
            onChange={changeMessage}
          />
          <button className="form__btn" type="submit">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.96445 19.9517C4.63112 20.085 4.31445 20.0557 4.01445 19.8637C3.71445 19.6723 3.56445 19.3933 3.56445 19.0267V15.3017C3.56445 15.0683 3.63112 14.86 3.76445 14.6767C3.89779 14.4933 4.08112 14.3767 4.31445 14.3267L11.5645 12.5267L4.31445 10.7267C4.08112 10.6767 3.89779 10.56 3.76445 10.3767C3.63112 10.1933 3.56445 9.985 3.56445 9.75167V6.02667C3.56445 5.66 3.71445 5.38067 4.01445 5.18867C4.31445 4.99733 4.63112 4.96833 4.96445 5.10167L20.3645 11.6017C20.7811 11.785 20.9895 12.0933 20.9895 12.5267C20.9895 12.96 20.7811 13.2683 20.3645 13.4517L4.96445 19.9517Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BaseImage;

import React, { useState, useEffect, useRef } from "react";
import { BsHeart } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "./Button";
import * as axios from "axios";

function Qod() {
  const [qod, setQod] = useState([]);
  const [active, setActive] = useState(false);
  const [like, setLike] = useState(false);
  const [author, setAuthor] = useState([]);
  const [favQuotes, setFavQuotes] = useState([]);

  const quoteEl = useRef(null);
  const authorEl = useRef(null);

  const setFilledLike = () => {
    if (favQuotes.some((item) => item.quote === qod)) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  const getData = async () => {
    const response = await fetch("http://quotes.rest/qod?category=inspire");
    const quotes = await response.json();
    setQod(quotes.contents.quotes[0].quote);
    setAuthor(quotes.contents.quotes[0].author);
  };
  const getFavQuotes = () => {
    axios
      .get("http://localhost:8000/api/quotes/")
      .then((res) => setFavQuotes(res.data));
  };

  useEffect(() => {
    getData();
    getFavQuotes();
    setFilledLike();
  }, []);

  const handleShowClick = () => {
    quoteEl.current.classList.remove("active", "nonactive");
    authorEl.current.classList.remove("active", "nonactive");
    quoteEl.current.classList.add("active");
    setTimeout(() => {
      if (authorEl.current !== null) authorEl.current.classList.add("active");
    }, 2000);
    setActive(true);
  };

  const handleHideClick = () => {
    quoteEl.current.classList.add("nonactive");
    authorEl.current.classList.remove("active");
    quoteEl.current.classList.remove("active");
    authorEl.current.classList.add("nonactive");
    setActive(false);
  };

  useEffect(() => {
    setFilledLike();
  }, [favQuotes]);

  const addQuote = () => {
    axios
      .post("http://localhost:8000/api/quotes/add", {
        quote: qod,
        author: author,
      })
      .then((res) => console.log(res.data))
      .then(getFavQuotes);
    setLike(!like);
  };
  const deleteQuote = () => {
    favQuotes.forEach((item) => {
      if (item.quote === qod) {
        axios
          .delete(`http://localhost:8000/api/quotes/delete/${item._id}`)
          .then((res) => console.log(res.data))
          .then(getFavQuotes);
      }
    });
    setLike(!like);
  };
  return (
    <div className="qod-container">
      <div className="liked">
        <Link to="/liked">
          <p className="favorite-quotes">Favorite quotes</p>
        </Link>
      </div>
      <p className="title">Quote of the day:</p>
      <div className="buttons">
        {active ? (
          <Button
            handleClick={handleHideClick}
            newClass={"hide"}
            text={"Hide"}
          />
        ) : (
          <Button
            handleClick={handleShowClick}
            newClass={"show"}
            text={"Show"}
          />
        )}
        {like ? (
          <BsFillHeartFill className="like-button" onClick={deleteQuote} />
        ) : (
          <BsHeart className="like-button" onClick={addQuote} />
        )}
      </div>

      <blockquote ref={quoteEl} className="quote-element">
        <p className="quote">{qod}</p>
      </blockquote>

      <p ref={authorEl} className="author">
        -{author}
      </p>
    </div>
  );
}

export default Qod;

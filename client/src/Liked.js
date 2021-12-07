import React, { useEffect, useState } from "react";
import LikedItems from "./LikedItems";
import * as axios from "axios";
import { Link } from "react-router-dom";
export default function Liked() {
  const [favQuotes, setFavQuotes] = useState([]);
  const [showQuote, setShowQuote] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);

  const showQuotes = () => {
    if (favQuotes.length !== 0) {
      setTimeout(() => {
        setShowQuote(true);
      }, 0);

      setTimeout(() => {
        setShowAuthor(true);
      }, 2000);
    }
  };
  const getFavQuotes = () => {
    axios
      .get("http://localhost:8000/api/quotes/")
      .then((res) => setFavQuotes(res.data));
  };

  useEffect(() => {
    getFavQuotes();
  }, []);

  useEffect(() => {
    showQuotes();
  }, [favQuotes]);

  const deleteQuote = (id) => {
    axios
      .delete(`http://localhost:8000/api/quotes/delete/${id}`)
      .then((res) => console.log(res.data))
      .then(getFavQuotes);
  };

  return (
    <div className="qod-container">
      <Link to="/">
        <p className="back">Back</p>
      </Link>
      <p className="title">Favorite quotes:</p>
      {favQuotes?.map((item, index) => {
        return (
          <LikedItems
            key={index}
            item={item}
            deleteQuote={deleteQuote}
            showQuote={showQuote}
            showAuthor={showAuthor}
          />
        );
      })}
    </div>
  );
}

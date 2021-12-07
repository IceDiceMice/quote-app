import React from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function LikedItems({
  item,
  deleteQuote,
  showQuote,
  showAuthor,
}) {
  return (
    <div className="favQuotes">
      <div>
        <blockquote
          className={showQuote ? "quote-element active" : "quote-element"}
        >
          <p className="quote">{item.quote}</p>
        </blockquote>
        <p className={showAuthor ? "author active" : "author"}>
          -{item.author}
        </p>
      </div>
      <IoCloseSharp
        className="like-button"
        onClick={() => deleteQuote(item._id)}
      />
    </div>
  );
}

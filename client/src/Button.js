import React from "react";

export default function Button({ handleClick, newClass, text }) {
  return (
    <>
      <button onClick={handleClick} className={newClass}>
        {text}
      </button>
    </>
  );
}

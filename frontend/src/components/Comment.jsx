import React, { useState } from "react";

const Comment = (probs) => {
  console.log(probs)
  const [showToggle, setShowToggle] = useState(() => {
    return probs.content.length > 50 ? false : true;
  });
  const handleToggle = () => {
    setShowToggle(!showToggle);
  };
  return (
    <>
      <div
        className={`border  m-2 p-2 hover:bg-fuchsia-100 border-fuchsia-300 rounded-lg }`}
      >
        <h1 className="font-bold">@{probs.name}</h1>
        <p>{showToggle ? probs.content : probs.content.slice(0, 65) + "..."}</p>

        <button onClick={handleToggle} className="text-sm text-gray-600">
          {showToggle ? "show less" : "show more"}
        </button>
      </div>
    </>
  );
};

export default Comment;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function KitItem(props) {
  console.log(props, "hey i am props");
  let { item } = props;

  return (
    <div className="kit-item">
      <Link to={`product/${item.id}`}>
        {item.images[0] ? (
          <div>
            <img
              alt={item.description}
              width="100%"
              height="auto"
              src={item.images[0]}
            />
          </div>
        ) : (
          ""
        )}

        <div></div>
      </Link>
    </div>
  );
}

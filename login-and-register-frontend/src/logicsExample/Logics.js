import React from "react";

export default function Logics() {
  function isPalindrom(str) {
    const result = str.split("").reverse().join("");
    return str === result;
    
  }console.log(isPalindrom("ahdha"));

  return <></>;
}

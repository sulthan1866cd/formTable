import React, { useReducer, useRef } from "react";
import Input from "../helpers/Input";
import Button from "../helpers/Button";
import "./form.css";

const Form = () => {
  const list = JSON.parse(localStorage.getItem("list") || "[]");
  const lastId = useRef(
    list[list.length - 1] ? list[list.length - 1].id + 1 : 0
  );

  const formReducer = (state, action) => {
    switch (action.type) {
      case "Title":
        return { ...state, Title: action.val };
      case "Category":
        return { ...state, Category: action.val };
      case "Description":
        return { ...state, Description: action.val };
      case "reset":
        return {
          Title: "",
          Category: "",
          Description: "",
        };
    }
  };
  const [formDetails, formDispatch] = useReducer(formReducer, {
    Title: "",
    Category: "",
    Description: "",
  });

  const addToList = (e) => {
    e.preventDefault();
    const prevList = JSON.parse(localStorage.getItem("list") || "[]");
    const newList = [
      ...prevList,
      { ...formDetails, id: lastId.current++, checked: false },
    ];
    localStorage.setItem("list", JSON.stringify(newList));
    formDispatch({ type: "reset" });
    alert("item added to list");
  };
  return (
    <form className="form-container" onSubmit={addToList}>
      <h1>Form</h1>
      <Input
        props={{
          value: formDetails.Title,
          dispatch: formDispatch,
          label: "Title",
          type: "text",
          required: true,
        }}
      />
      <Input
        props={{
          value: formDetails.Category,
          dispatch: formDispatch,
          label: "Category",
          type: "text",
          required: true,
        }}
      />
      <Input
        props={{
          value: formDetails.Description,
          dispatch: formDispatch,
          label: "Description",
          type: "text",
          required: true,
        }}
      />
      <Button
        props={{
          color: "green",
        }}
      >
        Submit
      </Button>
      <center>
        view table <a href="/show-table">here</a>
      </center>
    </form>
  );
};

export default Form;

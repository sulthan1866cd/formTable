import React, { useEffect, useReducer, useRef, useState } from "react";
import Button from "../Helpers/Button";
import "./Table.css";
import Checkbox from "../Helpers/Checkbox";
import { Link } from "react-router-dom";

const Table = () => {
  const [render, setRender] = useState(false);
  const storedList = JSON.parse(localStorage.getItem("list") || "[]");
  const [lastIndex, setLastIndex] = useState(5);

  const tableReducer = (state, action) => {
    switch (action.type) {
      case "setLen":
        return storedList.slice(0, action.index);

      case "check":
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === action.id) {
            state[i].checked = action.val;
            storedList[i].checked = action.val;
            setRender(!render);
            localStorage.setItem("list", JSON.stringify(storedList));
            return state;
          }
        }
      case "delete":
        const removedList = state.filter((item) => item.id !== action.id);
        const removedStoredList = storedList.filter(
          (item) => item.id !== action.id
        );
        localStorage.setItem("list", JSON.stringify(removedStoredList));
        setLastIndex(lastIndex - 1);
        return removedList;
    }
  };
  const [list, tableDispatch] = useReducer(tableReducer, []);

  useEffect(() => {
    tableDispatch({ type: "setLen", index: lastIndex });
  }, []);

  const deleteItem = (id) => {
    tableDispatch({ type: "delete", id });
  };

  const showMore = () => {
    tableDispatch({ type: "setLen", index: lastIndex + 5 });
    setLastIndex(lastIndex + 5);
  };

  return (
    <div className="table-container">
      {storedList.length === 0 ? (
        <>
          no items in list add list <Link to="/">here</Link>
        </>
      ) : (
        <>
          <table className="list-table">
            <tbody>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Category</th>
                <th></th>
              </tr>
              {list.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Checkbox
                      props={{
                        value: item.checked,
                        dispatch: tableDispatch,
                        id: item.id,
                      }}
                    />
                  </td>
                  <td className={item.checked ? "strike-out" : ""}>
                    {item.Title}
                  </td>
                  <td className={item.checked ? "strike-out" : ""}>
                    {item.Category}
                  </td>
                  <td>
                    <Button
                      props={{
                        onClick: () => deleteItem(item.id),
                        color: "red",
                      }}
                    >
                      delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {storedList.length > lastIndex && (
            <Button props={{ color: "green", onClick: showMore }}>
              show more
            </Button>
          )}
          <p>
            add items to list <Link to="/">here</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Table;

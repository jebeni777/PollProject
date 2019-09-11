import * as React from "react";

export default (props) =>
    (
        <li>
            <div>name: {props.name}</div>
            <button onClick={props.onAdd}>
                Add
            </button>
            <div>count: {props.count}</div>
        </li>
    )

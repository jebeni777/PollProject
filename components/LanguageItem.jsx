import * as React from "react";

export default (props) =>
    (
        <li>
            <div>Language: {props.name}</div>
            <button onClick={() => props.onIncrement(props.name, props.count)}>
                Add
            </button>
            <button onClick={() => props.onDecrament(props.name, props.count)}>
                Minus
            </button>
            <button onClick={() => props.onDeleteLang(props.name, props.count)}>
                Delete Language
            </button>
            <div>count: {props.count}</div>
        </li>
    )

import * as React from "react";

export default (props) =>
    (
        <tbody>
            <tr>
                <td>{props.name}</td>
                <td><button onClick={() => props.onIncrement(props.name, props.count)}>
                    Add
                </button></td>
                <td><button onClick={() => props.onDecrament(props.name, props.count)}>
                    Minus
                </button></td>
                <td><button onClick={() => props.onDeleteLang(props.name, props.count)}>
                    Delete Language
                </button></td>
                <td>count: {props.count}</td>
            </tr>
        </tbody>
    )

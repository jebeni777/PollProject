import * as React from "react";

export default (props) =>
    (

        <tr>
            <td>{props.name}</td>
            <td><button onClick={() => props.onIncrement(props.name, props.count)}>
                <i className='fas fa-plus-circle'></i>
            </button></td>
            <td><button onClick={() => props.onDecrament(props.name, props.count)}>
                <i className='fas fa-minus-circle'></i>
            </button></td>
            <td><button onClick={() => props.onDeleteLang(props.name, props.count)}>
                Delete Language
                </button></td>
            <td>count: {props.count}</td>
        </tr>

    )

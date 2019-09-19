import * as React from "react";

export default (props) =>
    (
        <div>
            <table>
                <tbody>
                    {props.languages.map((currLang, i) =>
                        <tr key={i}>
                            <td>{currLang.name}</td><td>{currLang.count}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={props.closeReport}>Close Report</button>
        </div>
    )

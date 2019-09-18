import * as React from "react";

export default (props) =>
    (
        <div>
            <table>
                <tbody className='report'>
                    {props.languages.map((currLang, i) =>
                        <tr key={i} className='report'>
                            <td className='report'>{currLang.name}</td><td className='report'>{currLang.count}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={props.closeReport}>Close Report</button>
        </div>
    )

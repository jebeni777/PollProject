import * as React from "react";

export default (props) =>
    (
        <table>
            <tbody className='report'>
                {props.languages.map((currLang, i) =>
                    <tr className='report'>
                        <td className='report'>{currLang.name}</td><td className='report'>{currLang.count}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )

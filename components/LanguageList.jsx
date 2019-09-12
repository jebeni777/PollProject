import * as React from "react";
import LanguageItem from "./LanguageItem";

export default (props) =>
    (
        <ul>
            {props.languages.map((currLang, i) =>
                <LanguageItem name={currLang.name} key={i}
                    onIncrement={props.onIncrement}
                    onDecrament={props.onDecrament}
                    count={currLang.count}
                    onDeleteLang={props.onDeleteLang} />)
            }
        </ul>
    )

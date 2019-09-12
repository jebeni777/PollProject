import * as React from "react";
import LanguageItem from "./LanguageItem";

export default (props) =>
    (
        <ul>
            {props.languages.map((currLang, i) => <LanguageItem name={currLang.name} key={i} onAdd={props.onAdd} count={currLang.count} />)}
        </ul>
    )

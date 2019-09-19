import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import * as axios from "axios";
import LanguageList from "./LanguageList";
import LanguageForm from "./LanguageForm";
import LanguageReport from "./LanguageReport";

export default () => {
    const [name, setName] = useState('');
    const [languages, setLanguages] = useState([]);
    const [report, setReport] = useState(false);
    const [countSort, setCountSort] = useState([]);
    const [showForm, setShowForm] = useState(true);
    const [showTable, setTable] = useState(true);

    const showReport = (e) => {
        e.preventDefault();
        axios.get("/api/languages")
            .then((response) => {
                const [...data] = response.data;
                data.sort((a, b) => b.count - a.count);
                setCountSort(data);
            });
        setReport(true);
        setShowForm(false);
        setTable(false);
    }

    const closeReport = () => {
        setReport(false);
        setShowForm(true);
        setTable(true);
    }

    const filter = (language) =>
        language.name.toUpperCase().startsWith(name.toUpperCase());

    const checkIfExists = (checkName) => {
        let length = languages.length;
        for (var i = 0; i < length; i++) {
            if (languages[i].key === checkName.toUpperCase()) {
                alert("Technology already exists in database!");
                return true;
            }

        }
        return false;
    }


    const compare = (a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
    }

    const load = () =>
        axios.get("/api/languages")
            .then((response) => setLanguages(response.data));

    useEffect(() => {
        load();
    }, [true]);

    const onSave = () => {
        let checkName = name;
        if (!checkIfExists(checkName)) {
            axios.post("/api/languages/", { name, count: 0 })
                .then(() => load())
                .then(() => setName(''))
        } else {
            setName('');
            () => load();
        }

    }

    const onUpdate = (language) => {
        axios.put(`/api/languages/${language.name}`, language)
            .then(() => load());
    }

    const onDelete = (name) => {
        axios.delete(`/api/languages/${name}`)
            .then(() => load());
    }

    const alertDel = (name, count) => {
        if (count > 0 && confirm(`The technology you're deleting has data! Do you want to delete?`)) {
            onDelete(name);
        } else {
            onDelete(name);
        }
    }

    const view = useMemo(() => languages && languages
        .filter(filter)
        .sort(compare),
        [languages, name]);

    return (
        <div>
            {showForm &&
                <LanguageForm
                    name={name}
                    onChange={(target) => setName(target.value)}
                    onSave={onSave}
                    showForm={showForm}
                    showReport={showReport}
                    onReset={() => setName('')} />
            }
            {view && view.length && showTable &&
                <LanguageList languages={view}
                    showTable={showTable}
                    onIncrement={(name, count) => onUpdate({ name, count: ++count })}
                    onDecrament={(name, count) => onUpdate({ name, count: count && --count })}
                    onDeleteLang={alertDel} />
            }
            {view <= 0 &&
                <h1>There are no items to display</h1>
            }
            {report &&
                <LanguageReport languages={countSort}
                    closeReport={closeReport} />
            }
        </div>
    )
}


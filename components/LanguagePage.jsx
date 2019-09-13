import * as React from "react";
import * as axios from "axios";
import LanguageList from "./LanguageList"
import LanguageForm from "./LanguageForm"

const getNewLang = () => ({ name: "", count: 0 });

export default class LanguagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { languages: [], newLang: getNewLang(), sortedLangs: [] };
        this.props = props;
        this.onSearch = this.onSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrament = this.onDecrament.bind(this);
        this.onDeleteLang = this.onDeleteLang.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onIncrement(language, count) {
        axios.put(`/api/languages/${language}`, { language, count: count + 1 })
            .then(() => this.load());
    }

    onDecrament(language, count) {
        axios.put(`/api/languages/${language}`, { language, count: count - 1 })
            .then(() => this.load());
    }

    onDeleteLang(language) {
        axios.delete(`/api/languages/${language}`)
            .then(() => this.load());
    }

    onSearch(target) {
        var newSearch = { ...this.state.newSearch };
        newSearch[target.name] = target.value;
        this.setState({ newSearch: newSearch });
    }

    // clearInput = () => {
    //     document.getElementById("myForm").reset();
    //     this.setState({
    //       item: ""
    //     })
    //   }


    onChange(target) {
        var newLang = { ...this.state.newLang };
        newLang[target.name] = target.value;
        this.setState({ newLang: newLang });
    }

    onSave() {
        axios.post("/api/languages/", this.state.newLang)
            .then(() => this.load())
            .then(
                this.setState({ newLang: getNewLang() }))
            .then(this.clearBox("add"))
            .catch(
                // todo err throw
            )
    }

    clearBox(id) {
        document.getElementById(id).value = "";
    }

    onCancel() {
        this.setState({
            newLang: getNewLang()
        });
    }

    componentDidMount() {
        this.load();
    }

    async load() {
        var response = await axios.get("/api/languages");
        var langData = response.data;
        console.log(langData);
        this.setState({
            sortedLangs: langData.sort((a, b) => {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            })
        });
        console.log(this.state.sortedLangs);
    }

    render() {
        return (
            <div>

                <LanguageForm languages={this.state.newLang.name}
                    onChange={this.onChange}
                    onSave={this.onSave}
                    onReset={this.onCancel} />

                {this.state.sortedLangs && this.state.sortedLangs.length &&
                    <LanguageList languages={this.state.sortedLangs}
                        onIncrement={this.onIncrement}
                        onDecrament={this.onDecrament}
                        onDeleteLang={this.onDeleteLang} />
                }
                {this.state.sortedLangs <= 0 &&
                    <h1>There are no items to display</h1>
                }
            </div>
        )
    }
}

import * as React from "react";
import * as axios from "axios";
import LanguageList from "./LanguageList"
import LanguageForm from "./LanguageForm"

const getNewLang = () => ({ name: "", count: 0 });

export default class LanguagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { languages: [], newLang: getNewLang() };
        this.props = props;
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

    onChange(target) {
        var newLang = { ...this.state.newLang };
        newLang[target.name] = target.value;
        this.setState({ newLang: newLang });
    }

    onSave() {
        axios.post("/api/languages/", this.state.newLang)
            .then(() => this.load())
            .then(
                this.setState({ newLang: getNewLang() })
            ).catch(
                //todo: set an error condition
            )
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
        this.setState({ languages: response.data });
    }

    render() {
        return (
            <div>

                <LanguageForm languages={this.state.newLang.language}
                    onChange={this.onChange}
                    onSave={this.onSave}
                    onReset={this.onCancel} />

                {this.state.languages && this.state.languages.length &&
                    <LanguageList languages={this.state.languages}
                        onIncrement={this.onIncrement}
                        onDecrament={this.onDecrament}
                        onDeleteLang={this.onDeleteLang} />
                }
                {this.state.languages <= 0 &&
                    <h1>There are no items to display</h1>
                }
            </div>
        )
    }
}

import * as React from "react";
import * as axios from "axios";
import LanguageList from "./LanguageList"
import LanguageForm from "./LanguageForm"

export default class LanguagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { adding: false, newLang: {} }
        this.props = props;
        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onAdd(e) {
        e.preventDefault();

        this.setState({ adding: true });
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
                this.setState({ newLang: {}, adding: false })
            ).catch(
                //todo: set an error condition
            )
    }

    onCancel() {
        this.setState({ newLang: {}, adding: false });
    }

    componentDidMount() {
        this.load();
    }

    async load() {
        var response = await axios.get("/api/languages");
        this.setState({ newLang: response.data });
    }

    render() {
        return (
            <div>
                {this.state.adding && <LanguageForm languages={this.state.newLang} onChange={this.onChange} onSave={this.onSave} onReset={this.onCancel} />}
                {this.state.newLang && this.state.newLang.length && <LanguageList languages={this.state.newLang} onAdd={this.onAdd} />}
            </div>
        )
    }
}

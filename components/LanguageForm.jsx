import * as React from "react";

export default class LanguageForm extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onSave && this.props.onSave.call(this);
    }

    onChange(e) {
        e.preventDefault();

        this.props.onChange && this.props.onChange(e.target);
    }

    onReset(e) {
        e.preventDefault();

        this.props.onReset && this.props.onReset(e.target);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} onReset={this.onReset}>
                <div>
                    <input id="add" type="text" name="name"
                        placeholder="add Technology"
                        value={this.props.name}
                        onChange={this.onChange} />
                    <input type="submit" value="Submit" />
                    <input type="reset" value="Cancel" />
                </div>
                <div>
                    <input id="search" type="search" name="name"
                        placeholder="find Technology"
                        value={this.props.name}
                        onChange={this.onSearch} />
                    <button onClick={this.executeSearch}>Search</button>
                </div>
            </form >
        )
    }
}


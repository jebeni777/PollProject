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
                <input type="text" name="name" placeholder="name" value={this.props.name} onChange={this.onChange} />
                <input type="text" name="age" placeholder="age" value={this.props.age} onChange={this.onChange} />
                <input type="text" name="owner" placeholder="owner" value={this.props.owner} onChange={this.onChange} />
                <input type="submit" value="Submit" />
                <input type="reset" value="Cancel" />
            </form>
        )
    }
}


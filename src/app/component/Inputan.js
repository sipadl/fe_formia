'use client'
import React, { Component } from 'react';
import EditorConvertToHTML from './EditorConvertToHTML'; // Assuming this is the editor component used

// Komponen Label
class Label extends Component {
    render() {
        const { title } = this.props;
        return (
            <label className="label-form-col col-md-4">
                <div className='bg-dark text-light p-1'>
                    {title.toUpperCase()}
                </div>
            </label>
        );
    }
}

// Komponen Input Text
class TextInput extends Component {
    render() {
        const { name, customTipe, value, onChange, placeholder } = this.props;
        return (
            <input
                type={customTipe || 'text'}
                className="form-control"
                name={name}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                placeholder={placeholder}
            />
        );
    }
}

// Komponen Editor
class EditorInput extends Component {
    render() {
        const { name, content, onContentChange } = this.props;
        return (
            <EditorConvertToHTML
                name={name}
                content={content}
                onContentChange={onContentChange}
            />
        );
    }
}

// Komponen Select
class SelectInput extends Component {
    render() {
        const { name, value, onChange, options, isMulti } = this.props;
        return (
            <select
                className="form-control"
                name={name}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                multiple={isMulti || false}
            >
                {!isMulti && <option value="">Pilih salah satu</option>}
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        );
    }
}

// Komponen Utama Form
class DynamicForm extends Component {
    constructor(props) {
        super(props);
        // const { value } = this.pros ?? '';
        this.state = {
            formData: {},
            values: this.props.values
        };
    }

    handleChange = (name, value) => {
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    };

    render() {
        const {formData} = this.state;
        const { values } = this.state
        return (
            <form>
                {values.map((val, key) => (
                    <div key={key} className="form-group row mb-3">
                        <Label title={val.title} />
                        <div className="col-md-8">
                            {val.tipe === 0 && (
                                <TextInput
                                    name={val.name}
                                    customTipe={val.customTipe}
                                    value={formData[val.name] || ''}
                                    onChange={this.handleChange}
                                    placeholder={`Masukan ${val.title}`}
                                />
                            )}

                            {val.tipe === 1 && (
                                <EditorInput
                                    name={val.name}
                                    content={formData[val.name] || ''}
                                    onContentChange={this.handleChange}
                                />
                            )}

                            {val.tipe === 2 && (
                                <SelectInput
                                    name={val.name}
                                    value={formData[val.name] || ''}
                                    onChange={this.handleChange}
                                    options={val.element}
                                    isMulti={val.isMulti}
                                />
                            )}
                        </div>
                    </div>
                ))}

                <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-primary btn-sm">
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

export default DynamicForm;

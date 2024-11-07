'use client';
import { useEffect, useState } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Link from 'next/link';

export default function Inputan({ values = [], url, backUrl}) {
    const [formData, setFormData] = useState({});
    const [editorStates, setEditorStates] = useState({}); // Store editor states for each input field

    useEffect(() => {
        if (values.length > 0) {
            const initialData = values.reduce((acc, val) => ({
                ...acc,
                [val.name]: ''
            }), {});
            setFormData(initialData);

            // Initialize editorState for each field with `tipe === 1`
            const initialEditorStates = values.reduce((acc, val) => {
                if (val.tipe === 1) {
                    // Set initial content for the editor
                    acc[val.name] = EditorState.createWithContent(ContentState.createFromText(''));
                }
                return acc;
            }, {});
            setEditorStates(initialEditorStates);
        }
    }, [values]);

    const handleChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const onEditorStateChange = (name, newEditorState) => {
        setEditorStates((prevState) => ({
            ...prevState,
            [name]: newEditorState
        }));

        // Optionally, you can store the content as HTML or plain text in formData
        const currentContent = newEditorState.getCurrentContent();
        const contentText = currentContent.getPlainText();
        handleChange(name, contentText); // Saving the plain text to formData
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {values.length > 0 ? (
                values.map((val, key) => (
                    <div key={key} className="form-group row mb-3">
                        <label className="label-form-col col-md-4">
                            {val.title.toUpperCase()}
                        </label>
                        <div className="col-md-8">
                            {val.tipe === 1 ? (
                                <Editor
                                    editorState={editorStates[val.name]}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={(newEditorState) =>
                                        onEditorStateChange(val.name, newEditorState)
                                    }
                                />
                            ) : val.tipe === 2 ? (
                                <select
                                    className="form-control"
                                    multiple={val.isMulti}
                                    name={val.name}
                                    onChange={(e) => handleChange(val.name, e.target.value)}
                                    value={[formData[val.name]]}
                                >
                                    {val.element.map((valx, keyx) => (
                                        <option key={keyx} value={valx.id}>{valx.name}</option>
                                    ))}
                                </select>
                            ) : val.tipe === 0 ? (
                                <input
                                    className="form-control"
                                    type="text"
                                    name={val.name}
                                    value={formData[val.name] || ''}
                                    onChange={(e) => handleChange(val.name, e.target.value)}
                                    placeholder={val.title.toUpperCase()}
                                    required
                                />
                            ) : val.tipe === 3 ? (
                                val.option.map((valo, keys) => (
                                    <div key={keys}>
                                        <input
                                            className="mx-1"
                                            type="radio"
                                            id={valo.id}
                                            name={val.name}
                                            value={valo.option}
                                            checked={formData[val.name] === valo.option}
                                            onChange={() => handleChange(val.name, valo.option)}
                                        />
                                        <label htmlFor={valo.id}>{valo.name.toUpperCase()}</label>
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </div>
                ))
            ) : (
                <p>Please contact support on: 081290669170</p>
            )}
            <div className='row mb-4'>
              <div className='col-md-12 text-end'>
                <Link className='btn btn-md btn-light mx-4' href={backUrl} >Kembali</Link>
                <button className='btn btn-md btn-dark' type="submit">Submit</button>
              </div>
            </div>
        </form>
    );
}

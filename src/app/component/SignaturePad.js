'use client'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import React, {useState, useRef} from 'react';
import {Modal, Button} from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';
import {postData} from '../utils/network';

function convertToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    return formattedDate;
}

const CustomModal = ({
    show,
    handleClose,
    title,
    content,
    kunci,
    ghId
}) => {
    const sigCanvasRef = useRef(null);

    const clearSignature = () => {
        sigCanvasRef
            .current
            .clear();
    };

    const saveSignature = (values) => {
        if (sigCanvasRef.current && !sigCanvasRef.current.isEmpty()) {
            values.signature = sigCanvasRef
                .current
                .getTrimmedCanvas()
                .toDataURL("image/png"); // Convert signature to base64
        } else {
            values.signature = ''; // Set signature as empty if the canvas is blank
        }
        console.log("Submitted values:", values); // For debugging or further processing
    };

    return (
        <Modal show={show} onHide={handleClose} centered="centered">
            <Modal.Header closeButton="closeButton">
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{content}</p>
                <Formik
                    initialValues={{
                        signature: '',
                        impact: '',
                        notes: '',
                        redmineNo: kunci || '',
                        ghId: ghId || ''
                    }}
                    onSubmit={(values) => {
                        saveSignature(values);
                        setTimeout(async () => {
                            const datax = await postData('/api/main/signature', values);
                            window.location.reload();
                        }, 3000);
                        // window.location.reload()
                    }}>
                    {
                        ({setFieldValue}) => (
                            <Form>
                                <div className="form-group mb-2">
                                    <label>Impacted</label>
                                    <Field as="select" name="impacted" className="form-control">
                                        <option value="">Select impacted</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </Field>
                                    <ErrorMessage name="impacted" component="div" className="text-danger"/>
                                </div>
                                <div className="form-group mb-2">
                                    <label>Notes</label>
                                    <Field as="textarea" name="notes" className="form-control" rows={4}/>
                                    <ErrorMessage name="notes" component="div" className="text-danger"/>
                                </div>

                                <label>Signature</label>
                                {/* <div className="card mb-2"> */}
                                <SignatureCanvas
                                    ref={sigCanvasRef}
                                    penColor="black"
                                    canvasProps={{
                                        width: 500,
                                        height: 200,
                                        className: 'signature-canvas'
                                    }}/> {/* </div> */}
                                <div className="mt-3">
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            clearSignature()
                                            handleClose()
                                        }}
                                        className="me-2">
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Simpan
                                    </Button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default function SignaturePad({
    values = [],
    redmine
}) {
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState(
        {title: '', content: '', userId: null}
    );
    const [signatures, setSignatures] = useState({}); // Store signatures by user ID

    const handleShow = (title, content, userId) => {
        setModalContent({title, content, userId});
        setModalShow(true);
    };

    const handleClose = () => {
        setModalShow(false);
    };

    const handleSaveSignature = (signatureBase64) => {
        setSignatures((prevSignatures) => ({
            ...prevSignatures,
            [modalContent.userId]: signatureBase64 // Save signature by user ID
        }));
        setModalShow(false);
    };

    return (
        <div>
            <div className="row mb-4">
                <hr/>
                <div className="col-md-4 col-xs-12 text-center mb-2">
                    <div className="header-notes-signature">Group/Department</div>
                </div>
                <div className="col-md-4 col-xs-12 text-center mb-2">
                    <div className="header-notes-signature">Reviewer Notes</div>
                </div>
                <div className="col-md-4 col-xs-12 text-center mb-2">
                    <div className="header-notes-signature">Signature</div>
                </div>
                <hr/> {
                    values.map((val) => (
                        val.position == 1
                            ? <React.Fragment key={val.id}>
                                <div className="col-md-4 col-xs-12">
                                    <div className="header-notes-inner">{(val.userDetail.departement.departementName).toUpperCase()}</div>
                                </div>
                                <div className="col-md-4 col-xs-12">
                                    <div className="header-notes-inner mb-2">
                                        <div className='mb-2'>
                                            Impact : <strong>{val.impact == null ? '' : 'Tidak' ? 'Ya' : ''}</strong>
                                        </div>
                                        <hr />
                                        <div>Note :</div>
                                        <p>
                                            {val.notes || '-'}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-xs-12 mb-4 align-self-center">
                                    {
                                        val.signature
                                            ?
                                            <>
                                            <div className='text-center' style={{
                                                width: 'auto',
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                height: '100px',
                                            }}>
                                            <img src={val.signature} alt="Review" className="signature-preview mt-2"/>
                                            </div> 
                                            <div className="header-notes-inner text-start">Date: {convertToDDMMYYYY(val.createdAt)}</div>
                                                </>
                                            : <button
                                                    type="button"
                                                    className="btn btn-sm w-100 btn-dark"
                                                    onClick={() => handleShow("Review", `Review ${val.departement}`, val.id)}>
                                                    Sign
                                                </button>
                                    }
                                    <div className="header-notes-inner text-center">{val.userDetail.namaLengkap}</div>
                                </div>
                            </React.Fragment>
                            : ''
                    ))
                }
                <hr/>
                <div className="col-md-4 col-xs-12 text-center mb-2">
                    <div className="header-notes-signature">Group/Department</div>
                </div>
                <div className="col-md-4 col-xs-12 text-center mb-2">
                    <div className="header-notes-signature">Reviewer Notes</div>
                </div>
                <div className="col-md-4 col-xs-12 text-center mb-2">
                    <div className="header-notes-signature">Signature</div>
                </div>
                <hr/> {
                    values.map((val) => (
                        val.position == 2
                        ? <React.Fragment key={val.id}>
                            <div className="col-md-4 col-xs-12">
                                <div className="header-notes-inner">{(val.userDetail.departement.departementName).toUpperCase()}</div>
                            </div>
                            <div className="col-md-4 col-xs-12">
                                <div className="header-notes-inner mb-2">
                                    <div className='mb-2'>
                                        Impact : <strong>{val.impact == null ? 'Tidak' : 'Ya'}</strong>
                                    </div>
                                    <hr />
                                    <div>Note :</div>
                                    <p>
                                        {val.notes || '-'}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4 col-xs-12 mb-4 align-self-center">
                                {
                                    val.signature
                                        ?
                                        <>
                                        <div className='text-center' style={{
                                            width: 'auto',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            height: '100px',
                                        }}>
                                        <img src={val.signature} alt="Review" className="signature-preview mt-2"/>
                                        </div> 
                                        <div className="header-notes-inner text-start">Date: {convertToDDMMYYYY(val.createdAt)}</div>
                                            </>
                                        : <button
                                                type="button"
                                                className="btn btn-sm w-100 btn-dark"
                                                onClick={() => handleShow("Review", `Review ${val.departement}`, val.id)}>
                                                Sign
                                            </button>
                                }
                                <div className="header-notes-inner text-center">{val.userDetail.namaLengkap}</div>
                            </div>
                        </React.Fragment>
                        : ''
                    ))
                }
            </div>
            <CustomModal
                show={modalShow}
                handleClose={handleClose}
                kunci={redmine}
                ghId={modalContent.userId}
                title={modalContent.title}
                content={modalContent.content}
                onSave={handleSaveSignature}/>
        </div>
    );
}

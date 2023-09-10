import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface ToasterProps {
    showToast: boolean,
    title: string,
    message: string,
    onClose: (e?: React.MouseEvent | React.KeyboardEvent) => void,
    type: string
}

export function Toaster(props:ToasterProps) {
    const { showToast, title, message, onClose, type } = props;

    return (
        <ToastContainer position="bottom-end">
            <Toast onClose={onClose} show={showToast} delay={3000} autohide bg={type} className="m-3">
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body>
                    <p className="text-white">{ message }</p>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {closeToast} from "../../services/toastSlice";


export function Toaster() {
    const toast = useSelector((state: any) => state.toast.value)
    const dispatch = useDispatch()

    if (!toast) {
        return null
    }

    return (
        <ToastContainer position="bottom-end">
            <Toast onClose={() => dispatch(closeToast())} show={toast.show} delay={3000} autohide bg={toast.type} className="m-3">
                <Toast.Header>
                    <strong className="me-auto">{toast.title}</strong>
                </Toast.Header>
                <Toast.Body>
                    <p className="text-white">{ toast.text }</p>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

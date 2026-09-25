import { useRef, useState } from "react";
import useAPI from "./useAPI";

/**
 * Liga um <form> a uma action do backend.
 *
 * Não reimplementa comunicação nenhuma: só lê os campos do form
 * e repassa pro useAPI, que é quem de fato conversa com a API.
 * Reaproveitável em qualquer form novo, não só no Auth.
 */
function useActionForm({ action, onSuccess } = {}) {
    const formRef = useRef(null);
    const [requestData, setRequestData] = useState(null);

    const api = useAPI(
        action && requestData
            ? {
                ...requestData,
                action,
                method: "post",
                enabled: true,
                onSuccess
            }
            : { enabled: false }
    );

    const response = requestData ? api.data : null;
    const error = api.error || (
        response?.success === false
            ? response.message
            : null
    );
    const errorField = response?.data?.field || null;
    const success = Boolean(response?.success);

    function handleSubmit(event) {
        event.preventDefault();

        if (!formRef.current) {
            return;
        }

        const form = new FormData(formRef.current);
        const data = {};

        for (const [name, value] of form.entries()) {
            data[name] = value;
        }

        setRequestData(data);
    }

    return {
        formRef,
        handleSubmit,
        loading: Boolean(requestData && api.loading),
        error,
        errorField,
        success,
        data: response
    };
}

export default useActionForm;
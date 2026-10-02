import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../../../hooks/useAPI";

function useDashboardLogout() {
    const navigate = useNavigate();
    const [logoutVersion, setLogoutVersion] = useState(0);

    const handleLogoutSuccess = useCallback((response) => {
        if (response?.success) {
            navigate("/");
        }
    }, [navigate]);

    const { loading: logoutLoading, error: logoutError } = useAPI({
        action: "auth.logout",
        method: "post",
        requestVersion: logoutVersion,
        enabled: logoutVersion > 0,
        onSuccess: handleLogoutSuccess
    });

    const logout = () => {
        setLogoutVersion((version) => version + 1);
    };

    return { logout, logoutLoading, logoutError };
}

export default useDashboardLogout;

import { useContext, useEffect } from "react";
import { userContext } from "../App";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2"

export default function Logout() {
    const { unsetUser, setUser } = useContext(userContext);

    unsetUser();

    useEffect(() => {
        setUser({
            id: null,
            isAdmin: null,
        });
    }, []);

    return <Navigate to="/login" />;
}

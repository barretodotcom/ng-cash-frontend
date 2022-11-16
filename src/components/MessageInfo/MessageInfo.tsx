import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import './MessageInfo.css'

export function MessageInfo() {

    const { errorMessage, setErrorMessage } = useContext(AuthContext);

    if (errorMessage) {
        setTimeout(() => {
            setErrorMessage(null)
        }, 2000)
        return (
            <div className="message-info error">
                <p>{errorMessage}</p>
            </div>
        )
    }
    return null;
}
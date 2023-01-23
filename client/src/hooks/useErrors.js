import { useContext } from "react";
import { ErrorContext } from "../context/ErrorContext";

export const useErrors = () => {
    return useContext(ErrorContext);
}

import React, { useEffect, useState } from 'react'
import { useErrors } from '../../hooks/useErrors'
import './ErrorHandler.scss';

export const ErrorHandler = () => {
    const {error, setError} = useErrors();
    const [errorClasses, setErrorClasses] = useState("");

    useEffect(() => {
        if(error && error !== "") {
            setErrorClasses("show");
            setTimeout(() => {setError("")}, Math.max(1000, 35 * error.length));
        } else {
            setErrorClasses("");
        }
    }, [error]);

  return (
    <div
        className={"errors" + " " + errorClasses}
    >{error}</div>
  )
}

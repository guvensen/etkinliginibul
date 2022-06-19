import style from './style.module.scss';
import React, {useState} from "react";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const validationTexts = {
    email: {
        empty: "Lütfen e-mail adresinizi giriniz.",
        minLength: "En az 10 karakter olmalıdır.",
        maxLength: "60 karaktere kadar girebilirsiniz.",
        validation: "Lütfen geçerli bir E-posta adresi girin."
    }
};

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


export default function NewsletterForm({inputBgColor, buttonBgColor, buttonColor}) {

    const [newsletterData, setNewsletterData] = useState({
        email: {
            value: "",
            isValid: false,
            isRequired: true,
            validateFunc: validateEmail,
            minLength: 10,
            maxLength: 60,
            lengthInspection: true,
            validationText: validationTexts.email.empty
        },
        checkValidation: false,
    });
    const [sendProcess, setSendProcess] = useState(null);

    const handleInputChange = (event) => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        if (value === "false") {
            value = false;
        }

        const id = target.name;
        const isValid = !value ? false : true;

        let newData = {...newsletterData[id], value: value, isValid: isValid}
        let newState = {...newsletterData, [id]: newData}

        setNewsletterData(newState);
    }

    const validateForm = () => {
        let isValid = true;
        for (let property in newsletterData) {
            if (newsletterData.hasOwnProperty(property)) {

                if (property !== "checkValidation") {
                    if (newsletterData[property].isRequired) {
                        if (!newsletterData[property].isValid) {
                            isValid = false;
                        }

                        if (newsletterData[property].lengthInspection) {

                            if (newsletterData[property].value.length !== 0 && newsletterData[property].value.length < newsletterData[property].minLength) {
                                isValid = false;

                                let newData = {
                                    ...newsletterData[property],
                                    isValid: isValid,
                                    validationText: validationTexts[property].minLength
                                }
                                let newState = {...newsletterData, [property]: newData}
                                setNewsletterData(newState);
                            }

                            if (newsletterData[property].value.length !== 0 && newsletterData[property].value.length > newsletterData[property].maxLength) {
                                isValid = false;

                                let newData = {
                                    ...newsletterData[property],
                                    isValid: isValid,
                                    validationText: validationTexts[property].maxLength
                                }
                                let newState = {...newsletterData, [property]: newData}
                                setNewsletterData(newState);
                            }

                        }

                        if (typeof newsletterData[property].validateFunc === "function") {
                            if (newsletterData[property].value.length !== 0) {
                                if (!newsletterData[property].validateFunc(newsletterData[property].value)) {
                                    isValid = false;

                                    let newData = {
                                        ...newsletterData[property],
                                        isValid: isValid,
                                        validationText: validationTexts[property].validation
                                    }
                                    let newState = {...newsletterData, [property]: newData}
                                    setNewsletterData(newState);
                                }
                            }

                        }
                    }
                }
            }
        }
        return isValid;
    };

    const onLoginClick = () => {
        let newState = {...newsletterData, checkValidation: true}

        setNewsletterData(newState);

        if (validateForm()) {
            setSendProcess("waiting");
        }
    };

    const showError = (field) => {
        return (field.isRequired) && (newsletterData.checkValidation && !field.isValid) ? 'error' : '';
    };

    return <div className={style.newsletter}>
        {
            sendProcess === "waiting" || sendProcess === null ?
                <div className={style.inputWrapper}>
                    <div className={style.inputGroup}>
                        <input
                            className={!showError(newsletterData.email) ? style.input : style.input + " " + style.isInvalid}
                            name="email"
                            style={{
                                background: inputBgColor
                            }}
                            onChange={handleInputChange}
                            type="text"
                            disabled={sendProcess !== null}
                            placeholder="E-posta Adresiniz"/>
                        {
                            showError(newsletterData.email) &&
                            <div className={style.invalidFeedback}>
                                {newsletterData.email.validationText}
                            </div>
                        }
                    </div>
                    <button
                        className={style.button}
                        style={{background: buttonBgColor, color: buttonColor}}
                        type="button"
                        disabled={sendProcess === "waiting" && true}
                        onClick={onLoginClick}
                    >
                        {
                            sendProcess !== "waiting" ?
                                "Abone Ol!"
                                :
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className={style.spinner}
                                />
                        }
                    </button>
                </div>
                :
                <div className={
                    [
                        style.sendResult,
                        sendProcess === "success" && style.success,
                        sendProcess === "error" && style.error,
                    ].join(' ')}>
                    {
                        sendProcess === "success" &&
                        "Email saved successfully."
                    }
                    {
                        sendProcess === "error" &&
                        "There was a problem, try again later."
                    }
                </div>
        }
    </div>
}

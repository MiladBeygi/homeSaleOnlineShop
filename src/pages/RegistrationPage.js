import { Spinner } from "flowbite-react";
import Button from "../components/Button";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import { useState } from "react";

const RegistrationPage = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    //using custom hook for input validation
    const { value: userName, isValid: userNameIsValid, hasError: userNameHasError, valueChangeHandler: userNameChangeHandler, inputBlurHandler: userNameBlurHandler, reset: userNamereset } = useInput((input) => input.length >= 2);
    const { value: fullName, isValid: fullNameIsValid, hasError: fullNameHasErro, valueChangeHandler: fullNameChangeHandler, inputBlurHandler: fullNameBlurHandler, reset: fullNameReset } = useInput((input) => input.length >= 2 && input.includes(" "));
    const { value: emailValue, isValid: emailIsValid, hasError: emailHasError, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, reset: emailReset } = useInput((input) => input.includes("@") && input.endsWith(".com"))
    const formIsValid = emailIsValid && userNameIsValid && fullNameIsValid;

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log("user");
        userNamereset();
        fullNameReset();
        emailReset();
    }
    return <>
        <form onSubmit={submitHandler} className="w-2/4 mx-auto">
            <Input id='userName' placeholder='نام کاربری' label='نام کاربری خود را وارد کنید' value={userName} onBlur={userNameBlurHandler} onChange={userNameChangeHandler} />
            {userNameHasError && <div className="text-red-500">نام کاربری باید بیشتر از دو حرف باشد</div>}

            <Input id='fullName' placeholder='نام کامل' label='نام و نام خانوادگی خود را وارد کنید' value={fullName} onChange={fullNameChangeHandler} onBlur={fullNameBlurHandler} />
            {userNameHasError && <div className="text-red-500"> نام کامل باید بیشتر از 5 حرف باشد و دارای فاصله باشد </div>}

            <Input id='email' placeholder='example@example.com' label='ایمیل خود را وارد کنید' value={emailValue} onBlur={emailBlurHandler} onChange={emailChangeHandler} />
            {userNameHasError && <div className="text-red-500"> ایمیل نامعتبر است  </div>}

            <Button classes='mt-5' type='submit' disabled={!formIsValid}>
                {isLoading && <Spinner size='md' />}
                {!isLoading && 'ثبت نام'}
            </Button>
        </form>
    </>
}
export default RegistrationPage;
import { Spinner } from "flowbite-react";
import Button from "../components/Button";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import { useState } from "react";

const LoginPage = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const { value: emailValue, isValid: emailIsValid, hasError: emailHasError, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, reset: emailReset } = useInput((input) => input.includes("@") && input.endsWith(".com"));

    const { value: password, isValid: passwordIsValid, hasError: passwordHasError, valueChangeHandler: passwordChangeHandler, inputBlurHandler: passwordBlurHandler, reset: passwordreset } = useInput((input) => input.length >= 5);

    const formIsValid = emailIsValid && passwordIsValid;
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(event)
    }
    return <>
        <form onSubmit={submitHandler} className="w-2/4 mx-auto my-5">
            <Input id='email' value={emailValue} onChange={emailChangeHandler} onBlur={emailBlurHandler} placeholder="example@example.com" label="لطفا ایمیل خود را وارد کنید" />
            <Input placeholder="پسورد خود را وارد کنید" label="لطفا پسورد خود را وارد کنید" />
            <Button classes='mt-5' type='submit' disabled={!formIsValid}>
                {isLoading && <Spinner size='md' />}
                {!isLoading && 'ثبت نام'}
            </Button>
        </form>
    </>
}
export default LoginPage;
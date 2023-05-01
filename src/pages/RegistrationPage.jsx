import { Spinner } from "flowbite-react";
import Button from "../components/Button";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import { useState } from "react";
import { REGISTER_URL } from "../constants/URLS";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const RegistrationPage = (props) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    //using custom hook for input validation
    const { value: userName, isValid: userNameIsValid, hasError: userNameHasError, valueChangeHandler: userNameChangeHandler, inputBlurHandler: userNameBlurHandler, reset: userNamereset } = useInput((input) => input.length >= 2);

    const { value: password, isValid: passwordIsValid, hasError: passwordHasError, valueChangeHandler: passwordChangeHandler, inputBlurHandler: passwordBlurHandler, reset: passwordreset } = useInput((input) => input.length >= 5);

    const { value: fullName, isValid: fullNameIsValid, hasError: fullNameHasError, valueChangeHandler: fullNameChangeHandler, inputBlurHandler: fullNameBlurHandler, reset: fullNameReset } = useInput((input) => input.length >= 2 && input.includes(" "));

    const { value: emailValue, isValid: emailIsValid, hasError: emailHasError, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, reset: emailReset } = useInput((input) => input.includes("@") && input.endsWith(".com"))
    const formIsValid = emailIsValid && userNameIsValid && fullNameIsValid;

    const submitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        const newObj = {
            userName,
            password,
            fullName,
            email: emailValue
        }
        try {
            const res = await fetch(REGISTER_URL,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(newObj)
                }
            );
            const data = await res.json();
            if (res.ok) {
                userNamereset();
                fullNameReset();
                emailReset();
                passwordreset();
                toast.success("ثبت نام شما با موفقیت انجام شد");
                setTimeout(() => {
                    navigate("../login")
                }, 1500)
            } else {
                toast.error(data + ": خطا")
            }
        }
        catch (e) {
            console.error(e.message);

        }
        finally {
            setIsLoading(false)
        }
    }
    return <>
        <form onSubmit={submitHandler} className="w-2/4 mx-auto">
            <Input type='text' id='userName' placeholder='نام کاربری' label='نام کاربری خود را وارد کنید' value={userName} onBlur={userNameBlurHandler} onChange={userNameChangeHandler} />
            {userNameHasError && <div className="text-red-500">نام کاربری باید بیشتر از دو حرف باشد</div>}

            <Input type='password' id='password' placeholder='رمز عبور' label='رمز عبور خود را وارد کنید' value={password} onBlur={passwordBlurHandler} onChange={passwordChangeHandler} />
            {passwordHasError && <div className="text-red-500">رمز عبور باید بیشتر از پنج حرف باشد</div>}

            <Input type='text' id='fullName' placeholder='نام کامل' label='نام و نام خانوادگی خود را وارد کنید' value={fullName} onChange={fullNameChangeHandler} onBlur={fullNameBlurHandler} />
            {fullNameHasError && <div className="text-red-500"> نام کامل باید بیشتر از 5 حرف باشد و دارای فاصله باشد </div>}

            <Input type='email' id='email' placeholder='example@example.com' label='ایمیل خود را وارد کنید' value={emailValue} onBlur={emailBlurHandler} onChange={emailChangeHandler} />
            {emailHasError && <div className="text-red-500"> ایمیل نامعتبر است  </div>}

            <Button classes='mt-5' type='submit' disabled={!formIsValid}>
                {isLoading && <Spinner size='md' />}
                {!isLoading && 'ثبت نام'}
            </Button>
        </form>
    </>
}
export default RegistrationPage;
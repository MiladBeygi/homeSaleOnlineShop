import { Spinner } from "flowbite-react";
import Button from "../components/Button";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import { useContext, useEffect, useState } from "react";
import { LOGIN_URL } from "../constants/URLS";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const LoginPage = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

    const { value: emailValue, isValid: emailIsValid, hasError: emailHasError, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, reset: emailReset } = useInput((input) => input.includes("@") && input.endsWith(".com"));

    const { value: password, isValid: passwordIsValid, hasError: passwordHasError, valueChangeHandler: passwordChangeHandler, inputBlurHandler: passwordBlurHandler, reset: passwordreset } = useInput((input) => input.length >= 5);

    const formIsValid = emailIsValid && passwordIsValid;
    const submitHandler = async (event) => {
        event.preventDefault();
        const newObj = {
            email: emailValue,
            password
        }
        try {
            const res = await fetch(LOGIN_URL,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(newObj)
                }
            );
            const data = await res.json();
            if (res.ok) {
                emailReset();
                passwordreset();
                toast.success("خوش آمدید");
                sessionStorage.setItem("ACCESS_TOKEN", JSON.stringify(data));
                setIsLoggedIn(true)
                setTimeout(() => {
                    navigate("../advertises")
                }, 1500);
            } else {
                toast.error(data + ": خطا ")
            }
        }
        catch (e) {
            console.error(e)
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem("ACCESS_TOKEN")) {
            navigate("../..")
        }
    }, [isLoggedIn])
    return <>
        <form onSubmit={submitHandler} className="w-2/4 mx-auto py-5">
            <Input type='email' id='email' value={emailValue} onChange={emailChangeHandler} onBlur={emailBlurHandler} placeholder="example@example.com" label="لطفا ایمیل خود را وارد کنید" />
            {emailHasError && <div className="text-red-500"> ایمیل نامعتبر است  </div>}

            <Input type='password' placeholder="پسورد خود را وارد کنید" label="لطفا پسورد خود را وارد کنید" value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
            {passwordHasError && <div className="text-red-500">رمز عبور باید بیشتر از پنج حرف باشد</div>}
            <Button classes='mt-5' type='submit' disabled={!formIsValid}>
                {isLoading && <Spinner size='md' />}
                {!isLoading && 'ورود '}
            </Button>
        </form>
    </>
}
export default LoginPage;
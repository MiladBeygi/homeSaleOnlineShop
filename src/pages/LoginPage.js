import Input from "../components/Input";

const LoginPage = (props) => {
    return <>
        <div className="my-5 mx-auto w-[90vw] flex flex-col justify-center items-center">
            <Input placeholder="example@example.com" label="لطفا ایمیل خود را وارد کنید" />
            <Input placeholder="پسورد خود را وارد کنید" label="لطفا پسورد خود را وارد کنید" />
        </div>
    </>
}
export default LoginPage;
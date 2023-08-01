import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const ForgotPassword = ({ toggleForgotPassword }) => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [isSendingError, setIsSendingError] = useState(false);
    const [isSendInEmail, setIsSendInEmail] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [isSuccessSend, setIsSuccessSend] = useState(false);
    const [resetData, setResetData] = useState({
        email: "",
    });
    const [searchToken, setSearchToken] = useSearchParams();
    const searchParamsToken = searchToken.get("token")
    const [newPassword, setNewPassword] = useState({
        password: "",
        confirmPassword: "",
    });

    const submitEmailToResetPassword = async () => {
        if (resetData?.email?.length === 0) {
            return setIsSendingError(true)
        }

        setIsSend(true);

        await axios.post('https://chat-app-node-8ndm.onrender.com/reset-password', {
            email: resetData?.email
        })
            .then(() => {
                setIsSend(false);
                setIsSendInEmail(true);
                setIsSuccessSend(true);
            })
    };

    const submitUserToken = async (event) => {
        if (newPassword?.password?.length === 0 && newPassword?.confirmPassword?.length === 0 && newPassword?.password !== newPassword?.confirmPassword) {
            return setIsError(true)
        }
        event.preventDefault();

        if (searchToken.get("token")) {
            try {
                await axios.post('https://chat-app-node-8ndm.onrender.com/reset-password/user-token', {
                    token: searchToken.get("token"),
                    password: newPassword?.password,
                    confirmPassword: newPassword?.confirmPassword,
                })
                    .then((res) => {
                        const data = res.data;
                        console.log(data)
                        localStorage.setItem('access_token', data?.access_token);
                        navigate('/');
                    });
            } catch (error) {
                console.log(error)
            }
        }
    };

    useEffect(() => {
        submitUserToken();
    }, [searchToken]);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                {!isSend && searchParamsToken === null && !isSuccessSend && <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Enter your email to reset password
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={submitEmailToResetPassword} >
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    style={{ borderColor: isSendingError && resetData?.email?.length === 0 ? 'red' : '' }}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                    placeholder="name@company.com"
                                    required=""
                                    onChange={(e) => {
                                        setResetData((prevSendData) => ({
                                            ...prevSendData,
                                            email: e.target.value
                                        }));
                                    }}
                                />
                                {isSendingError && resetData?.email?.length === 0 && <span style={{ color: "red", margin: "3px" }}>Please enter the email</span>}

                                <button onClick={submitEmailToResetPassword} type="button" className="w-full mt-2 transition delay-50 border-none text-white bg-sky-400 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 outline-none">Submit</button>
                            </div>
                        </form>
                        <Link onClick={toggleForgotPassword} to="/" className="text-sm dark:text-white font-light text-primary-600 hover:underline cursor-pointer">
                            Back to sign in.
                        </Link>
                    </div>
                </div>}
                {isSend && searchParamsToken === null && <div role="status">
                    <div className="flex flex-col items-center justify-center h-screen w-screen">
                        <svg ariaHidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                        <h2 className="p-4">Reset password link has been send to your email.</h2>
                    </div>
                </div>}
                {isSuccessSend && !isSend && searchParamsToken === null && <div role="status">
                    <div className="flex flex-col items-center justify-center h-screen w-screen">
                        <CheckCircleOutlineIcon color="success" fontSize="large" />
                        <h2 className="p-3">Please check your email.</h2>
                    </div>
                </div>}
                {searchParamsToken !== null &&
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Reset your password
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={submitUserToken}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                                    <input
                                        style={{ borderColor: isError && newPassword?.password?.length === 0 ? 'red' : '' }}
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                        placeholder="name@company.com"
                                        required=""
                                        onChange={(e) => {
                                            setNewPassword((prevSendData) => ({
                                                ...prevSendData,
                                                password: e.target.value
                                            }));
                                        }}
                                    />
                                    {isError && newPassword?.password?.length === 0 && <span style={{ color: "red", margin: "3px" }}>Please enter the new password</span>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input
                                        style={{ borderColor: isError && newPassword?.confirmPassword !== newPassword?.password || isError && newPassword?.confirmPassword?.length === 0 ? 'red' : newPassword?.confirmPassword === newPassword?.password && newPassword?.confirmPassword ? 'green' : '' }}
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="relative bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                        placeholder="name@company.com"
                                        required=""
                                        onChange={(e) => {
                                            setNewPassword((prevSendData) => ({
                                                ...prevSendData,
                                                confirmPassword: e.target.value
                                            }));
                                        }}
                                    />
                                    {newPassword?.password === newPassword?.confirmPassword && newPassword?.confirmPassword &&
                                        <CheckCircleOutlineIcon
                                            className="absolute bottom-2 right-2"
                                            style={{ color: newPassword?.confirmPassword === newPassword?.password ? 'green' : '' }}
                                        />}
                                </div>
                                {isError && (newPassword?.confirmPassword !== newPassword?.password || newPassword?.confirmPassword?.length === 0) && <span style={{ color: "red", margin: "3px" }}>Confirmed password is incorrect!</span>}
                                <button onClick={submitUserToken} type="button" className="w-full mt-2 transition delay-50 border-none text-white bg-sky-400 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 outline-none">Submit</button>
                            </form>
                            <Link onClick={toggleForgotPassword} to="/" className="text-sm font-light text-primary-600 hover:underline cursor-pointer">
                                Back to sign in.
                            </Link>
                        </div>
                    </div>
                }
            </div>
            {isSendInEmail && <Notification onClose={() => setIsSendInEmail(false)} message={'Reset password link sent to your email.'} condition='success' />}
        </section>
    );
};
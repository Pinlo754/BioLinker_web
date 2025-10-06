import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import background from "../../assets/background.jpg";
import logo_big from "../../assets/logo_big.png";
import { Link } from "react-router-dom";
import useCreateAccount from "./useCreateAccount";
const CreateAccount = () => {
    const { 
        validEmail, 
        validSubmit, 
        handleCreateAccount,
        email,
        setEmail
    } = useCreateAccount();
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col ">
            <Header />
            <div className="relative flex items-center pt-10">
                <img 
                    src={background} 
                    alt="background" 
                    className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="relative flex flex-row md:flex-row items-center py-12 w-full max-w-7xl justify-around mx-auto z-10">
                    <div className="flex-[3] flex ml-10 items-center w-full mb-8 md:mb-0">
                        <img
                            src={logo_big}
                            className="w-[63%]"
                            alt="logo"
                        />
                    </div>
					<div className="flex-[1] w-full min-w-[500px] max-w-xl bg-white rounded-3xl shadow-xl p-8 md:p-10 ">
						<form className="space-y-6">
							<div className="text-center space-y-2">
								<h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">Create an account</h2>
								<p className="text-gray-600 text-base">
									Already have an account? <Link to="/login" className="font-medium text-gray-900 underline">Log in</Link>
								</p>
							</div>

							<div className="space-y-3">
								<button type="button" className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-5 py-3 text-gray-800 hover:bg-gray-50 transition">
                                    <svg width="32" height="32" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="17.8706" cy="17.2041" r="15.0605" fill="#0C82EE"/>
                                        <path d="M23.4792 21.8098L24.1482 17.559H19.9631V14.8018C19.9631 13.6386 20.5466 12.504 22.4211 12.504H24.325V8.88512C24.325 8.88512 22.5979 8.5979 20.9475 8.5979C17.4992 8.5979 15.2475 10.6342 15.2475 14.3192V17.559H11.416V21.8098H15.2475V32.0864C16.0167 32.2042 16.8036 32.2644 17.6053 32.2644C18.4069 32.2644 19.1939 32.2042 19.9631 32.0864V21.8098H23.4792Z" fill="white"/>
                                    </svg>
									<span className="text-sm md:text-base">Continue with Facebook</span>
								</button>
								<button type="button" className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-5 py-3 text-gray-800 hover:bg-gray-50 transition">
                                    <svg width="30" height="30" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24.2048 13.6967C24.2048 12.768 24.1279 12.0903 23.9614 11.3875H13.1399V15.5792H19.4919C19.3639 16.621 18.6723 18.1898 17.1355 19.244L17.114 19.3843L20.5355 21.9819L20.7726 22.0051C22.9497 20.0347 24.2048 17.1355 24.2048 13.6967" fill="#4285F4"/>
                                        <path d="M13.1385 24.7414C16.2505 24.7414 18.863 23.7373 20.7712 22.0054L17.1341 19.2442C16.1608 19.9094 14.8545 20.3738 13.1385 20.3738C10.0906 20.3738 7.50368 18.4034 6.58153 15.6799L6.44636 15.6912L2.88857 18.3896L2.84204 18.5163C4.73739 22.2062 8.63058 24.7414 13.1385 24.7414Z" fill="#34A853"/>
                                        <path d="M6.5834 15.6799C6.34008 14.9771 6.19926 14.224 6.19926 13.4459C6.19926 12.6677 6.34008 11.9148 6.5706 11.2119L6.56415 11.0623L2.96177 8.32056L2.8439 8.3755C2.06274 9.90667 1.6145 11.6261 1.6145 13.4459C1.6145 15.2657 2.06274 16.9851 2.8439 18.5163L6.5834 15.6799" fill="#FBBC05"/>
                                        <path d="M13.1386 6.51816C15.3029 6.51816 16.7628 7.43434 17.5952 8.19996L20.8481 5.08744C18.8503 3.26763 16.2505 2.15063 13.1386 2.15063C8.63061 2.15063 4.7374 4.6858 2.84204 8.3756L6.56874 11.212C7.50371 8.4886 10.0906 6.51816 13.1386 6.51816" fill="#EB4335"/>
                                    </svg>
									<span className="text-sm md:text-base">Continue with Google</span>
								</button>
							</div>

							<div className="relative flex items-center justify-center py-2">
								<div className="h-px w-full bg-gray-200" />
								<span className="absolute bg-white px-3 text-gray-500">OR</span>
							</div>

							<div className="space-y-2">
								<p className="text-center text-xl text-gray-600">Enter your email address to create an account.</p>
								<label className="block text-lg text-gray-700">Your email</label>
								<input type="email" placeholder="name@example.com" 
                                        className="w-full mb-2 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400" 
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                />
                                {validEmail === false && validSubmit ? <span className=" ml-4 mt-6 text-red-500 text-base">Please enter a valid email address</span > : ""}
							</div>

							<button type="button" 
                                    className="w-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-6 py-4 text-white text-2xl font-semibold shadow-md hover:brightness-95 transition"
                                    onClick={() => handleCreateAccount(email)}
                            >
								Create an account
							</button>
						</form>
					</div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CreateAccount;
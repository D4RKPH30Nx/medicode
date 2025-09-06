import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [loginStep, setLoginStep] = useState('enter-abha');

    const [abhaId, setAbhaId] = useState('');
    const [otp, setOtp] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Request OTP from the backend
    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setError('');

        // Validation for ABHA ID
        if (!abhaId) {
            setError('Please enter an ABHA ID.');
            return;
        }
        const abhaIdRegex = /^\d{2}-\d{4}-\d{4}-\d{4}$/;
        if (!abhaIdRegex.test(abhaId)) {
            setError('Invalid format. Please use XX-XXXX-XXXX-XXXX.');
            return;
        }

        setIsLoading(true);

        // try {
        //     // This is the API call to your backend to generate and send the OTP
        //     const API_URL = 'https://your-backend-api.com/auth/request-otp'; // <- api call to genrate actual backend

        //     // await axios.post(API_URL, { abhaId });

        //     // If the request is successful, move to the next step
        //     //     setLoginStep('enter-otp');

        //     // } catch (err) {
        //     //     console.error('OTP Request Failed:', err);
        //     //     setError('Failed to send OTP. Please check the ABHA ID.');
        //     // } finally {
        //     //     setIsLoading(false);
        //     // }

        setTimeout(() => {
            console.log("Mock API: OTP request successful for", abhaId);
            setIsLoading(false);
            setLoginStep('enter-otp');
        }, 1000);
    };

    // Verify the OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');

        if (!otp || otp.length < 6) {
            setError('Please enter a valid 6-digit OTP.');
            return;
        }

        setIsLoading(true);

        // try {
        //     // API call to verify the ABHA ID and the OTP
        //     const API_URL = 'https://your-backend-api.com/auth/verify-otp'; // <-actual api

        //     // const response = await axios.post(API_URL, { abhaId, otp });

        //     // Assuming the backend returns a token upon successful verification
        //     const token = response.data.token;
        //     localStorage.setItem('authToken', token);
        //     navigate('/emr');

        // } catch (err) {
        //     console.error('OTP Verification Failed:', err);
        //     setError('Invalid OTP. Please try again.');
        // } finally {
        //     setIsLoading(false);
        // }

        setTimeout(() => {
            console.log("Mock API: OTP verification successful with OTP", otp);
            const fakeToken = `dummy-token-for-${abhaId}`;
            localStorage.setItem('authToken', fakeToken);
            setIsLoading(false);
            navigate('/emr'); // to dasboard
        }, 1000);
    };

    const goBackToAbhaInput = () => {
        setError('');
        setOtp('');
        setLoginStep('enter-abha');
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-pink-200 p-4 select-none">
            <div className="p-8 pt-6 bg-pink-100 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <svg className="w-11 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h1 className="text-3xl font-bold text-center mb-2 text-[#00825c]">MediCode</h1>
                <p className="text-center text-gray-500 mb-8">
                    {loginStep === 'enter-abha' ? 'EMR Secured Login' : 'Enter OTP Sent to Your Phone'}
                </p>

                <form onSubmit={loginStep === 'enter-abha' ? handleRequestOtp : handleVerifyOtp}>

                    {/* ABHA ID imput*/}
                    {loginStep === 'enter-abha' && (
                        <div className="mb-4">
                            <label htmlFor="abhaId" className="block text-gray-700 font-bold mb-2">ABHA ID</label>
                            <input
                                type="text"
                                id="abhaId"
                                value={abhaId}
                                onChange={(e) => {
                                    setAbhaId(e.target.value);
                                    if (error) setError('');
                                }}
                                placeholder="e.g., 12-3456-7890-1234"
                                className={`w-full px-4 text-black py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                            />
                        </div>
                    )}

                    {/* OTP input*/}
                    {loginStep === 'enter-otp' && (
                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-gray-700 font-bold mb-2">6-Digit OTP</label>
                            <input
                                type="tel"
                                id="otp"
                                value={otp}
                                maxLength="6"
                                onChange={(e) => {
                                    setOtp(e.target.value);
                                    if (error) setError('');
                                }}
                                placeholder="_ _ _ _ _ _"
                                className={`w-full text-center tracking-[1em] px-4 text-black py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                            />
                        </div>
                    )}

                    {error && <p className="text-red-500 text-sm mt-1 mb-2 text-center font-semibold">{error}</p>}

                    <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                {loginStep === 'enter-abha' ? 'Requesting OTP...' : 'Verifying OTP...'}
                            </>
                        ) : (
                            loginStep === 'enter-abha' ? 'Get OTP' : 'Log In'
                        )}
                    </button>

                        {/* to change abhai id */}
                    <div className='flex gap-1 justify-center items-center mt-3 text-sm'>
                        {loginStep === 'enter-otp' && (
                            <>
                                <a className='underline cursor-pointer' onClick={goBackToAbhaInput}>Change ABHA ID</a>
                                <span className='mx-1'>|</span>
                            </>
                        )}
                        <p>Don't have an ABHA number?</p>
                        <a className='underline' href="https://abha.abdm.gov.in/abha/v3/" target="_blank" rel="noopener noreferrer">Create now</a>
                    </div>

                </form>
            </div>
        </main>
    );
}

export default LoginPage;
import { useState } from "react";
import { postData } from "../../api/fetchers";
import { useNavigate } from "react-router-dom";
const useSignUp = () => {
// Month Options
  const monthOptions = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
]

// Date Options
const dateOptions = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString();
    return { value: day, label: day };
});

// Year Options
const yearOptions = Array.from({ length: 125 }, (_, i) => {
    const year = (2024 - i).toString();
    return { value: year, label: year };
});

// Validate Password
const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    return hasMinLength && hasLetters && hasNumbers && hasSymbols
};

// Check Date
const checkDate = () => {
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);
    const date = new Date(y, m-1, d);
    if (date.getDate() !== d || date.getMonth() !== m - 1 || date.getFullYear() !== y) {
        return { isValid: false, error: 'Invalid date' };
      }
    return { isValid: true, date: date };
}

// State
const [showPassword, setShowPassword] = useState(false);
const [gender, setGender] = useState("");
const [month, setMonth] = useState("");
const [day, setDay] = useState("");
const [year, setYear] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");   
const [agree, setAgree] = useState(false);
const [password, setPassword] = useState("");
const [checkField, setCheckField] = useState(false);
const [validDate, setValidDate] = useState(false);
const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const [error, setError] = useState(false);
const navigate = useNavigate();

// Handle Sign Up    
const handleSignUp = async (email: string) => {
    setCheckField(true)
    const { isValid, date } = checkDate();
    setValidDate(isValid);
    if(isValid && validatePassword(password) && agree && firstName !== "" && lastName !== "" && gender !== ""){
        console.log(gender, month, day, year, agree, firstName, lastName, password, date, email);
        const data = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            dateOfBirth: date,
        }
        setLoading(true);
        try {
            const response = await postData("Auth/Register", data);
            const userId = response.message.userId;
            localStorage.setItem("userId", userId);
            if(response){
                navigate("/get-started", { state: { username: data.firstName+ " " + data.lastName, email: email, password: password} });
            }
        } catch (error) {
            setErrorMessage("Something went wrong, please try again later");
            setError(true)
        } finally {
            setLoading(false);
        }
    } else {
        setErrorMessage("Please fill in all fields");
    }
}
return { 
    monthOptions, 
    dateOptions, 
    yearOptions, 
    validatePassword, 
    showPassword, 
    setShowPassword, 
    gender, 
    setGender,
    setMonth, 
    setDay, 
    setYear, 
    firstName, 
    setFirstName, 
    lastName, 
    setLastName, 
    agree, 
    setAgree, 
    password, 
    setPassword, 
    checkField, 
    handleSignUp,
    validDate,
    loading,
    errorMessage,
    error
    };
}
export default useSignUp;
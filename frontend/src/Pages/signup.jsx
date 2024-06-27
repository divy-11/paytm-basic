import Heading from "../Components/Heading"
import SubHeading from "../Components/SubHeading"
import InputPart from "../Components/InputPart"
import Button from "../Components/Button"
import { BottomWarning } from "../Components/BelowWarning"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstname] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="bg-slate-300 h-screen flex justify-center"> {/*Horizontally*/}
            <div className="flex flex-col justify-center"> {/*Vertically*/}
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <div className="text-4xl"><Heading label={"Sign Up"} /></div>
                    <SubHeading content={"Enter your information to create an account"} />
                    <InputPart head={"First Name"} onChange={(e) => { setFirstname(e.target.value) }} placeholder={"John"} />
                    <InputPart head={"Last Name"} onChange={(e) => { setLastName(e.target.value) }} placeholder={"Doe"} />
                    <InputPart head={"Email"} onChange={(e) => { setUsername(e.target.value) }} placeholder={"john@gmail.com"} />
                    <InputPart head={"Password"} onChange={(e) => { setPassword(e.target.value) }} placeholder={"77732"} />
                    <div className="pt-4">
                        <Button onClick={async () => {
                            const resp = await axios.post("http://localhost:3000/api/v1/user/signup",
                                {
                                    firstName,
                                    lastName,
                                    username,
                                    password
                                })
                            localStorage.setItem("token", resp.data.token)
                            localStorage.setItem("username", username)
                            localStorage.setItem("name", firstName + " " + lastName)
                            navigate("/dashboard")
                        }} label={"Sign Up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}

export default Signup
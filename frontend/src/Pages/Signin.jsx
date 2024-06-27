import Heading from "../Components/Heading"
import SubHeading from "../Components/SubHeading"
import InputPart from "../Components/InputPart"
import Button from "../Components/Button"
import { BottomWarning } from "../Components/BelowWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <div className="text-4xl"><Heading label={"Sign In"} /></div>
                    <SubHeading content={"Enter your credentials to access your account"} />
                    <InputPart head={"Email"} onChange={(e) => { setUsername(e.target.value) }} placeholder={"john@gmail.com"} />
                    <InputPart head={"Password"} onChange={(e) => { setPassword(e.target.value) }} placeholder={"77732"} />
                    <div className="pt-4">
                        <Button onClick={async () => {
                            const resp = await axios.post("http://localhost:3000/api/v1/user/signin",
                                {
                                    username,
                                    password
                                })
                            console.log(resp)
                            localStorage.setItem("token", resp.data.token)
                            localStorage.setItem("username", username)
                            localStorage.setItem("name", resp.data.name)
                            navigate("/dashboard")
                        }} label={"Sign In"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}

export default Signin
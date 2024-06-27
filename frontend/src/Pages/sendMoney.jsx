import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../Components/Heading"
import { useState } from "react";
import axios from "axios";


function SendMoney() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const to = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    return (<div className="flex justify-center bg-gray-200 h-screen">
        <div className="flex h-full flex-col justify-center">
            <div className="border text-card-foreground max-w-md p-4 space-y-5 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex justify-center text-3xl mb-16">
                    <Heading label={"Send Money"} />
                </div>
                <div className="flex space-x-4">
                    <div className="bg-green-500 border rounded-full h-12 w-12 text-2xl flex flex-col justify-center">
                        <div className="text-white flex flex justify-center">{name[0].toUpperCase()}</div>
                    </div>
                    <div className="text-2xl font-semibold flex flex-col justify-center">
                        {name}
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                        <label
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="amount"
                        >
                            Amount (in Rs)
                        </label>
                        <input
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            id="amount"
                            placeholder="Enter amount"
                        />
                    </div>
                    <button onClick={() => {
                        axios.post("http://localhost:3000/api/v1/account/transfer",
                            {
                                to,
                                amount
                            },
                            {
                                headers: {
                                    'Authorization': localStorage.getItem("token"),
                                    'Content-Type': 'application/json'
                                }
                            })
                        navigate("/dashboard")
                    }}
                        class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white ">
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    </div >
    )
}
export default SendMoney
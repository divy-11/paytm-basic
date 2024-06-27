import Appbar from "../Components/Appbar"
import Balance from "../Components/Balance"
import UserList from "../Components/UserList"
import { useEffect, useState } from "react"
import axios from "axios"


function Dashboard() {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                'Authorization': localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        })
            .then(response => { setBalance(response.data.balance) })
    })
    return (<>
        <Appbar />
        <Balance amount={balance} />
        <UserList />
    </>)
}
export default Dashboard
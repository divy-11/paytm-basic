import { useEffect, useState } from "react"
import Button from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserList() {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(resp => {
                setUsers(resp.data.user)
            })
        // setUsers(resp.data.user)
    }, [filter])

    return (
        <div>
            <div className="text-lg mt-6 font-bold">Users</div>
            <div className="my-2">
                <input onChange={(e) => {
                    setFilter(e.target.value)
                }
                } className="my-1 w-full border px-2 py-1 border-slate-200 rounded" placeholder="Search Users..." type="text" />
            </div>
            <div className="space-y-2">
                {users.map(user => {
                    if (!(user.username == localStorage.getItem("username"))) { return < User name={user} /> }
                })}
            </div>
        </div>)
}

function User({ name }) {
    const navigate = useNavigate();

    return (<div className="flex justify-between">
        <div className="flex ">
            <div className="mx-2 mt-1 bg-slate-200 border rounded-full h-12 w-12 text-xl flex flex-col justify-center">
                <div className="flex flex justify-center">{name.firstName[0].toUpperCase()}</div>
            </div>
            <div className="flex flex-col justify-center">
                {name.firstName} {name.lastName}
            </div>
        </div>
        <div className="flex flex-col justify-center">
            <Button onClick={() => {
                navigate("/send?id=" + name._id + "&name=" + name.firstName)
            }} label={"Send Money"} />
        </div>
    </div>)
}
export default UserList
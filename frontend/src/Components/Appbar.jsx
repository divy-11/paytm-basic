function Appbar() {

    return <div className="flex h-14 justify-between shadow">
        <div className="flex flex-col justify-center mx-4">PayTM App</div>
        <div className="flex">
            <div className="flex flex-col justify-center mr-2">Hello, {localStorage.getItem("name")}</div>
            <div className="mx-2 mt-1 bg-slate-200 border rounded-full h-12 w-12 text-xl flex flex-col justify-center">
                <div className="flex flex justify-center">{localStorage.getItem("name")[0].toUpperCase()}</div>
            </div>
        </div>

    </div >
}
export default Appbar
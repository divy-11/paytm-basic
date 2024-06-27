
function Balance({ amount }) {
    
    return (<div className="flex h-10 text-lg">
        <div className="flex flex-col justify-center font-bold">Your Balance</div>
        <div className="flex flex-col justify-center font-semibold mx-4">Rs {amount}</div>
    </div>)
}
export default Balance 
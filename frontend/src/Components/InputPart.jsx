function InputPart({ head, placeholder,onChange }) {
    return (
        <>
            <div className="text-sm font-medium text-left py-2">{head}</div>
            <input type="text" onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
        </>
    )
}

export default InputPart

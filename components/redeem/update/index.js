export default function Update(props) {
    const onSubmitHandler = (e) => {
        e.preventDefault();

        props.generateCode();
    }
    return (
        <div className="mt-5 p-4 w-4/5 mx-auto bg-gray-200 border-2 border-gray-500 rounded-lg">
            <div className="flex lg:flex-row flex-col">
                <div className="flex-1">
                    <div className="flex flex-col">
                        <div className="flex-1 mb-5">
                            <p className="text-2xl font-bold">Generate A Redeem Code</p>
                        </div>
                        <div>
                            <p>Student: {props.name}</p>
                            <p>Email: {props.email}</p>
                        </div>
                        <div className="flex-none mt-5 w-11/12">
                            <label>Redeem Code:</label>
                            <input
                                type="text"
                                name="code"
                                id="code"
                                value={props.redeemCode}
                                disabled={true}
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                            />
                        </div>                        
                    </div>
                </div>
                <div className="flex-1 lg:mt-0 mt-5">
                    <div className="flex flex-col">
                        <div className="flex-none w-full">
                            <button
                                onClick={(e) => onSubmitHandler(e)}
                                className="flex w-full justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800"
                            >
                                Generate Code
                            </button>
                        </div>
                        <div className="flex-none mt-2 w-full">
                            <button
                                onClick={(e) => props.disableCode()}
                                className="flex w-full justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800"
                            >
                                { props.isExpire === false ? "Disable Code" : "Enable Code" }
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
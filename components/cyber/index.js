export default function CyberComp(props) {
    const { title, description } = props.courses[0];
    return (
        <div>
            <div className="bg-zinc-700">
                <div className="flex flex-col w-3/4 mx-auto">
                    <div className="flex-1 mt-5 mb-3">
                        <p className="text-2xl text-white font-bold">{title}</p>
                    </div>
                    <div className="flex-1 mt-2 mb-5">
                        <p className="text-xl text-white font-semibold">{description}</p>
                    </div>
                </div>
            </div>
            <div className="flex lg:w-3/4 w-full mx-auto mt-5 pt-4">
                <div className="overflow-y-auto lg:w-full w-3/4 mx-auto">
                <table className="w-full text-center">
                    <thead>
                        <tr>
                            <th className="border py-2 text-xl">Date</th>
                            <th className="border py-2 text-xl">Lab Name</th>
                            <th className="border py-2 text-xl">Description</th>
                            {
                                props.role == "admin" ?
                                    <th className="border py-2 text-xl">Action</th> : ""
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.courses ?
                                props.courses.map((course) => {
                                    return course.labs.map((module, index) => {
                                        return <tr key={index}>
                                            <td className="border py-5 text-lg">{module.date}</td>
                                            <td className="border py-5 text-lg"><a href={`${module.path}`} target="_blank" rel="noreferrer" className="text-lg text-blue-700 cursor-pointer">{module.name}</a></td>
                                            <td className="border py-5 text-lg">{module.desc}</td>
                                            {
                                                props.role == "admin" ?
                                                <td className="border py-5 text-lg">
                                                    <a onClick={() => props.editCyber(course._id, index)} className="cursor-pointer p-2 mx-2 text-white text-lg font-semibold bg-cyan-700 hover:bg-cyan-800">Edit</a>
                                                </td> : ""
                                            }
                                        </tr>
                                    })
                                }) : ""
                        }
                    </tbody>
                </table>     
                </div>
                           
            </div>            
        </div>

    )
}
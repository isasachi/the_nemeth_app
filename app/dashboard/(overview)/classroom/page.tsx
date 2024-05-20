import AddNewClassroomButton from "@/app/components/new-classroom-button";
import NavButton from "@/app/components/nav-button";
import { fetchClassroomsByTeacher } from "@/app/lib/dbQueries";

export default async function Page() {
    const teacher_id = '410c4cad-94da-4680-945d-d4a77ecb924d';

    const tableData = await fetchClassroomsByTeacher(teacher_id);

    return(
        <div>
            <h1 className="text-xl font-semibold">Classrooms</h1>
            <div className="flex flex-row justify-end itmes-center">
                <AddNewClassroomButton />
            </div>
            <div className="flex flex-col space-y-6 pt-8 pb-8 md:hidden">
                {tableData.map(data => {
                    return (
                        <div className="p-2 bg-slate-100 border rounded-md">
                            <div className="flex flex-row justify-between">
                                <div>
                                    <p className="text-lg font-semibold">{data.name}</p>
                                    <span className="text-xs">{data.level}</span>
                                </div>
                                <div className="self-center">
                                    <NavButton text="Edit" linkPath=""/>
                                </div>
                            </div>
                            <div className="mt-2 pt-2 flex flex-col justify-center items-center border-t-2 border-slate-300">
                                <p className="text-lg mb-2">{data.days.map(day => (`${day} `))}</p>
                                <p className="font-semibold">{data.time}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <table className="hidden w-full divide-y divide-gray-200 md:table">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Level</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tableData.map(data => {
                            return (
                                <tr key={data.classroom_id}>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap">{data.name}</td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap">{data.level}</td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap">{data.days.map(day => (`${day} `))}</td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap">{data.time}</td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap"><NavButton text="Edit" linkPath=""/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
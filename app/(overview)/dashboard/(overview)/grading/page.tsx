'use client';

import AddNewGradingButton from "@/app/components/new-grading-button"; 
import NavButton from "@/app/components/nav-button";
import { useState } from "react";
import ValueSelectForm from "@/app/components/select-value-form";

export default function Page() {
    const teacher_id = 'b212f18a-e3e7-4352-ac4b-d3143aaa6f55';

    const [grading, setGrading] = useState<any>()

    return(
        <div>
            <div className="max-w-sm mb-5">
                <ValueSelectForm teacher_id={teacher_id} value={grading} setValue={setGrading} fetchValuesString="/api/names_id?teacher_id=" fetchDataString="/api/grading?classroom_id="/>
            </div>
            <h1 className="text-xl font-semibold">Grading</h1>
            <div className="flex flex-row justify-end itmes-center">
                <AddNewGradingButton />
            </div>
            <div className="flex flex-col gap-3 p-1 md:hidden">
                {grading?.map((grading:any) => {
                    return(
                        <div className="flex flex-col mx-auto max-w-96 p-3 gap-5 bg-slate-100 border border-slate-200 rounded-md">
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-semibold">{`${grading.student.first_name} ${grading.student.last_name}`}</h2>
                                <p className="font-semibold">{grading.classroom.name}</p>
                                <p>{`${grading.year}-${grading.period}`}</p>
                            </div>
                            <div className="grid grid-cols-2 auto-rows-auto gap-5">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="font-semibold break-all">Listening</p>
                                    <p>{grading.listening}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="font-semibold break-all">Reading</p>
                                    <p>{grading.reading}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="font-semibold break-all">Writing</p>
                                    <p>{grading.writing}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="font-semibold break-all">Speaking</p>
                                    <p>{grading.speaking}</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <NavButton text="View more" linkPath=""/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <table className="hidden w-full divide-y divide-gray-200 md:table">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Classroom</th>
                            <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Quarter</th>
                            <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Listening</th>
                            <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Reading</th>
                            <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Writing</th>
                            <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Speaking</th>
                            <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {grading?.map((grading:any) => {
                            return (
                                <tr key={grading.classroom_id}>
                                    <td className="px-4 py-2 text-sm whitespace-nowrap">{`${grading.student.first_name} ${grading.student.last_name}`}</td>
                                    <td className="px-4 py-2 text-sm whitespace-nowrap">{grading.classroom.name}</td>
                                    <td className="px-4 py-2 text-sm whitespace-nowrap">{`${grading.year}-${grading.period}`}</td>
                                    <td className="px-4 py-2 text-sm whitespace-nowrap">{grading.listening}</td>
                                    <td className="px-4 py-2 text-sm whitespace-nowrap">{grading.reading}</td>
                                    <td className="px-4 py-2 text-sm whitespace-nowrap">{grading.writing}</td>
                                    <td className="px-4 py-2 text-sm whitespace-nowrap">{grading.speaking}</td>
                                    <td className="px-4 py-2 text-sm whitespace-nowrap"><NavButton text="View more" linkPath=""/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
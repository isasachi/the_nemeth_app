'use client';

import AddNewGradingButton from "@/app/components/new-grading-button"; 
import NavButton from "@/app/components/nav-button";
import { useState } from "react";
import ValueSelectForm from "@/app/components/select-value-form";

export default function Page() {
    const teacher_id = '410c4cad-94da-4680-945d-d4a77ecb924d';

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
            <div className="flex flex-col gap-3 p-3 md:flex-row md:flex-wrap">
                {grading?.map((grading:any) => {
                    return(
                        <div className="flex flex-col mx-auto max-w-[320px] p-3 gap-5 bg-slate-100 border border-slate-200 rounded-md">
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-semibold">{`${grading.students.first_name} ${grading.students.last_name}`}</h2>
                                <p className="font-semibold">{grading.classrooms.name}</p>
                                <p>{`${grading.year}-${grading.period}`}</p>
                            </div>
                            <div className="grid grid-cols-2 auto-rows-auto gap-5 md:grid-cols-3 md:text-sm">
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
                                <div className="flex flex-col justify-center items-center">
                                    <p className="font-semibold break-all">Grammar</p>
                                    <p>{grading.grammar_vocab}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="font-semibold break-all">Project</p>
                                    <p>{grading.project}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="font-semibold break-all">Conversation</p>
                                    <p>{grading.conversation}</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <NavButton text="View" linkPath=""/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
'use client'

import { useState } from "react"
import ValueSelectForm from "@/app/components/select-value-form"
import { v4 as uuidv4 } from 'uuid'
import { sendGrading } from "@/app/lib/actions"
import toast from "react-hot-toast"

export default function Grading() {
    const [classroom, setClassroom] = useState<any>();

    const teacher_id = 'b212f18a-e3e7-4352-ac4b-d3143aaa6f55';

    const handleGradingSubmission = async (formData: FormData) => {
        const res = await sendGrading(formData);
        if (res?.error) {
        toast.error(res.error)
        } else {
        toast.success('Grading recorded successfully')
        }
    }
    
    return (
        <div className='p-4 flex flex-col text-sm md:max-w-md md:mx-auto'>
            <ValueSelectForm teacher_id={teacher_id} value={classroom} setValue={setClassroom} fetchValuesString="/api/names_id?teacher_id=" fetchDataString="/api/classroom_students?classroom_id="/>
            <h3 className='font-semibold text-lg py-2'>{classroom?.name}</h3>
            <form action={handleGradingSubmission} className='flex flex-col space-y-3' >
            <input type="hidden" name="grading_id" value={uuidv4()} />
            <div className="flex flex-row gap-5">
                <div>
                    <label>Quarter</label>
                    <input type="text" name="period" className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500" />
                </div>
                <div>
                    <label>Year</label>
                    <input type="text" name="year" className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500" />
                </div>  
            </div>
            <label>Select a student</label>
            <div className='flex flex-col space-y-1'>
            {classroom?.classroomStudents?.map((item: any) => (
            <label>
              <input type='radio' name='student_id' value={item.student_id} className='mr-1' />
              {`${item.student.first_name} ${item.student.last_name}`}
            </label>
            ))}
            </div>
            <label>Fill in grades</label>
            <div className="grid grid-cols-4 auto-rows-auto gap-5">
                <div>
                    <label htmlFor="listening" className="block mb-1">Listening</label>
                    <input type="number" name="listening" className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500" />
                </div>
                <div>
                    <label htmlFor="reading" className="block mb-1">Reading</label>
                    <input type="number" name="reading" className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500" />
                </div>
                <div>
                    <label htmlFor="writing" className="block mb-1">Writing</label>
                    <input type="number" name="writing" className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500" />
                </div>
                <div>
                    <label htmlFor="speaking" className="block mb-1">Speaking</label>
                    <input type="number" name="speaking" className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500" />
                </div>
                <div>
                    <label htmlFor="grammar_vocab" className="block mb-1">Grammar</label>
                    <input type="number" name="grammar_vocab" className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500" />
                </div>
                <div>
                    <label htmlFor="project" className="block mb-1">Project</label>
                    <input type="number" name="project" className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500" />
                </div>
                <div>
                    <label htmlFor="conversation" className="block mb-1">Conversation</label>
                    <input type="number" name="conversation" className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500" />
                </div>
            </div>
            <label>Teacher comment</label>
            <textarea name="teacher_comment" cols={30} rows={10} className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500"></textarea>
            <input type="hidden" name="classroom_id" value={classroom?.classroom_id} />
                <input 
                    type="submit" 
                    value="Send" 
                    className='w-full px-4 py-2 bg-violet-500 text-white font-bold rounded-md hover:bg-violet-600 focus:outline-none focus:bg-violet-600'    
                />
            </form>
        </div>
    )
}
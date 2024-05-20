'use client'

import {v4 as uuidv4} from 'uuid';
import DatePicker, { Value } from 'react-multi-date-picker';
import { useState, useEffect } from 'react';
import { createClassroom } from '../lib/actions';
import 'react-multi-date-picker/styles/colors/purple.css';
import toast from 'react-hot-toast';


export default function ClassroomForm({teacher_id}:{teacher_id:string}) {
    const classroom_id = uuidv4();
    const levelData = ['AEF1:1', 'AEF1:2', 'AEF1:3', 'AEF1:4', 'AEF1:5'];
    const daysData = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const [scheduleValue, setScheduleValue] = useState<Value>([]);
    const [students, setStudents] = useState<any>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/students');
                if (!response.ok) {
                throw new Error('Failed to fetch students');
                }
                const studentsData = await response.json();
                setStudents(studentsData);
                console.log(studentsData)
            } catch (error) {
                console.error('Error fetching students:', error);
            }
            };
    
        fetchData();
    }, [])

    const handleClassroomCreation = async (formData: FormData) => {
        const res = await createClassroom(formData);
        if (res?.error) {
        toast.error(res.error)
        } else {
        toast.success('Classroom created successfully')
        }
    }

    return(
        <div className="mt-6 pb-6 mx-2 text-sm md:max-w-[450px] md:mx-auto">
            <form action={handleClassroomCreation} className="flex flex-col grow space-y-5" >
                <input type="hidden" name="classroom_id" value={classroom_id} />
                <label htmlFor="name">Classroom name</label>
                <input 
                    type="text" 
                    name="name" 
                    className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500"
                /> 
                <label htmlFor="level">Level</label>
                <select 
                    name="level"
                    className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500"
                >
                {levelData.map(level => {
                    return(
                        <option value={level}>{level}</option>
                        )
                    })}
                </select>
                <label htmlFor="days">Days</label>
                <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:justify-evenly'>
                    {daysData.map(day => {
                        return(
                            <div className='flex md:flex-row md:justify-evenly items-center'>
                                <input type="checkbox" name="days" value={day} className='w-5 h-5 accent-violet-500'/>
                                <span className='mx-1'>{day}</span>
                            </div>
                        )
                    })}
                </div>
                <label htmlFor="time" className='block'>Time</label>
                <select 
                    name="time"
                    className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500"
                >
                    {[...Array(18)].map((time, index) => {
                        return(
                            <option value={`${index + 6}:00`}>{`${index + 6}:00`}</option>
                        )
                    })}
                </select>
                <label htmlFor="schedule" className='block'>Schedule</label>
                <DatePicker
                    value={scheduleValue}
                    onChange={setScheduleValue}
                    type='textarea'
                    name='schedule'
                    format='MMMM DD YYYY'
                    multiple
                    sort
                    className='purple'
                    inputClass='px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500'
                />
                <label>Select students</label>
                <div className='grid grid-cols-3 auto-rows-auto'>
                {students?.map((student:any) => {
                    return(
                    <label htmlFor="students" className='flex flex-row justify-start items-center'>
                        <input type="checkbox" name="students" value={student.student_id} className='w-5 h-5 mr-1 accent-violet-500' />
                        {`${student.first_name} ${student.last_name}`}
                    </label>
                    )
                })}
                </div>
                <input type="hidden" name="teacher_id" value={teacher_id} />
                <input 
                    type="submit" 
                    value="Create" 
                    className="w-full px-4 py-2 bg-violet-500 text-white font-bold rounded-md hover:bg-violet-600 focus:outline-none focus:bg-violet-600" 
                />
            </form>
        </div>
    )
}
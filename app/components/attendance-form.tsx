'use client';

import { useState, useEffect } from 'react';
import { sendAttendance } from '../lib/actions';
import toast from 'react-hot-toast';
import ValueSelectForm from './select-value-form';
import CustomRadioButton from './custom-radio-button';

const AttendanceForm: React.FC = () => {
  const teacher_id = 'b212f18a-e3e7-4352-ac4b-d3143aaa6f55';
    
  const [classroom, setClassroom] = useState<any>();
  const [selectedOption, setSelectedOption] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleAttendanceSubmission = async (formData: FormData) => {
    const res = await sendAttendance(formData);
    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Attendance recorded successfully')
    }
  }


  return (
    <div className='p-4 flex flex-col text-sm md:max-w-md md:mx-auto'>
       <ValueSelectForm teacher_id={teacher_id} value={classroom} setValue={setClassroom} fetchValuesString='/api/names_id?teacher_id=' fetchDataString='/api/classroom_students?classroom_id=' />
      <div className='mt-2'>
          <h3 className='font-semibold text-lg pb-2'>{classroom?.name}</h3>
          <form action={handleAttendanceSubmission} className='flex flex-col space-y-3'>
            <label>Select a date</label>
            <div className='grid grid-cols-3 auto-rows-auto gap-2'>
              {classroom?.schedule?.map((item: Date) => (
                <CustomRadioButton label={new Date(item).toDateString()} name="date" value={item.toString()} checked={selectedOption === item.toString()}
                onChange={handleChange} />
              ))}
            </div>
            <label>Select students</label>
            <div className='flex flex-col space-y-1'>
            {classroom?.classroomStudents?.map((item: any) => (
            <label>
              <input type='checkbox' name='student_id' value={item.student_id} className='w-5 h-5 mr-1 accent-violet-500' />
              {`${item.student.first_name} ${item.student.last_name}`}
            </label>
            ))}
            </div>
            <label>Select attendance</label>
            <select name="value" className='px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500'>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="tardy">Tardy</option>
            </select>
            <input type="hidden" name="classroom_id" value={classroom?.classroom_id} />
            <input 
              type="submit" 
              value="Send"
              className='w-full px-4 py-2 bg-violet-500 text-white font-bold rounded-md hover:bg-violet-600 focus:outline-none focus:bg-violet-600'  
            />
          </form>
        </div>
    </div>
  );
};

export default AttendanceForm;

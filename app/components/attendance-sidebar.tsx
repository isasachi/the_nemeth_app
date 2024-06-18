'use client';

import clsx from 'clsx';
import { useState, useEffect } from 'react';

interface SidebarProps {
  classroomId: string;
  onSelectStudent: (studentId: string) => void;
}

const AttendanceSidebar: React.FC<SidebarProps> = ({ classroomId, onSelectStudent }) => {
  const [students, setStudents] = useState<any>();
  const [studentclicked, setStudentClicked] = useState<Boolean>(false);

  useEffect(() => {
    async function fetchStudents() {
      const response = await fetch(`/api/students_classroom?classroom_id=${classroomId}`);
      const rawData = await response.text();
      const data = JSON.parse(rawData);
      setStudents(data);
    }
    fetchStudents();
  }, [classroomId]);

  if (!students) {
    return(
      <div>Loading...</div>
    )
  }

  const handleStudentClick = (index: any) => {
    setStudentClicked(index);
  }

  return (
    <div className='flex flex-col w-[250px] gap-1 md:h-screen md:border-r md:border-r-slate-300'>
      <h2 className='font-semibold'>Students</h2>
      <ul className='flex flex-col space-y-1 px-2'>
        {students?.map((student:any, index:any) => (
          <li className={clsx('px-5 py-2 border border-violet-500 rounded-md',
            {
              'bg-violet-500 text-white': studentclicked === index,
              'bg-white text-black': studentclicked !== index
            }
          )} key={student.student_id} onClick={() => {
            onSelectStudent(student.student_id)
            handleStudentClick(index)
          }}>
            {`${student.student.first_name} ${student.student.last_name}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceSidebar;
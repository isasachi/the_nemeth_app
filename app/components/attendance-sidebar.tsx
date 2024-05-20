'use client';

import { useState, useEffect } from 'react';

interface SidebarProps {
  classroomId: string;
  onSelectStudent: (studentId: string) => void;
}

const AttendanceSidebar: React.FC<SidebarProps> = ({ classroomId, onSelectStudent }) => {
  const [students, setStudents] = useState<any>();

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

  return (
    <div className='flex flex-col w-[250px] gap-1 md:h-screen md:border-r md:border-r-slate-300'>
      <h2 className='font-semibold'>Students</h2>
      <ul className='flex flex-col space-y-1 px-2'>
        {students?.map((student:any) => (
          <li className='px-5 py-2 border border-violet-500 rounded-md' key={student.student_id} onClick={() => onSelectStudent(student.student_id)}>
            {`${student.first_name} ${student.last_name}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceSidebar;
'use client';

import { useState, useEffect } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

interface AttendanceListProps {
  studentId: string;
  classroomDates: string[];
}

const AttendanceView: React.FC<AttendanceListProps> = ({ studentId, classroomDates }) => {
  const [attendance, setAttendance] = useState<any>();

  useEffect(() => {
    async function fetchAttendance() {
      const response = await fetch(`/api/attendance_student?student_id=${studentId}`);
      const data = await response.json();
      setAttendance(data);
    }
    fetchAttendance();
  }, [studentId]);

  const getStatusForDate = (date: any) => {
    const attendanceRecord = attendance?.find((att:any) => att.date === date);
    if (attendanceRecord) {
        if (attendanceRecord.value === 'present') {
            return(
                <UserIcon width={24} height={24} className='text-green-500' />
            )
        } else if (attendanceRecord.value === 'absent') {
            return(
                <UserIcon width={24} height={24} className='text-red-500' />
            )
        } else if (attendanceRecord.value === 'tardy') {
            return(
                <UserIcon width={24} height={24} className='text-yellow-500' />
            )
        }
    } else {
        return(
            <span>Not recorded</span>
        )
    }
  };

  return (
    <div>
      <h2 className='font-semibold'>Attendance</h2>
      <form className='flex flex-col space-y-2'>
        {classroomDates.map((date) => {
          return(
            <label className='flex flex-row gap-2' key={date}>
                {new Date(date).toDateString()}
                <select name="" id="">
                  <option value=""></option>
                </select>
            </label>
          )
        })}
      </form>
    </div>
  );
};

export default AttendanceView;

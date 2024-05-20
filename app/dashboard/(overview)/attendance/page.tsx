'use client';

import ClassroomSelectAttendance from "@/app/components/select-classroom-attendance";
import { useState } from "react";
import AttendanceSidebar from "@/app/components/attendance-sidebar";
import AttendanceView from "@/app/components/attendance-view";
import AddNewAttendanceButton from "@/app/components/new-attendance-button";

export default function Page() {
    const teacher_id = '410c4cad-94da-4680-945d-d4a77ecb924d'

    const [classroom, setClassroom] = useState<any>()
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);


    return(
        <div>
            <div className="max-w-sm mb-5">
                <ClassroomSelectAttendance teacher_id={teacher_id} value={classroom} setValue={setClassroom} />
            </div>
            <div className="flex flex-row justify-end itmes-center">
                <AddNewAttendanceButton />
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
                <AttendanceSidebar classroomId={classroom?.classroom_id} onSelectStudent={setSelectedStudentId} />
                {selectedStudentId && (
                    <AttendanceView studentId={selectedStudentId} classroomDates={classroom?.schedule} />
                )}
            </div>
        </div>
    )
}
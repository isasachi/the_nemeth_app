export type studentShort = {
    student_id: string,
    first_name: string,
    last_name: string
} 

export type classroomStudents = {
    classroom_id: String,
    name: String,
    level: String,
    days: String[],
    time: String,
    schedule: Date[],
    teacher_id: String,
    students: studentShort[]
}
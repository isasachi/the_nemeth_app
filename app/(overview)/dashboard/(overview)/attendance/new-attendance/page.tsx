import AttendanceForm from "@/app/components/attendance-form"

export default async function Page() {    
    return (
        <div>
            <h1 className="text-xl font-semibold">Attendance</h1>
            <div>
                <AttendanceForm />
            </div>
        </div>
    )
}
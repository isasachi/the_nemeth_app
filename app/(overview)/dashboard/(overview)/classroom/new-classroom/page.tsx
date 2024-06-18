import ClassroomForm from "@/app/components/classroom-form"

export default function Page() {
    const teacher_id = 'b212f18a-e3e7-4352-ac4b-d3143aaa6f55';

    return(
        <div>
            <h1 className="text-xl font-semibold">Create new classroom</h1>
            <ClassroomForm teacher_id={teacher_id} />
        </div>
    )
}
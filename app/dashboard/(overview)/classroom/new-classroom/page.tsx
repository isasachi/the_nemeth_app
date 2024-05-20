import ClassroomForm from "@/app/components/classroom-form"

export default function Page() {
    const teacher_id = '410c4cad-94da-4680-945d-d4a77ecb924d';

    return(
        <div>
            <h1 className="text-xl font-semibold">Create new classroom</h1>
            <ClassroomForm teacher_id={teacher_id} />
        </div>
    )
}
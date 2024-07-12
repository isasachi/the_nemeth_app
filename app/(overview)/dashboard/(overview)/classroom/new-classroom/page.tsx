
import ClassroomForm from "@/app/components/classroom-form"
import { getServerSession } from "next-auth";
import { fetchteacherId } from "@/app/lib/dbQueries";

export default async function Page() {


    //Aqui quiero recuperar los datos del usuario guardados en la sesion
    const session = getServerSession()

    console.log(session)

    return(
        <div>
            <h1 className="text-xl font-semibold">Create new classroom</h1>
            <ClassroomForm teacher_id=""></ClassroomForm>
        </div>
    )
}
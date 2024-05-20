import NavButton from "./nav-button"

export default function AddNewClassroomButton () {
    return (
        <div className="mr-2 mb-2">
            <NavButton text="Add New" linkPath="classroom/new-classroom" />
        </div>
    )
}
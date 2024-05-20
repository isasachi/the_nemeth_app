import NavButton from "./nav-button";

export default function AddNewAttendanceButton (){
    return(
        <div className="mr-2 mb-2">
            <NavButton text="Record new" linkPath="attendance/new-attendance" />
        </div>
    )
}
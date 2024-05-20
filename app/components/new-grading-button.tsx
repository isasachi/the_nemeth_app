import NavButton from "./nav-button";

export default function AddNewGradingButton (){
    return(
        <div className="mr-2 mb-2">
            <NavButton text="Record new" linkPath="grading/new-grading" />
        </div>
    )
}
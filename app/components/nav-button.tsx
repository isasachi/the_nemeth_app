import Link from "next/link";

type propsType = {
    text: string,
    linkPath: string
}

const NavButton: React.FC<propsType> = (props) => {
    const {text, linkPath} = props;

    return (
        <Link 
            href={`/dashboard/${linkPath}`}
            className="bg-violet-500 hover:bg-violet-600 text-sm text-white font-semibold py-2 px-4 rounded"
        >
            {text}
        </Link>
    )
}

export default NavButton;
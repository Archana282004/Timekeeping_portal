"use client"
import Image from "next/image";
// import brand from "../../../assets/images/thumbnails/brand.png";
import togleIcon from "../../../assets/images/icons/side_bar_circle.svg";
import Link from "next/link";
const Header = ({ isActive, setIsActive }: any) => {
    const handleClick = () => {
        setIsActive(!isActive);
    };
    return (
        // <header className="main-header">
        //     <Link href="/" className="brand-link">
        //         <Image src={brand} alt="logo" />
        //     </Link>
        //     <button
        //         type="button"
        //         className="sidebar_btn_toggle"
        //         onClick={handleClick}
        //     >
        //         <Image
        //             src={togleIcon}
        //             alt="profile icon"
        //             className="sidebaricon sidebar_icon_default"
        //         />
        //     </button>
        // </header>
         null
    )
}
export default Header;
import { CardDescription, CardTitle } from "./card";

interface HeaderProps{
    title:string;
    description:string;
}
const Header = ({title, description}:HeaderProps) =>{
    return(
        <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
    )
}

export default Header;
import { FaCartShopping } from "react-icons/fa6";
import { Button } from "./ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
const Navbar = () => {
    return (
        <div className="flex justify-between items-center py-4 px-6">
            <Button variant="ghost" size="icon">
                <RxHamburgerMenu className="size-6"/>
            </Button>
            <h1 className="text-3xl ">Sklep internetowy</h1>
            <Button variant="ghost" size="icon">
                <FaCartShopping className="size-6"/>
            </Button>
        </div>
    )
}

export default Navbar;

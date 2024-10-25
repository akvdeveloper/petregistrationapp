import Image from "next/image";
import Link from "next/link";
const Header = () => {
    return (
        <header className="bg-black text-white flex items-center justify-between p-4">
            {/* Left Side - Logo */}
            <div className="flex items-center space-x-2">
                <Link href="/">
                    <Image 
                        src="/img/logo/logo.png" 
                        width={200}  // Provide fixed width and height to avoid warning
                        height={180}
                        alt="Company Logo" 
                        
                    />
                </Link>
            </div>
        </header>
    );
}

export default Header;

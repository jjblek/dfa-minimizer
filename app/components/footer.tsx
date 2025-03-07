import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-[#1a1a1a] py-4 sm:py-6">
            <div className=" px-4 flex justify-between items-center">
                <p className="text-[10px] sm:text-xs mr-2">
                    &copy; {new Date().getFullYear()} DFA Flow. All rights reserved.
                </p>
                <div className="gap-2 sm:gap-4 flex flex-wrap justify-end">
                    <Link href="" className="text-[10px] sm:text-xs hover:underline">
                        Privacy Policy
                    </Link>
                    <Link href="" className="text-[10px] sm:text-xs hover:underline">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
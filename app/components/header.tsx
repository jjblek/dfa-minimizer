'use client'
import Link from 'next/link';
import { MdMenu } from "react-icons/md";
import { useState } from 'react';
import { FaGithub } from "react-icons/fa";
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <header className="bg-gray-50 dark:bg-[#1a1a1a] py-4">
            <div className="flex items-center justify-between px-6 sm:px-10">
            <h1 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#14b8a6] to-[#22c55e]">
                DFA Flow
            </h1>
                <div className="flex items-center space-x-6">
                    {/* Desktop Menu */}
                    <nav className="hidden sm:block">
                        <ul className="flex space-x-6">
                            <li>
                                <Link href="/" className="hover:underline text-hover" onClick={closeMenu}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/learn" className="block hover:underline text-hover" onClick={closeMenu}>
                                    Learn
                                </Link>
                            </li>
                            <li>
                                <a href="https://github.com/jjblek/dfa-minimizer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-hover" onClick={closeMenu}>
                                    <FaGithub /> GitHub
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="sm:hidden z-30" onClick={toggleMenu}>
                        <MdMenu className="text-3xl text-default" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="sm:hidden bg-gray-50 dark:bg-[#1a1a1a] py-4 absolute top-10 left-0 right-0 z-20 transform transition-transform duration-300 translate-y-0">
                    <ul className="flex justify-start items-center gap-6 px-8">
                        <li>
                            <Link href="/" className="block hover:underline text-hover" onClick={closeMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/learn" className="block hover:underline text-hover" onClick={closeMenu}>
                                Learn
                            </Link>
                        </li>
                        <li>
                            <a href="https://github.com/jjblek" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-hover" onClick={closeMenu}>
                                <FaGithub /> GitHub
                            </a>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;

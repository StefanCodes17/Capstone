import React, {useState} from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {

	const [counter, setCounter] = useState(0)

	return (
		<nav className="bg-primary_color border-gray-200 px-2 sm:px-4 py-2.5">
			<div className="container flex flex-wrap justify-between items-center mx-auto">	
				<Link to="/">
					<div className="self-center text-xl font-semibold whitespace-nowrap text-white">
						LifePad
					</div>
				</Link>
				<div className="flex md:order-2">
					<Link to="signup" >
						<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Sign In</button>
					</Link>
				</div>
				<div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
					<ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
						<li>
							<a aria-current="page" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" href="#">Home</a>
						</li>
						<li>
							<a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" href="#">About</a>
						</li>
						<li>
							<a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" href="#">Services</a>
						</li>
						<li>
							<a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" href="#">Contact</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
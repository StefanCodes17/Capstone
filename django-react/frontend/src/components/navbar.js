import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {getUser} from '../state/slices/userSlice'
import {BsPersonCircle} from "react-icons/bs"
import {logout} from '../state/slices/userSlice'

const Navbar = () => {
	const dispatch = useDispatch()

	const [showDropdown,setShowDropdown]=useState(false)
	const [counter, setCounter] = useState(0)
	const user = useSelector(getUser)
	const currentRoute=useLocation().pathname

	return (
		<nav className="bg-primary_color border-gray-200 px-2 sm:px-4 py-2.5">
			<div className="container flex flex-wrap justify-between items-center mx-auto">	
				<Link to="/">
					<div className="self-center text-xl font-semibold whitespace-nowrap text-white">
						LifePad
					</div>
				</Link>
				<div className="flex md:order-2">
					{/* <Link to={!user?.isLoggedIn ? `signup` : ``} > */}
						{!user?.isLoggedIn ? (
							<Link to= "signup">
								<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Sign In</button>
							</Link>
						):(
							<div className='relative'>
							<button>
								<BsPersonCircle
								className='fill-lifepad_green l-0 h-10 w-10 relative p-1'
								onClick={()=>setShowDropdown(!showDropdown)}
								>
								</BsPersonCircle>
							</button>
							<div>
							{showDropdown && (										
								<div className='absolute z-51 grid grid-rows-2 gap-1 pr-2 -left-2 content-center'>
									<Link to= "dashboard" className={`row-start-1 ${(currentRoute==="/dashboard") ?'hidden':'visible'}`}>
										<button className='bg-lifepad_green text-lifepad_black hover:text-lifepad_green inline-block font-medium text-xs uppercase rounded shadow-md drop-shadow-md hover:bg-lifepad_black hover:shadow-lg focus:bg-green-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-400 active:shadow-lg transition duration-150 ease-in-out h-5 w-15 align-middle'>
											<h2 className="pr-1 pl-1">Dashboard</h2>
										</button>
									</Link>
									<div onClick={()=> {
											dispatch(logout())
										}}>
										<button className='bg-lifepad_green text-lifepad_black hover:text-white inline-block font-medium text-xs uppercase rounded shadow-md drop-shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-green-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-400 active:shadow-lg transition duration-150 ease-in-out h-5 w-15 align-middle'>
											<h2 className="pr-1 pl-1">Logout</h2>
										</button>
									</div>
								</div>
							)}
							</div>
							</div>
						)}
				{/* <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
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
				</div> */}
			</div>
		</div>
	</nav>
)}

export default Navbar;
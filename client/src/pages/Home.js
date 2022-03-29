import React from 'react';
import Navbar from '../components/Navbar';
import Main from '../components/Main'

const HomePage = () => {

	return (
		<div className='bg-lifepad_black h-screen w-screen'>
			<div className="h-screen max-w-screen-3xl overflow-hidden">
				<Navbar />
				<Main/>
			</div>
		</div>
	);
}

export default HomePage;
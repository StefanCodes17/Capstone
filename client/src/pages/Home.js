import React from 'react';
import Navbar from '../components/Navbar';
import Main from '../components/Main'

const HomePage = () => {

	return (
		<div className='bg-primary_color h-screen w-screen'>
			<div className="h-screen max-w-screen-2xl overflow-hidden">
				<Navbar />
				<Main/>
			</div>
		</div>
	);
}

export default HomePage;
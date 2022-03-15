import React from 'react';
import Navbar from '../components/Navbar';
import Main from '../components/Main'

const HomePage = () => {
	return (
		<div className="bg-primary_color h-screen">
			<Navbar />
			<Main/>
		</div>
	);
}

export default HomePage;
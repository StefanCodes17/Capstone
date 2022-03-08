import React from 'react';
import Navbar from '../components/navbar';

const HomePage = () => {
	return (
		<div>
			<Navbar />
			<h1 className="text-3xl bg-red-300">This is a react app</h1>
		</div>
	);
}

export default HomePage;
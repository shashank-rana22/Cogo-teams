import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
	const profileData = useSelector(({ profile }: any) => profile);
	console.log('profileData from HOME', profileData);
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}

export default Home;

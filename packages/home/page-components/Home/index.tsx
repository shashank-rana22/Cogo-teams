import { useSelector } from '@cogoport/store';
import React from 'react';

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

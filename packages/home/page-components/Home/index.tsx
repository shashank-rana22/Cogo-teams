import { useSelector } from '@cogoport/store';
import React from 'react';

function Home() {
	const reps = useSelector((state) => state.profile);
	console.log('reps inside home', reps);
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}

export default Home;

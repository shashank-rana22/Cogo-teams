import { useSelector } from '@cogoport/store';
import React from 'react';

function AccountPayables() {
	const reps = useSelector((state) => state.profile);
	console.log('reps inside payables', reps);
	return (
		<div>
			<h1>Account Payables</h1>
		</div>
	);
}

export default AccountPayables;

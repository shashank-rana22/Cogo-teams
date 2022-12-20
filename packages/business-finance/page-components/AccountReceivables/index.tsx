import React from 'react';
import { useSelector } from '@cogoport/store';
function AccountRecievables() {
	const profileData = useSelector(({ profile }: any) => profile);
	console.log('AccountRecievables', profileData);
	return (
		<div>
			<h1>Account Recievables</h1>
		</div>
	);
}

export default AccountRecievables;

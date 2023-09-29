import { useRouter } from '@cogoport/next';
import React from 'react';

function Insurance() {
	const { query } = useRouter();
	console.log(query, 'query');
	return (
		<div>Insurance</div>
	);
}

export default Insurance;

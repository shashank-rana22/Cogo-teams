import React from 'react';

import useGetBadgeConfiguration from '../../../hooks/useGetBadgeConfiguration';

function ThisMonth() {
	const { loading, userData } = useGetBadgeConfiguration();
	console.log(userData);
	return (
		<div>
			This month
		</div>
	);
}

export default ThisMonth;

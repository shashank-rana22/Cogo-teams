import { useRequest } from '@cogoport/request';
import React, { useEffect } from 'react';

function AccountPayables() {
	const [{ data, loading, error }, trigger] = useRequest(
		{
			url    : '/list_cogo_entities',
			method : 'get',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		trigger();
	}, []);

	return (
		<div>
			<h1>Account Payables</h1>
		</div>
	);
}

export default AccountPayables;

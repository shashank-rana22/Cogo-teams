import { useRequestBf } from '@cogoport/request';
import React, { useEffect } from 'react';

function AccountPayables() {
	const [{ data, loading, error }, trigger] = useRequestBf(
		{
			url     : '/purchase/payable-bill/list',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_list',
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

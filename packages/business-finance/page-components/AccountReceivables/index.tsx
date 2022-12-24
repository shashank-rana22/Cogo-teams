import React, { useState } from 'react';

import { PAYRUN_PAID_CONFIG } from '../account-payables/configurations/PAID_TABLE';
import List from '../commons/List/index';

function AccountRecievables() {
	const [sort, setSort] = useState({});
	return (
		<div>
			<h1>Account Recievables</h1>
			<List config={PAYRUN_PAID_CONFIG} sort={sort} setSort={setSort} />
		</div>
	);
}

export default AccountRecievables;

import React, { useState } from 'react';

import { PAYRUN_PAID_CONFIG } from '../account-payables/configurations/PAID_TABLE';
import List from '../commons/List/index';
import SegmentedControl from "../commons/SegmentedControl";
import { IcMAccountSettings } from '@cogoport/icons-react';

function AccountRecievables() {
	const [sort, setSort] = useState({});
	const OPTIONS = [
		{
			label: 'Per Package',
			value: 'per_package',
			icon:<IcMAccountSettings/>,
		},
		{
			label: 'Gross',
			value: 'total_gross',
			icon:<IcMAccountSettings/>,
		},
	];
	const [currentTab, setCurrentTab] = useState('');
	return (
		<div>
			<h1>Account Recievables</h1>
			<List config={PAYRUN_PAID_CONFIG} sort={sort} setSort={setSort} />
			<SegmentedControl
						options={OPTIONS}
						activeTab={currentTab}
						setActiveTab={setCurrentTab}
					/>
		</div>
	);
}

export default AccountRecievables;

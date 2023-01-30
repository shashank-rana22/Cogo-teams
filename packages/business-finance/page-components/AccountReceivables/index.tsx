import { IcMAccountSettings } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../commons/Filters';
import SegmentedControl from '../commons/SegmentedControl';
import StyledTable from '../commons/StyledTable';

import { INVOICE_FILTERS } from './FILTERS_CONTROLS';

function AccountRecievables() {
	const [filters, setFilters] = useState({});
	const OPTIONS = [
		{
			label : 'Per Package',
			value : 'per_package',
			icon  : <IcMAccountSettings />,
		},
		{
			label : 'Gross',
			value : 'total_gross',
			icon  : <IcMAccountSettings />,
		},
	];
	const columns = [
		{ Header: 'First Name', accessor: 'firstName' },
		{ Header: 'Last Name', accessor: 'lastName' },
		{ Header: 'Age', accessor: (row: Record<string, any>) => row.age },
		{ Header: 'Visits', accessor: 'visits' },
		{ Header: 'Status', accessor: 'status' },
		{ Header: 'Progress', accessor: 'progresss' },
		{ Header: 'Gender', accessor: 'gender' },
	];
	const data = [
		{
			firstName : 'tanner',
			lastName  : 'linsley',
			age       : 24,
			visits    : 100,
			status    : 'In Relationship',
			progress  : 50,
			gender    : 'male',
		},
		{
			firstName : 'tandy',
			lastName  : 'miller',
			age       : 40,
			visits    : 40,
			status    : 'Single',
			progress  : 80,
			gender    : 'male',
		},
		{
			firstName : 'joe',
			lastName  : 'dirte',
			age       : 45,
			visits    : 20,
			status    : 'Complicated',
			progress  : 10,
			gender    : 'male',
		},
	];
	const [currentTab, setCurrentTab] = useState('');
	return (
		<div>
			<h1>Account Recievables</h1>
			{/* <List config={PAYRUN_PAID_CONFIG} sort={sort} setSort={setSort} /> */}
			<SegmentedControl
				options={OPTIONS}
				activeTab={currentTab}
				setActiveTab={setCurrentTab}
			/>
			<StyledTable columns={columns} data={data} />
			<Filter
				controls={INVOICE_FILTERS}
				filters={filters}
				setFilters={setFilters}
				clearFilters={() => { setFilters({}); }}
			/>
		</div>
	);
}

export default AccountRecievables;

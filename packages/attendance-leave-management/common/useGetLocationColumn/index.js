import { Select, Checkbox } from '@cogoport/components';
// import { IcMEdit } from '@cogoport/icons-react';
import React from 'react';

const useGetLocationColumn = () => {
	const columns = [
		{
			Header   : <Checkbox />,
			accessor : () => (
				<Checkbox />
			),
			id: 'select_all',
		},
		{ Header: 'NAME', accessor: 'name' },
		{ Header: 'DESIGNATION', accessor: 'designation' },
		{ Header: 'DEPARTMENT', accessor: 'department' },
		{ Header: 'REPORTING OFFICE', accessor: 'reporting_location' },
		{
			Header   : 'ACCESS STATUS',
			accessor : 'active',
		},
		{
			Header   : 'ALLOWED OFFICES',
			accessor : (item) => (
				<div>
					<Select
						size="sm"
						placeholder={item.allowed_offices}
					/>
				</div>
			),
		},
	];
	return columns;
};

export default useGetLocationColumn;

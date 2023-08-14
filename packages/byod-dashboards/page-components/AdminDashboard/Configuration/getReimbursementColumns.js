import { Button } from '@cogoport/components';
// import { IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

const getReimbursementColumns = () => [
	{
		Header   : 'Department',
		accessor : (item) => (
			<div>{startCase(item?.department) || '-'}</div>
		),
	},

	{
		Header   : 'Designation',
		accessor : (item) => (
			<div>{startCase(item?.designation) || '-'}</div>
		),
	},

	{
		Header   : 'Action',
		accessor : () => (
			<Button themeType="secondary">
				View Employees
			</Button>
		),
	},

];

export default getReimbursementColumns;

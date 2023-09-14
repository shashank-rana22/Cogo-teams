import { startCase, getByKey, isEmpty } from '@cogoport/utils';

import HandleCall from './HandleCall';

const organizationColumn = ({ orgData }) => [
	{
		Header   : 'Name',
		id       : 'name',
		accessor : (row) => <div>{getByKey(row, 'name') as string}</div>,
	},
	{
		Header   : 'Email',
		id       : 'email',
		accessor : (row) => <div>{getByKey(row, 'email') as string}</div>,
	},
	{
		Header   : 'Mobile Number',
		accessor : (row) => (
			<div>
				<div>{getByKey(row, 'mobile_number') as string}</div>
			</div>
		),
	},

	{
		Header   : 'Work Scopes',
		accessor : (row) => (
			<div>
				{!isEmpty(row?.work_scopes) ? (
					<div>
						{(getByKey(row, 'work_scopes') as []).map((val) => (
							<div key={val}>{startCase(val)}</div>
						))}
					</div>
				) : (
					'-'
				)}
			</div>
		),
	},
	{
		Header   : '',
		accessor : (row) => <HandleCall row={row} orgData={orgData} />,
		id       : 'mobile',
	},
];

export default organizationColumn;
